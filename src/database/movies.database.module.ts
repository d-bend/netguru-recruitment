import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: 'MoviesDb',
      useFactory: async (config: ConfigService) => ({
        uri: config.get('moviesConfig.uri'),
        useNewUrlParser: true,
      }),
    }),
  ],
})
export class MoviesDatabaseModule {}
