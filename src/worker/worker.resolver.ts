import { Args, Query, Resolver } from '@nestjs/graphql';
import { WorkerService } from './worker.service';
import { WorkerType } from './types/workerType';

@Resolver((of) => WorkerType)
export class WorkerResolver {
  constructor(private readonly workerService: WorkerService) {}

  @Query((returns) => [WorkerType])
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

  @Query((returns) => [WorkerType])
  searchWorker(
    @Args('name') name: string,
    @Args('take') take: number,
    @Args('skip') skip: number,
  ) {
    return this.workerService.searchSerive(name , take , skip);
  }

  @Query((returns) => [WorkerType])
  addedWorker() {
    return this.workerService.addedWorker(10, 2,3209482309);
  }

  @Query((returns) => [WorkerType])
  pendingVerify(
    @Args('take') take: number,
    @Args('skip') skip: number,
  ) {
    
    return this.workerService.pendingVerify( skip , take);
  }
}
