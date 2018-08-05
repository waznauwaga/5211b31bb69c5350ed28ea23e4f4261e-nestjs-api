export class CreateClimaDto {
    fecha: string;
    fechaUnix: number;
    climaMensual: [{
        fecha: string,
        fechaUnix: number
        temperatura: any;
        humedad: any;
        presionAtmosferica: any;
        radiacion: any;
        lluvia: any;
        promedioLluvia: any;
        indiceUV: any;
        viento: any;
        direccionViento: any;
        rafagaViento: any;
        rafagaVientoDireccion: any;
        altimetro: any;
        barometro: any
    }]

}