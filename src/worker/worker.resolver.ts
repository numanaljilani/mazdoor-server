import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WorkerService } from './worker.service';
import { WorkerType } from './types/workerType';
import { Req, UseGuards } from '@nestjs/common';
import { MyGuard } from 'src/auth/middleware';
import { WatchListType } from './types/watchListType';
import { ImageType } from './types/imageType';
import { myWatchListType } from './types/myWatchList';

@Resolver((of) => WorkerType)
export class WorkerResolver {
  constructor(private readonly workerService: WorkerService) {}

  @Mutation((returns) => [WorkerType])
  topRatedWorkers(@Args('take') take: number, @Args('skip') skip: number) {
    return this.workerService.topRatedWorkerService(take, skip);
  }

  @Query((returns) => [WorkerType])
  getWorkerByService(
    @Args('occupation') occupation: string,
    @Args('take') take: number,
    @Args('skip') skip: number,
  ) {
    return this.workerService.getWorkerByService(occupation, take, skip);
  }

  @Mutation((returns) => [WorkerType])
  searchWorker(
    @Args('name') name: string,
    @Args('take') take: number,
    @Args('skip') skip: number,
  ) {
    return this.workerService.searchSerive(name, take, skip);
  }

  @Query((returns) => [WorkerType])
  addedWorker() {
    return this.workerService.addedWorker(10, 2, 3209482309);
  }

  @Query((returns) => [WorkerType])
  pendingVerify(@Args('take') take: number, @Args('skip') skip: number) {
    return this.workerService.pendingVerify(skip, take);
  }

  @Query((returns) => WorkerType)
  getWorkerById(@Args('id') id: string) {
    return this.workerService.getWorkerById(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(MyGuard)
  @Mutation((returns) => WatchListType)
  addWorkerToWatchList(@Args('id') id: string, @Context() context: any) {
    const { id: userId } = context.req.user;
    return this.workerService.addWorkerToWatchList(id, userId);
  }


  @UseGuards(MyGuard)
  @Mutation((returns) => WorkerType)
  availableAndUnavailable(@Context() context: any) {
    const { id } = context.req.user;

    return this.workerService.availableAndUnAvailable(id);
  }


  @UseGuards(MyGuard)
  @Mutation((returns) => [ImageType])
  getPosts(@Args('id') id: string, @Context() context: any) {
    return this.workerService.getPosts(id);
  }

  @UseGuards(MyGuard)
  @Mutation((returns) => [myWatchListType])
  myWatchList( 
    @Args('take') take: number,
    @Args('skip') skip: number,
    @Context() context: any) {
    console.log("inside " , take , skip)
    return this.workerService.myWatchList(take , skip , context.req.user.id);
  }
}
