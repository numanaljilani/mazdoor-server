import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { AuthMiddleware } from './auth/auth.middleware';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { Image } from './worker/entity/images.entity';

@Module({
  imports: [UserModule, AuthModule,WorkerModule,
    ConfigModule.forRoot(
      {
        isGlobal : true
      }
    ),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/mazdoor',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User,Otp,Image],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forFeature([User,Otp,Image])
    
  ],
  controllers: [],
  providers: [WorkerResolver,WorkerService],
})
export class AppModule 
// implements NestModule 
{
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .exclude({ path: 'user/phone', method: RequestMethod.ALL })
  //     .forRoutes(UserController);
  // }
}
