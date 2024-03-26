import { Module } from '@nestjs/common';
import { WorkerResolver } from './worker.resolver';
import { WorkerService } from './worker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Image } from './entity/images.entity';
import { UserModule } from 'src/user/user.module';
import { WatchList } from './entity/watchList.entity';
import { UsersController } from './users/users.controller';
import { WorkerController } from './worker.controller';
import { AwsConfigService } from 'src/auth/aws.config.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,Image,WatchList]),UserModule,AuthModule ],
  providers: [WorkerResolver, WorkerService,AwsConfigService],
  exports : [WorkerService],
  controllers: [UsersController, WorkerController]
})
export class WorkerModule {}
