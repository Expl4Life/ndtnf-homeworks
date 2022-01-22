import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler):  Observable<any> {
    return next.handle().pipe(
    map(data => ({ status: "success", data })), 
    catchError((err: any) => {
        return throwError(new BadGatewayException({data: err || 'error', status: "fail"}));
    }));
  }
}