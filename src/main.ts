import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Logger } from '@nestjs/common';
import * as passport from 'passport';
import * as redis from 'redis';

const RedisStore = require('connect-redis').default;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
