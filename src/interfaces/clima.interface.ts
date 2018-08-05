import { Document } from 'mongoose';
export interface ClimaEsquema extends Document {
    fecha: string,
    fechaUnix: number,
    climaMensual: any[],

}