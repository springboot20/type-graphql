import jsonwebtoken from "jsonwebtoken";
import { User } from "../types/context";
import { Auth } from "../entities/user/auth.entity";
import { ObjectId } from "typeorm";

export const validateToken = (token: string, secret: string) => {
  try {
    const decodedToken = jsonwebtoken.verify(token, secret);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};

export const generateAccessToken = (payload: User) => {
  return jsonwebtoken.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: +process.env.JWT_ACCESS_EXPIRY!,
  });
};

export const generateRefreshToken = (payload: { _id: string }) => {
  return jsonwebtoken.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: +process.env.JWT_REFRESH_EXPIRY!,
  });
};

export const generateTokens = async (userId: string) => {
  const user = await Auth.findOne({
    where: {
      _id: userId as unknown as ObjectId,
    },
  });

  if (!user) {
    throw new Error("user not found");
  }

  let accessPayload = {
    _id: user._id.toString(),
    username: user.username,
    role: user.role,
    email: user.email,
  };

  let refreshPayload = {
    _id: user._id.toString(),
  };

  let accessToken = generateAccessToken(accessPayload);
  let refreshToken = generateRefreshToken(refreshPayload);

  user.refresh_token = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};
