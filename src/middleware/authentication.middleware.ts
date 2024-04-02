import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import {v4 as uuidv4} from 'uuid'
import { RequestService } from '../request.service';

@Injectable()
export class  AuthenticationMiddleware implements NestMiddleware {

  constructor (private readonly requestService: RequestService) {}

  use(req:  Request, res: Response, next: NextFunction) : void {
    // Basic Authencation

    const requestId = uuidv4();

    this.requestService.setRequestId(requestId);
    this.requestService.setTimeStamp(Date.now());

    next()
  }

}
