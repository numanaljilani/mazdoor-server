import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { WatchList } from './entity/watchList.entity';
import { Image } from './entity/images.entity';
import { AwsConfigService } from 'src/auth/aws.config.service';
import { extname } from 'path';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(User) private readonly userReposetry: Repository<User>,
    @InjectRepository(WatchList)
    private readonly watchListRepository: Repository<WatchList>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly awsConfigService: AwsConfigService,
  ) {}

  async topRatedWorkerService(take: number, skip: number) {

    return this.userReposetry.find({
      where: { adminVerified: true },
      take,
      skip,
    });
  }

  async getWorkerByService(occupation: string, take: number, skip: number) {


    try {
      const worker = await this.userReposetry.find({
        where: { occupation ,isWorker : true , adminVerified: true },
        take,
        skip,
      });

      return worker;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async searchSerive(queryString: string, take: number, skip: number) {
 
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
      where: { adminVerified: false , isWorker : true },
      take: limit,
      skip,
    });
  }

  async verifyWorker(id) {
    const verifyWorkerById = await this.userReposetry.update(id , { isAdminVerfied : true })
    return this.userReposetry.findOne(id);
  }

  async blockWorker(id) {
    const verifyWorkerById = await this.userReposetry.update(id , { isAdminVerfied : false })
    return this.userReposetry.findOne(id);
  }

  async getAllworker(skip: number, limit: number, phone: number) {
    return this.userReposetry.find({ take: limit, skip });
  }

  async getWorkerById(id) {
    try {
      const worker = await this.userReposetry.findOne(id);
 
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

      const user = await this.userReposetry.findOne(workerId);

      if (exist) {
        await this.watchListRepository.delete({ userId, workerIds: workerId });
        return { added: false, message: 'Removed from your watch List' };
      } else {
        const addInWatchList = await this.watchListRepository.create({
          userId,
          workerIds: workerId,
          name: user.name,
          location: user.location,
          imageUrl: user.profile,
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

  async uploadPost(file, id) {
    try {
      if (!file) return;

      const fileExtension = extname(file?.originalname);
      const timestamp = new Date().getTime(); // Get current timestamp
      const randomNumber = Math.floor(Math.random() * 10000); // Generate random number
      const uniqueFileName = `${timestamp}-${randomNumber}${fileExtension}`;

      const data = await this.awsConfigService.upload(
        uniqueFileName,
        file.buffer,
        fileExtension,
      );

      const addImage = await this.imageRepository.create({
        imageUrl: uniqueFileName,
        userId: id,
      });
      this.imageRepository.save(addImage);
      return addImage; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw error;
    }
  }

  async getPosts(userId) {
    return this.imageRepository.find({ where: { userId } });
  }

  async myWatchList(take, skip, userId) {
    return this.watchListRepository.find({ where: { userId } });
  }
}
