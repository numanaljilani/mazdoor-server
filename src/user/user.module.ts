import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'Jwt_secrete',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [UserService, UserResolver,JwtStrategy],
  controllers: [UserController],
  exports : [UserService, ]
})
export class UserModule {}
