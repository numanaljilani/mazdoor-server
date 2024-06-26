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
import { PasswordService } from 'src/auth/password.strategy';
import { Otp } from './entity/otp.entity';
import { ObjectId } from 'mongodb';
import { extname } from 'path';
import { AwsConfigService } from 'src/auth/aws.config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Otp) private otpRepository: Repository<Otp>,
    private passwordService: PasswordService,
    private jwtService: JwtService,

    private readonly awsConfigService: AwsConfigService,
  ) {}

  async registerPhoneNumberAndSendOtpService(body: RegisterPhoneNumberDto) {
    const { phone } = body;
    if (!phone) return new BadRequestException('Phone number required');

    let user = await this.userRepository.findOne({ where: { phone } });
    if (!user) {
      user = await this.userRepository.create({ phone });
      const gen_Otp = Math.floor(Math.random() * 9000) + 1000;
      await this.userRepository.save(user);

      // const otp = await this.otpRepository.create({otp : 1234});
      const otp = this.otpRepository.create({
        id: user._id,
        expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        otp: gen_Otp,
      });
      await this.otpRepository.save(otp);

      const payload = { phone, id: user._id };
      const acess_token = await this.jwtService.sign(payload);
      return { acess_token, otp: gen_Otp };
    } else {
      throw new ConflictException('User with this phone number already exists');
    }
  }

  async verifyOtpService(body: verifyOtpDto, req: any) {
    const { otp } = body;
    const { phone, id } = req.user;
    if (!otp) return { status: 401, Message: 'OTP required' };

    try {
      const checkOtp = await this.otpRepository.findOne({
        where: { id: new ObjectId(id) },
      });
      if (checkOtp.otp != otp || otp === 9595)
        return { status: 401, message: 'Otp does not matched ' };
      if (otp && checkOtp.otp && checkOtp.expiresAt > new Date()) {
        await this.userRepository.update({ phone }, { isVerified: true });
        await this.otpRepository.delete({ id });
        return {
          status: 200,
          suceess: true,
          data: await this.userRepository.findOne({
            where: { phone },
          }),
        };
      } else {
        if (checkOtp.expiresAt < new Date()) {
          return { status: 401, message: 'Otp Expired' };
          throw new BadRequestException('OTP Expired');
        } else {
          return { status: 401, message: 'Otp not found' };
          throw new BadRequestException('OTP does not match');
        }
      }
    } catch (error) {
      console.log(error, 'inside verify otp');
    }
  }

  async crateUser(body: CreateUserDto, user: any) {
    const { name, email, password, address } = body;

    if (!password) throw new Error('all field are required');
    const hashedPassword = await this.passwordService.hashPassword(password);
    try {
      await this.userRepository.update(
        { phone: user.phone },
        { name, email, password: hashedPassword, address },
      );
      return await this.userRepository.findOne({
        where: { phone: user.phone },
      });
    } catch (error) {
      console.log(error, 'create user');
    }
  }

  async uploadProfile(req, file) {
    const { id } = req.user;
    if (!file) throw new Error('No file found');

    if (!file) return;
    const fileExtension = extname(file?.originalname);
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomNumber = Math.floor(Math.random() * 10000); // Generate random number
    const uniqueFileName = `${timestamp}-${randomNumber}${fileExtension}`;

    try {
      const data = await this.awsConfigService.upload(
        uniqueFileName,
        file.buffer,
        fileExtension
      );

      if (data.$metadata.httpStatusCode != 200) {
        return { error: true, message: 'upload failed' };
      }

      await this.userRepository.update(id, { profile: uniqueFileName });

      return await this.userRepository.findOne(id);
    } catch (error) {
      console.log(error, 'create user');
    }
  }

  async createWorker(req, file) {
    const { id } = req.user;
    const { service, cost, unit, tags, location, available } = req.body;
    try {
      const user = await this.userRepository.findOne(id);
      if (!user)
        return { error: { error: 'UserNotFound', message: 'User not found' } };

      await this.userRepository.update(id, {
       ...(cost && { cost : parseFloat(cost)}) ,
        occupation: service,

        ...(unit && {unit}),
        ...(tags && {
          tags: tags ? tags?.trim().replace(/\s/g, '').split('#') : [service],
        }),
        ...(location && {location}),
        availablity: available ? available : 'Daily',
        adminVerified: false,
        isWorker: true,
      });

      const { password, ...data } = await this.userRepository.findOne(id);
      return data;
    } catch (error: any) {
      console.log(error, 'inside worker upload');
    }
  }



  async updateUser(body: CreateUserDto, user: any) {
    console.log(body , ">>>>>>>>>>")
    let hashedPassword;
    if (body.password) {
      hashedPassword = await this.passwordService.hashPassword(body?.password);
    }
    try {
      await this.userRepository.update(
        { phone: user.phone },
        { ...body, ...(body.password && { password: hashedPassword }) },
      );
      return await this.userRepository.findOne({
        where: { phone: user.phone },
      });
    } catch (error) {
      console.log(error, 'create user');
    }
  }
}
