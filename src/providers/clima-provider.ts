import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import * as esquema from 'esquemas/index.exquemas';

export const ClimaProvider = [
    {
        provide:'ClimaModelToken',
        useFactory:(connection:Connection)=>connection.model('climas',esquema.ClimaEsquema),
        inject:['DbConnectionToken'],
    },
];
