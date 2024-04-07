import { HttpException, HttpStatus } from '@nestjs/common';

export class ExistingRecordException extends HttpException {
  constructor(message : string) {
    super(message , HttpStatus.BAD_REQUEST);
  }
}
