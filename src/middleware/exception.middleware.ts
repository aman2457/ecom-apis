import { NextFunction, Request, Response } from 'express';
import CommonHttpException from '../exceptions/CommonHttpException';
 
export default function errorMiddleware(error: CommonHttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .send({
      message,
    })
}
