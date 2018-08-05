import { Controller, Post, Param, Get, Req, UnauthorizedException, Res, HttpCode } from '@nestjs/common';
import * as service from 'servicios/index.servicios';
import * as interfacee from 'interfaces/index.interfaces';
@Controller('auth')
export class AuthUserApíController {

    constructor(private _auth: service.AuthService) {

    }

    @Post('token')
    @HttpCode(200)
    async getToken(@Req() req): Promise<any> {
        let user = req.body.user;
        const userFind = await this._auth.validateUser(user);
        if (!userFind) {
            return new UnauthorizedException();
        }
        const token = await this._auth.createToken(user);
        return token;


    }


}
