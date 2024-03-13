import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey:'Jwt_secrete',
      esignOptions: { expiresIn: '1y' },
    });
  }

  async validate(payload: any) {
    console.log("inside user jwt")
    return { phone : payload.phone , valid : true ,verifyOtp : payload.otp};
  }
}