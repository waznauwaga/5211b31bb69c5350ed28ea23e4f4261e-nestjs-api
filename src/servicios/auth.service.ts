import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Injectable, Inject } from '@nestjs/common';
import * as interfacee from 'interfaces/index.interfaces';
@Injectable()
export class AuthService {

    constructor(@Inject('AuthModelToken') private readonly userApiModel: Model<interfacee.AuthUserEsquema>) {

    }


    async createToken(payLoad: interfacee.jwtPayload) {
        const user: interfacee.jwtPayload = payLoad;
        const expiresIn = 3600;
        const accessToken = jwt.sign(user, 'secretKey', { expiresIn });
        return {
            expiresIn,
            accessToken,
        };
    }

    async validateUser(payLoad: interfacee.jwtPayload): Promise<any> {
        return this.userApiModel.findOne({ "email": payLoad.email });
    }
}
