import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import * as esquema from 'esquemas/index.exquemas';

export const AuthUserProvider = [
    {
        provide:'AuthModelToken',
        useFactory:(connection:Connection)=>connection.model('userapi',esquema.AuthUserEsquema),
        inject:['DbConnectionToken'],
    },
];
