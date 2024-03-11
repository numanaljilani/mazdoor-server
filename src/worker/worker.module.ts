import { Module } from '@nestjs/common';
import { WorkerResolver } from './worker.resolver';
import { WorkerService } from './worker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Image } from './entity/images.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Image]) ],
  providers: [WorkerResolver, WorkerService],
  exports : []
})
export class WorkerModule {}
