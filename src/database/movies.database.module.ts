import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesConfig } from 'config/enums';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MoviesConnectionName } from './connection-name.enum';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: MoviesConnectionName.moviesDb,
      useFactory: async (config: ConfigService) => ({
        uri: config.get(MoviesConfig.uri),
        useNewUrlParser: true,
      }),
    }),
  ],
})
export class MoviesDatabaseModule {}
