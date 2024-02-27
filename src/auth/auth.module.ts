import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { AuthService } from './auth.service';
import { PasswordService } from './password.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'Jwt_secrete',
      signOptions: { expiresIn: '1y' },
    }),
  ],
  providers: [AuthResolver,JwtStrategy, AuthService,PasswordService],
  exports: [JwtStrategy]
})
export class AuthModule {}
