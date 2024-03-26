import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.strategy';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private passportStrategy: PasswordService,
  ) {}

  async loginService(loginDto: LoginDto) {
    const { phone, password } = loginDto;


    try {
      let user = await this.userRepository.findOne({ where: { phone } });
      if (!user)
        return {
          error: { error: 'UserNotFound', message: 'User not found' },
          user: null,
        };

      const comparePassword = await this.passportStrategy.comparePasswords(
        password,
        user.password,
      );

      if (!comparePassword)
        return {
          error: { error: 'IncorrectPassword', message: 'Invalid password' },
          user: null,
        };

      // const payload = { phone , id : user._id };
      const access_token = await this.jwtService.signAsync({
        phone,
        id: user._id,
      });
      return { user: { ...user, access_token ,...(!user.isWorker && {
        occupation: null,
        cost: null,
        unit: null,
        location: null,
        isWorker  : false
      }),  } };
    } catch (error) {
      console.log(error);
    }
  }

  async me(me) {
    try {
      const verify = await this.jwtService.verifyAsync(me.token);
      if (!verify) {
        return {
          user: null,
          error: { error: 'Token not verify', message: 'Unable to verify' },
        };
      }
      const user = await this.userRepository.findOne(verify.id);

      return {
        user: {
          ...user,
          ...(!user.isWorker && {
            occupation: "null",
            cost: "null",
            unit: "null",
            location: "null",
          }),
        },
        error: null,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async adminloginService(loginDto: LoginDto) {
    const { phone, password } = loginDto;

    try {
      let user = await this.userRepository.findOne({ where: { phone } });
      if (!user)
        return {
          error: { error: 'UserNotFound', message: 'User not found' },
          user: null,
        };

      if (!user.admin) {
        return {
          error: { error: 'UnAuthorized', message: 'You are not authorized' },
          user: null,
        };
      }
      const comparePassword = await this.passportStrategy.comparePasswords(
        password,
        user.password,
      );

      if (!comparePassword)
        return {
          error: { error: 'IncorrectPassword', message: 'Invalid password' },
          user: null,
        };

      // const payload = { phone , id : user._id };
      const access_token = await this.jwtService.signAsync({
        phone,
        id: user._id,
        admin: true,
      });
      return { user: { ...user, access_token } };
    } catch (error) {
      console.log(error);
    }
  }
}
