import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { AuthService } from './auth.service';
import { PasswordService } from './password.strategy';
import { AuthMiddleware } from './auth.middleware';
import { MyGuard } from './middleware';
import { AwsConfigService } from './aws.config.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'Jwt_secrete',
      signOptions: { expiresIn: '1y' },
    }),
  ],
  providers: [AuthResolver,JwtStrategy, AuthService,PasswordService ,AuthMiddleware,MyGuard,AwsConfigService],
  exports: [JwtStrategy,PasswordService ,AuthMiddleware,MyGuard,AwsConfigService]
})
export class AuthModule {

}
