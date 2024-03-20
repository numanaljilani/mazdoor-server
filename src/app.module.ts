import {  MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { WorkerResolver } from './worker/worker.resolver';
import { WorkerModule } from './worker/worker.module';
import { WorkerService } from './worker/worker.service';
import { Otp } from './user/entity/otp.entity';
import { ConfigModule } from '@nestjs/config';
import { Image } from './worker/entity/images.entity';
import { WatchList } from './worker/entity/watchList.entity';
import { MyGuard } from './auth/middleware';
import * as cors from 'cors';

@Module({
  imports: [UserModule, AuthModule,WorkerModule,
    ConfigModule.forRoot(
      {
        isGlobal : true
      }
    ),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User,Otp,Image,WatchList],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forFeature([User,Otp,Image,WatchList]),
   
  ],
  controllers: [],
  providers: [WorkerResolver,WorkerService,MyGuard],
})
export class AppModule implements NestModule
// implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    // Apply CORS middleware to all routes
    consumer.apply(cors()).forRoutes('*');
  }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .exclude({ path: 'user/phone', method: RequestMethod.ALL })
  //     .forRoutes(UserController);
  // }
}
