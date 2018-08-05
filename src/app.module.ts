import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserApíController } from 'controladores/auth-user-api/auth-user-api.controller';
import { ServiceClimaController } from 'controladores/clima/service-clima.controller';
import { WorkingTimingClimaService } from './servicios/working-timing-clima.service';
import { SshserverController } from './controladores/sshserver/sshserver.controller';
import { Ssh2Service } from './servicios/ssh2.service';
import { EventsGateway } from './events/events.gateway';
import { FirebaseService } from './servicios/firebase.service';
import * as strategy from 'strategy/index.strategy';
import * as servicio from 'servicios/index.servicios';
import * as provider from 'providers/index.providers';
import * as esquemas from 'esquemas/esquemas';
import * as controlador from 'controladores/index.controladores';
var conexion = process.env.mgconexion;
@Module({
  imports: [MongooseModule.forRoot(conexion), 
  MongooseModule.forFeature(esquemas.allEsquemas)
],
  controllers: [AppController, controlador.ClimaController, AuthUserApíController, ServiceClimaController, SshserverController],
  providers: [AppService,EventsGateway ,servicio.ClimaService,...provider.ClimaProvider, servicio.AuthService, ...provider.AuthUserProvider, strategy.HttpStrategyService, WorkingTimingClimaService, Ssh2Service, FirebaseService],
})
export class AppModule {}
