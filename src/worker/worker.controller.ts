import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/user/user.controller';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', storage))
  @Post('post')
  async uploadFile(@UploadedFile() file, @Req() req) {
    console.log(file.filename);
    console.log('inside upload profile');
    const { id } = req.user
    const fileName = file.filename;
    return this.workerService.uploadPost(fileName , id);
    // return this.userService.uploadProfile(req, {profile: file.filename} );
  }
}
