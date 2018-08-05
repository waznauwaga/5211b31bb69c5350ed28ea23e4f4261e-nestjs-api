import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as WebSocket from 'ws';
@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer() server;

  create(port: number, options: any = {}): any {
    return new WebSocket.Server({ port, ...options });
  }

  @SubscribeMessage('events')
  onEvent(client: any, data: any): WsResponse<any> {
    const event = 'events';
    const response = [1, 2, 3];
    
    return { event, data }; //from(response).pipe(map(res => ({ event, data: res })));
  }
}
