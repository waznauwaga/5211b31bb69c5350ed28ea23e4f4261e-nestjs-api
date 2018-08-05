import { Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import * as service from '../../servicios/index.servicios';
import { AuthGuard } from '@nestjs/passport';
@Controller('service-clima')
export class ServiceClimaController {

    constructor(private _clima:service.ClimaService, private _workTimingClima:service.WorkingTimingClimaService){

    }

    @Post('up-service') 
    @HttpCode(200)
    //@UseGuards(AuthGuard('jwt'))
    async upService(){
        return await this._workTimingClima.start();
    }

    @Post('down-service') 
    @HttpCode(200)
    //@UseGuards(AuthGuard('jwt'))
    async downService(){
        return await this._workTimingClima.stop();
    }


}
