import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './types/loginType';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Resolver((of)=> UserType)
export class AuthResolver {

    constructor(
        private readonly authService : AuthService
    ){}

    @Query((returns => UserType))
    login(@Args('logindto') loginDto : LoginDto){
        console.log(loginDto)
        return this.authService.loginService(loginDto)
    }
}
