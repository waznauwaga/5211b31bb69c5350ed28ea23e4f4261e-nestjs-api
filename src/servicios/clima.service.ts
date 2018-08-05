import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import * as interfacee from 'interfaces/index.interfaces';
import * as dto from 'dtos/index.dto';
import moment from 'moment';
import _ from 'lodash';
@Injectable()
export class ClimaService {
    
    constructor(@Inject('ClimaModelToken') private readonly climaModel:Model<interfacee.ClimaEsquema>){}

    async allClima():Promise<interfacee.ClimaEsquema[]>{

        return await this.climaModel.find();
    }

    async findWithData(data):Promise<any>{
        return new Promise(async(resolve,reject)=>{
            try{    
        console.log({climaFind:data});
        let clima = await this.climaModel.findOne({'fecha':data.mes});
        let climaFind = new Array();
        if(clima!=null){
            let contador=0;
            clima.climaMensual.forEach((clim)=>{
                contador++;
                if(clim.fecha==data.fecha){
                    climaFind.push(clim);
                }

                if(contador==clima.climaMensual.length){
                    resolve(climaFind);
                }
            })
        }else{
            resolve(false);
        }
    }catch(e){
        resolve(false);
    }
    })
    
    }

    

}
