import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as interfacee from 'interfaces/index.interfaces';
import * as cron from 'node-cron';
import * as Sequence from '@lvchengbin/sequence';
import * as apiStation from '../api-mysql/api-consultas';
import * as moment from 'moment';
import * as _ from 'lodash';
import { resolve } from 'path';
@Injectable()
export class WorkingTimingClimaService {
    task = null;
   
    constructor(@Inject('ClimaModelToken') private climaModel: Model<interfacee.ClimaEsquema>) { }


    async start(): Promise<any> {
        return new Promise((resolve, reject) => {
            //console.log('estoy en start');

            this.task = cron.schedule('*/1 * * * *', async () => {
                //var createOrUpdate used not 
                const createOrUpdate = await this.createOrUpdateDoc();
                

            })
            resolve({ service: true });
        })
    }

    async stop():Promise<any> {
        return new Promise((resolve,reject)=>{
            this.task.stop();
            resolve({service: false });
        })
        
    }

    async createOrUpdateDoc(): Promise<any> {

        //console.log({mes:moment().format('MM-YYYY')});
        const docClima = await this.climaModel.findOne({ 'fecha': moment().format('MM-YYYY') })
        //console.log({docClima:docClima});
        if (docClima!=null) {
            let newClima= await this.asignDayClima(docClima.climaMensual);
            if(newClima!=false){
            docClima.climaMensual=newClima;
            let newUpdate = await this.climaModel.updateOne({'fecha':moment().format('MM-YYYY') },docClima);
            //console.log({newUpdate:newUpdate});
            return {update:0};
        }else{
            console.log('no se pudo actualizar la base de datos');
            return {update:0};

        }
            
        } else {
            let climaSave = new this.climaModel();
            climaSave.fecha = moment().format('MM-YYYY');
            climaSave.fechaUnix = moment().unix();
            climaSave.climaMensual = new Array();
            
            return this.climaModel.create(climaSave);
        }
    }

    async asignDayClima(climaMensual:Array<any>): Promise<any> {
            return new Promise(async (resolve,reject) =>{
                

                try{
            
        let genericModel= {
            min:0 ,
            mintime: 0,
            max: 0,
            maxtime:0 
        };
        let model = {
            fecha: moment().format('DD-MM-YYYY'),
            fechaUnix:moment().unix(),
            presionAtmosferica: genericModel,
            humedad: genericModel,
            temperatura: genericModel,
            barometro: genericModel,
            altimetro: genericModel,
            rafagaVientoDireccion: genericModel,
            rafagaViento: genericModel,
            direccionViento: genericModel,
            viento: genericModel,
            indiceUV: genericModel,
            promedioLluvia: genericModel,
            radiacion: genericModel,
            lluvia: genericModel,
            
        }

        let queries = [
            'archive_day_pressure','archive_day_outHumidity',
            'archive_day_outTemp','archive_day_barometer','archive_day_altimeter',
            'archive_day_windGustDir','archive_day_windGust', 'archive_day_windDir',
            'archive_day_wind','archive_day_UV',
            'archive_day_rainRate','archive_day_radiation','archive_day_rain'
        ]
        let contador =0;
        for(const query of queries){
            contador++;
             let Model= {
                min:0 ,
                mintime: 0,
                max: 0,
                maxtime:0 
            };
            let response = await apiStation.get(null,query);
            console.log({RESPONSESTATUS:response,qury:query});
            let idx = _.findIndex(response.data,(o:any)=>{
                return moment(moment.unix(o.dateTime)).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY');
            })
            //console.log({idxValue:idx,idxData:response.data[0]});
            if (idx > -1) {
                
                let station = response.data[idx];
               //console.log({STATIONDATARECIBE:station,query:query});
                Model.min=station.min;
                Model.mintime=station.mintime; 
                Model.max=station.max;
                Model.maxtime=station.maxtime;
                if(query=='archive_day_outTemp'){
                    model.temperatura=Model;
                }else if(query=='archive_day_outHumidity'){
                    model.humedad=Model;
                }else if(query=='archive_day_pressure'){
                    model.presionAtmosferica=Model;
                }else if(query=='archive_day_radiation'){
                    model.radiacion=Model;
                }else if(query=='archive_day_rain'){
                    model.lluvia=Model;
                }else if(query=='archive_day_rainRate'){
                    model.promedioLluvia=Model;
                }else if(query=='archive_day_UV'){
                    model.indiceUV=Model;
                }else if(query=='archive_day_wind'){
                    model.viento=Model;
                }else if(query=='archive_day_windDir'){
                    model.direccionViento=Model;
                }else if(query=='archive_day_windGust'){
                    model.rafagaViento=Model;
                }else if(query=='archive_day_windGustDir'){
                    model.rafagaVientoDireccion=Model;
                }else if(query=='archive_day_altimeter'){
                    model.altimetro=Model;
                }else if(query=='archive_day_barometer'){
                    model.barometro=Model;
                }
      
            }
           
            if(queries.length==contador){


                climaMensual.push(model);
                 resolve(climaMensual);
            }

        }
    }catch(e){
        resolve(false);
    }

    })

        
    }


}
