import { Query, Resolver } from '@nestjs/graphql';
import { WorkerService } from './worker.service';
import { WorkerType } from './types/workerType';

@Resolver((of)=> WorkerType)
export class WorkerResolver {
    constructor(
        private readonly workerService : WorkerService
    ){}


    @Query((returns)=> [WorkerType])
    topRatedWorkers(){
        return this.workerService.topRatedWorkerService(10,2)
    }

    @Query((returns)=> [WorkerType])
    getWorkerByService(){
        return this.workerService.getWorkerByService("electrician",10,2)
    }

    @Query((returns)=> [WorkerType])
    searchWorker(){
        return this.workerService.searchSerive("electrician",10,2)
    }


    @Query((returns)=> [WorkerType])
    addedWorker(){
        return this.workerService.addedWorker("electrician",10,2,98999)
    }

    
}
