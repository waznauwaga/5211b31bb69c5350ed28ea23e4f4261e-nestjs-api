import { Controller, Get, Post, Req } from '@nestjs/common';
import * as service from '../../servicios/index.servicios'
@Controller('sshserver')
export class SshserverController  {

    constructor(private _ssh: service.Ssh2Service) {

    }

    @Post('connect-rbp')
    async connection(@Req() req) {
        let config = req.body.peticion;
        try{
        let response = await this._ssh.connectReady(config);
        return {response:'Established connection'};
        }catch(e){
            
        }
        
        return {response:false};
    }
    @Post('sendcommand')
    async sendCommand(@Req() req) {

        try {
            let command = req.body.peticion.command;
            let response = await   this._ssh.sendCommand(command);
            return {response:response}
        }catch(e){}
        
        return {response:false};

    }

    @Post('desconnect-ssh')
    async desconnect(@Req() req) {
        try{
            let response = await this._ssh.desconnect();
            return {response:true}; 
        }catch(e){}
        
        return {response:false}    
    }
}
