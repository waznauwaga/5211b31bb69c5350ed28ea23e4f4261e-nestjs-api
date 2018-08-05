import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import cluster from'cluster';
import numCPUs from 'os'
declare const module: any;
async function bootstrap() {
  let port =process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port || 3001);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
