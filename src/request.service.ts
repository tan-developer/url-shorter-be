import { Global, Injectable, Scope } from '@nestjs/common';
import {v4} from 'uuid'


@Injectable({
  scope : Scope.REQUEST
})
export class RequestService {
  private _timeStamp : number
  private _requestId : string


  setTimeStamp(timeStamp : number): void {
    this._timeStamp = timeStamp;
  }

  setRequestId(requestId : string): void {
    this._requestId = requestId;
  }


  getRequestId(): string {
    return this._requestId;
  }

  getTimestamp() : number {
    return this._timeStamp;
  }
}
