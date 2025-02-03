import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { FileUpload } from "graphql-upload-ts";

dotenv.config();

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME,
});

// Function to upload a file to Cloudinary
const uploadFileToCloudinary = async (file: FileUpload, folder: string): Promise<UploadApiResponse> => {
  const { createReadStream } = file;
  const fileStream = createReadStream();

  return new Promise((resolve, reject) => {
    const cloudStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!);
      }
    );

    fileStream.pipe(cloudStream);
  });
};

// Function to delete a file from Cloudinary
const deleteFileFromCloudinary = async (public_id: string) => {
  try {
    const deletedResource = await cloudinary.uploader.destroy(public_id);
    if (deletedResource.result === "not found") {
      throw new Error("Public ID not found. Provide a valid publicId.");
    }
    if (deletedResource.result !== "ok") {
      throw new Error("Error while deleting existing file. Try again.");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { uploadFileToCloudinary, deleteFileFromCloudinary };
