import 'reflect-metadata';
import  dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

import { ApolloServer } from 'apollo-server-express';
import  Express from 'express';
import { buildSchema } from 'type-graphql';
import { AppDataSource } from './utils/dataSource';

/**
 * Resolver
 */
import { RegisterResolver } from './modules/user/Register';

const main = async () => {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const app: Express.Application = Express();
  const port = (process.env.PORT ?? 4401) as number;

  const apolloServer = new ApolloServer({ schema });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`✨✨ Server running on http://localhost:${port}/graphql 🚀🚀`);
  });
};

main();
