import * as mongoose from 'mongoose';


var genericModel = new mongoose.Schema({
    min: { type: Number, default: 0 },
    mintime: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    maxtime: { type: Number, default: 0 }
})


export const ClimaEsquema = new mongoose.Schema({
    fecha: { type: String, default: null },
    fechaUnix: { type: Number, default: 0 },
    climaMensual: [{
        fecha: { type: String, default: null },
        fechaUnix: { type: Number, default: 0 },
        temperatura: genericModel,
        humedad: genericModel,
        presionAtmosferica: genericModel,
        radiacion: genericModel,
        lluvia: genericModel,
        promedioLluvia: genericModel,
        indiceUV: genericModel,
        viento: genericModel,
        direccionViento: genericModel,
        rafagaViento: genericModel,
        rafagaVientoDireccion: genericModel,
        altimetro: genericModel,
        barometro: genericModel
    }]


});
