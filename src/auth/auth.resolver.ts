import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthResult, PhoneAndPasswordError, UserType } from './types/loginType';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Me } from './dto/meDto';

@Resolver((of) => UserType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => AuthResult)
  login(@Args('logindto') loginDto: LoginDto) {

    return this.authService.loginService(loginDto);
  }
  // @UseGuards(AuthGuard('jwt'))
  @Mutation((returns) => AuthResult)
  me(@Args('me') me: Me) {
    return this.authService.me(me);
  }
  @Mutation((returns) => AuthResult)
  adminLogin(@Args('logindto') loginDto: LoginDto) {
    return this.authService.adminloginService(loginDto);
  }
}
