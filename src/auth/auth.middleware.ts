import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader , "iside middleware")

    if (!authorizationHeader) {
      // No Authorization header found, proceed to the next middleware
      throw new UnauthorizedException()
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      // Authorization header is invalid, proceed to the next middleware
      throw new UnauthorizedException()
    }

    try {
      // Decode the JWT token
    //   const decoded = this.jwtService.verify(token);
      
      // Attach the decoded payload to the request object
    //   req.user = decoded;

      // Proceed to the next middleware
      const user =  this.jwtService.decode(token)
      // console.log(user)
      req.user = user

      next();
    } catch (error) {
      // JWT token is invalid or expired, proceed to the next middleware
      return next();
    }
  }

}
