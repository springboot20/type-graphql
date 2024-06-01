import 'reflect-metadata';
import { User } from '../entities/user/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb+srv://springboot:GexId4yCJi2JThY2@cluster0.prjuarl.mongodb.net/typeorm?retryWrites=true&w=majority',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  logging: true,
  synchronize: true,
  entities: [User],
});
