import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthResult, PhoneAndPasswordError, UserType } from './types/loginType';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Resolver((of)=> UserType)
export class AuthResolver {

    constructor(
        private readonly authService : AuthService
    ){}

    
    @Mutation((returns => AuthResult ))
    login(@Args('logindto') loginDto : LoginDto ){
        console.log("Inside login")
        return this.authService.loginService(loginDto)
    }
}
