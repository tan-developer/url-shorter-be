import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { v4 as uuidv4 } from 'uuid';
import { RequestService } from '../request.service';

export interface Response<T> {
  code: number;
  message: string;
  timeStamp : number;
  path : string;
  executionTime : number;
  requestId : string;
  data: T;
}

@Injectable()
export class TransformationInterceptor<T> implements NestInterceptor<T,
  Response<T>> {
  constructor(
      private reflector: Reflector,
      private readonly requestService : RequestService
    ) {}
  intercept(context: ExecutionContext, next: CallHandler):
    Observable<Response<T>> {
    const now = Date.now();
    return next.handle().pipe(
      map((data) => ({
        message: this.reflector?.get<string>('response_message',
          context?.getHandler()) || data?.message || '',
        code: context.switchToHttp().getResponse().statusCode,
        timeStamp : Date.now(),
        path : context.switchToHttp().getRequest().path,
        executionTime :now - this.requestService.getTimestamp() ,
        requestId : this.requestService.getRequestId(),
        data: data,
      }))
    );
  }
}
