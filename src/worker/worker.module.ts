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

@Module({
  imports:[TypeOrmModule.forFeature([User,Image,WatchList]),UserModule ],
  providers: [WorkerResolver, WorkerService],
  exports : [WorkerService],
  controllers: [UsersController, WorkerController]
})
export class WorkerModule {}
