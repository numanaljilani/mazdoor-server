import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterPhoneNumberDto } from './dto/register-phone-number.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { verifyOtpDto } from './dto/verify-otp.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerPhoneNumberAndSendOtpService(body: RegisterPhoneNumberDto) {
    const { phone } = body;
    let user = await this.userRepository.findOne({ where: { phone } });
    if (!user) {
      user = this.userRepository.create({ phone });
      await this.userRepository.save(user);

      const payload = { phone, otp: 1234 };
      const acess_token = await this.jwtService.signAsync(payload);
      return { acess_token, otp: 1234 };
    } else {
      throw new ConflictException('User with this phone number already exists');
    }
  }

  async verifyOtpService(body: verifyOtpDto, req: any) {
    const { otp } = body;
    const { phone, verifyOtp } = req.user;
    console.log(otp, phone, verifyOtp);

    if (otp == verifyOtp) {
      try {
        await this.userRepository.update({ phone }, { isVerified: true });
        return await this.userRepository.findOne({
          where: { phone },
        });
      } catch (error) {
        console.log(error, 'inside verify otp');
      }
    } else {
      throw new BadRequestException();
    }
  }

  async crateUser(body: CreateUserDto, user: any) {
    try {
      await this.userRepository.update({ phone: user.phone }, body);
      return await this.userRepository.findOne({
        where: { phone: user.phone },
      });
    } catch (error) {
      console.log(error, 'create user');
    }
  }

  async updateUser(body: CreateUserDto, user: any) {
    try {
      await this.userRepository.update({ phone: user.phone }, body);
      return await this.userRepository.findOne({
        where: { phone: user.phone },
      });
    } catch (error) {
      console.log(error, 'create user');
    }
  }
}
