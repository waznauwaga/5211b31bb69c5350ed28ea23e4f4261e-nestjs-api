import { Injectable } from '@nestjs/common';
import SSH2Promise = require('ssh2-promise');
import { EventsGateway } from '../events/events.gateway';
import { FirebaseService } from './firebase.service';
import * as socketRealTime  from '../api-soccket-real-time/api-consultas';
@Injectable()
export class Ssh2Service {
    conn=null;
    constructor(private _socket:EventsGateway,private _firebaseLog:FirebaseService){
    }

    
    
    async connectReady(config):Promise<any> {
            this.conn = new SSH2Promise({
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password
            },false);
            
           return this.conn.connect();
/*
            this.conn.on('ready', () => {
                this.conn.shell((err, stream) => {
                    stream.on('data', (data) => {
                        socketRealTime.post('STDOUT: ' + data);
                        resolve(true);
                        
                        //console.log('STDOUT: ' + data);
                    }).stderr.on('data', function (data) {
                        resolve(false);
                        //console.log('STDERR: ' + data);
                    });

                    // stream.end('ls -l\nexit\n');
                })
            }).on('error',(err)=>{
                resolve(false);
            }).connect({
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password
            })
     
*/

    }

    async sendCommand(command):Promise<any> {

         return this.conn.exec(command);


      /*  return new Promise((resolve, reject) => {
            
                this.conn.exec(command, { pty: true }, (err, stream) => {
                    stream.on('data', (data)=> {
                        //this.socket.emit('events',{msg:'STDOUT: ' + data});
                     
                        resolve('STDOUT: ' + data);
                        
                        console.log('STDOUT: ' + data);
                    }).stderr.on('data', (data)=> {
                        console.log('STDERR: ' + data);
                        resolve(false);
    
                    });
                })
       
          
        })*/
    }

    async desconnect():Promise<any> {
        return this.conn.close();
    }

}
