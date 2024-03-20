import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { WatchList } from './entity/watchList.entity';
import { Image } from './entity/images.entity';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(User) private readonly userReposetry: Repository<User>,
    @InjectRepository(WatchList)
    private readonly watchListRepository: Repository<WatchList>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async topRatedWorkerService(take: number, skip: number) {
    console.log(skip , take)
    return this.userReposetry.find({where : {adminVerified : true } , take, skip });
  }

  async getWorkerByService(occupation: string, take: number, skip: number) {
    console.log('inside service');

    try {
      const worker = await this.userReposetry.find({
        where: { occupation },
        take,
        skip,
      });
      console.log(worker);
      return worker;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async searchSerive(queryString: string, take: number, skip: number) {
    console.log(queryString);
    const users = await this.userReposetry.find();

    const filteredUsers = users.filter((user) =>
      user.name?.trim().toLowerCase().includes(queryString.toLowerCase()),
    );

    const paginatedUsers = filteredUsers.slice(skip, skip + take);
    return paginatedUsers;
  }

  async addedWorker(skip: number, limit: number, phone: number) {
    return this.userReposetry.find({
      where: { occupation: 'plumber', phone },
      take: 10,
      skip: 10,
    });
  }

  //  super admin
  async pendingVerify(skip: number, limit: number) {
    return this.userReposetry.find({
      where: { adminVerified: false },
      take: limit,
      skip,
    });
  }

  async getAllworker(skip: number, limit: number, phone: number) {
    return this.userReposetry.find({ take: limit, skip });
  }

  async getWorkerById(id) {
    try {
      const worker = await this.userReposetry.findOne(id);
      console.log(worker);
      return worker;
    } catch (error) {
      console.log(error);
    }
  }

  async addWorkerToWatchList(userId, workerId) {
    try {
      const exist = await this.watchListRepository.findOne({
        where: {
          userId,
          workerIds: workerId,
        },
      });

      const user =await this.userReposetry.findOne(workerId);

      if (exist) {
        await this.watchListRepository.delete({ userId, workerIds: workerId });
        return { added: false, message: 'Removed from your watch List' };
      } else {
        const addInWatchList = await this.watchListRepository.create({
          userId,
          workerIds: workerId,
          name : user.name,
          location : user.location,
          imageUrl : user.profile
          
        });
        await this.watchListRepository.save(addInWatchList);
        return { added: true, message: 'Added in your watch list' };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async availableAndUnAvailable(id) {
    const availibitiy = await this.userReposetry.findOne(id);
    const update = await this.userReposetry.update(id, {
      available: !availibitiy.available,
    });
    return await this.userReposetry.findOne(id);
  }

  async uploadPost(imageName, id) {
    console.log(imageName, id);
    const uploadPost = await this.imageRepository.create({
      imageUrl: imageName,
      userId: id,
    });

    return await this.imageRepository.save(uploadPost);
  }

  async getPosts(userId) {
    return this.imageRepository.find({ where: { userId } });
  }

  async myWatchList(take , skip , userId) {
    return this.watchListRepository.find({ where: { userId } });
  }
}
