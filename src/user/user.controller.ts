import { Body, Controller, Post, Req, Request, Res, UploadedFile, UseGuards, UseInterceptors  } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterPhoneNumberDto } from './dto/register-phone-number.dto';
import { verifyOtpDto } from './dto/verify-otp.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path'; 
import { v4 as uuidv4 } from 'uuid';
import { CreateWorkerDto } from './dto/createWorker';



export const storage = {
    storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`)
        }
    })

}

@Controller('user')
export class UserController {

    constructor(
        private userService : UserService,
 
    ){}


    @Post("phone")
    registerPhoneNumberAndSendOtp(@Body() body : RegisterPhoneNumberDto ){
        console.log(body , ">>>>>>>>")
        return this.userService.registerPhoneNumberAndSendOtpService(body)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('verify')
    verifyOtp(@Body() body : verifyOtpDto,
    @Request() req : any
    ){
        console.log("inside controller verify user")
        return this.userService.verifyOtpService(body ,req)
    }



    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createUser(@Body() body : CreateUserDto,
    @Request() req : any
    ){
        const user = req.user

        return this.userService.crateUser(body,user);
    }

    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file',storage))
    @Post('profile')
    async uploadFile(@UploadedFile() file,
    @Req() req 
    ) {
        console.log("inside upload profile")
      return this.userService.uploadProfile(req, {profile: file.filename} );
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    updateUser(@Body() body : UpdateUserDto,
    @Request() req : any
    ){
        const user = req.user
        return this.userService.updateUser(body,user);
    }



    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file',storage))
    @Post('create-worker')
    async createWorker(@UploadedFile() file,
    @Req() req ,
    @Body() body : CreateWorkerDto
    ) {
        console.log("inside create worker")
      return this.userService.createWorker(req, {profile: file.filename} );
    }
}
