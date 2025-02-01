import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./utils/dataSource";
import session from "express-session";
import cookieParser from "cookie-parser";
import { graphqlUploadExpress } from "graphql-upload-ts";

/**
 * Resolver
 */
import { AuthResolver } from "./modules/auth/auth.resolver";
import { LogoutResolver } from "./modules/auth/logout.resolver";
import { TodoResolver } from "./modules/todo/todo.resolver";
import { AvatarResolver } from "./modules/auth/avatar.resolver";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolver, LogoutResolver, TodoResolver, AvatarResolver],
    authChecker: async ({ context: { req } }) => {
      if ("userId" in req.session) {
        console.log(req.session.userId);
        return true;
      }

      return false;
    },
  });

  AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized"))
    .catch((err) => console.error(`Error during Data source initialization: ${err}`));

  const app: Express.Application = Express();
  const port = (process.env.PORT ?? 4401) as number;

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));

  app.use(
    session({
      resave: false,
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      cookie: {
        maxAge: Date.now() + 5 * 60 * 1000,
      },
    })
  );

  app.use(cookieParser(process.env.SESSION_SECRET as string));

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`✨✨ Server running on http://localhost:${port}/graphql 🚀🚀`);
  });
};

main();
