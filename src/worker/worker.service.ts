import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(User) private readonly userReposetry : Repository <User>
    ){}

    async topRatedWorkerService(skip : number ,limit : number){
        return this.userReposetry.find({take : 10})
    }

    async getWorkerByService(occupation : string ,skip : number ,limit : number ){
        return this.userReposetry.find({where : {occupation : "plumber" } ,take : 10 , skip : 10})
    }

    async searchSerive(occupation : string ,skip : number ,limit : number){
        return this.userReposetry.find({where : {occupation : "plumber" },take : 10 , skip : 10})
    }

    async addedWorker(occupation : string ,skip : number ,limit : number , phone : number){
        return this.userReposetry.find({where : {occupation : "plumber" , phone },take : 10 , skip : 10})
    }
}
