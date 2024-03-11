import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { PasswordService } from 'src/auth/password.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { Otp } from './entity/otp.entity';
import { Image } from 'src/worker/entity/images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Otp,Image]),
    JwtModule.register({
      global: true,
      secret: 'Jwt_secrete',
      signOptions: { expiresIn: '600h' },
    }),
    MulterModule.register({
      dest : "./uploads"
    }),
    AuthModule
  ],
  providers: [UserService,PasswordService,],
  controllers: [UserController],
  exports : [UserService, ]
})
// export class UserModule {

// }
export class UserModule  {
 
}

