import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MyGuard implements CanActivate {
    
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    // Your guard logic here
    const authorizationHeader = req.headers.authorization;

    console.log(authorizationHeader)
    if (!authorizationHeader) {
        // No Authorization header found, proceed to the next middleware
        throw new UnauthorizedException()
      }
  
      const token = authorizationHeader.split(' ')[1];
  
      if (!token) {
        // Authorization header is invalid, proceed to the next middleware
        throw new UnauthorizedException()
      }

      const user =  this.jwtService.decode(token)
      req[`user`] = user

   
    return true; // or false, depending on your logic
  }
}
