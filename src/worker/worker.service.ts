import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(User) private readonly userReposetry : Repository <User>
    ){}

    async topRatedWorkerService(take : number ,skip : number){
        return this.userReposetry.find({take , skip })
    }

    async getWorkerByService(occupation : string ,take : number ,skip : number ){
        console.log("inside service")
        return this.userReposetry.find({where : {occupation } ,take , skip})
    }

    async searchSerive(name : string ,take : number ,skip : number){
        return this.userReposetry.find({where : {name },take , skip})
    }

    async addedWorker(skip : number ,limit : number , phone : number){
        return this.userReposetry.find({where : {occupation : "plumber" , phone },take : 10 , skip : 10})
    }


    //  super admin 
    async pendingVerify(skip : number ,limit : number){
        return this.userReposetry.find({where : {adminVerified : false },take : limit , skip})
    }

    async getAllworker(skip : number ,limit : number , phone : number){
        return this.userReposetry.find({take : limit  , skip})
    }
}
