import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FightsModule } from 'src/modules/fights/fights.module';
import { Fight } from 'src/database/entitites/fights.entity';
import { Fighter } from 'src/database/entitites/fighters.entity';
import { Ranking } from 'src/database/entitites/rankings.entity';
import { EventMma } from 'src/database/entitites/events.entity';
import { EventsModule } from 'src/modules/events/events.module';
import { FightersModule } from 'src/modules/fighters/fighters.module';
import { RankingsModule } from 'src/modules/rankings/rankings.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Fight, Fighter, Ranking, EventMma],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    FightsModule,
    EventsModule,
    FightersModule,
    RankingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
