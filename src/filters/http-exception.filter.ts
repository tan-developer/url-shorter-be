import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable, Scope } from '@nestjs/common';
import { Request, Response } from 'express';
import type { Response as WrapperResponse } from 'src/interceptors/transform.interceptor';
import { RequestService } from '../request.service';


// Exception filter wrapper

@Injectable({scope : Scope.REQUEST})
@Catch(Error , HttpException , )
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly requestService : RequestService) {}
  catch(exception: Error | HttpException, host: ArgumentsHost): void {
      const context = host.switchToHttp();
      const response = context.getResponse<Response>()
      const request = context.getRequest<Request>();
      const status = exception instanceof HttpException ? exception.getStatus() : 400;
      const errorResponse : WrapperResponse<null> = {
        code : status,
        path : request.path,
        executionTime :  Date.now() - this.requestService.getTimestamp(),
        data : null,
        timeStamp :  Date.now(),
        message : exception.message,
        requestId : this.requestService.getRequestId()
      }
      if (status === 401) {
        response
          .status(status)
      } else {
        response
          .status(status)
          .json(errorResponse)
      }

  }
}
