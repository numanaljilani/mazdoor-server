import {
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
      if (!user) return new NotFoundException();

      const comparePassword = await this.passportStrategy.comparePasswords(
        password,
        user.password,
      );
      if (!comparePassword) return new UnauthorizedException();

      const acess_token = await this.jwtService.signAsync({ phone });
      return { ...user, acess_token };
    } catch (error) {
      console.log(error);
    }

  }
}
