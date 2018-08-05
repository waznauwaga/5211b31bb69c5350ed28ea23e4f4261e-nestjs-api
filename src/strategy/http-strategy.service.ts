import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'servicios/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import * as interfacee from 'interfaces/index.interfaces';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class HttpStrategyService extends PassportStrategy(Strategy) {
    constructor(private readonly authService:AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
          });
    }

    async validate(payLoad:interfacee.jwtPayload,done:Function){
        console.log({payLoad:payLoad});
        const user = await this.authService.validateUser(payLoad);
        console.log({user:user});
        if (!user) {
            return done(new UnauthorizedException(), false);
          }
          done(null, user);
    }   
}
