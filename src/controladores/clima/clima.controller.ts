import { Controller, Post, Get, Param, UseGuards, Req, HttpCode, Body } from '@nestjs/common';
import * as dto from 'dtos/index.dto';
import * as service from 'servicios/index.servicios';
import { AuthGuard } from '@nestjs/passport';
@Controller('clima-data')
export class ClimaController {


    constructor(private _clima: service.ClimaService) {

    }

    @Post('all')
    @HttpCode(200)
    //@UseGuards(AuthGuard('jwt'))
    async getAllClima(): Promise<any> {
        try {
            let querybd = await this._clima.allClima();
            return { response: querybd };
        } catch (e) { }
        return false;
    }


    @Post('climahoy')
    //@UseGuards(AuthGuard('jwt'))
    async findWithData(@Req() req) {
        try {
            let query = req.body.peticion;
            console.log({body:req.body});
            let querybd = await this._clima.findWithData(query);
            return { response: querybd };
        } catch (e) { }

        return false;
    }





}
