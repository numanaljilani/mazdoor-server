import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { WorkerResolver } from './worker/worker.resolver';
import { WorkerModule } from './worker/worker.module';
import { WorkerService } from './worker/worker.service';

@Module({
  imports: [UserModule, AuthModule,WorkerModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/mazdoor',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forFeature([User])
    
  ],
  controllers: [],
  providers: [WorkerResolver,WorkerService],
})
export class AppModule {}
