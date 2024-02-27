import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterPhoneNumberDto } from './dto/register-phone-number.dto';
import { verifyOtpDto } from './dto/verify-otp.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService : UserService
    ){}


    @Post()
    registerPhoneNumberAndSendOtp(@Body() body : RegisterPhoneNumberDto ){
        return this.userService.registerPhoneNumberAndSendOtpService(body)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('verify')
    verifyOtp(@Body() body : verifyOtpDto,
    @Request() req : any
    ){
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
    @Post('update')
    updateUser(@Body() body : UpdateUserDto,
    @Request() req : any
    ){
        const user = req.user
        return this.userService.updateUser(body,user);
    }
}
