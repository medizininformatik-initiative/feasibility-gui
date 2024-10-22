import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum ErrorCodes {
  FEAS_10001 = 'FEAS-10001',
  FEAS_10002 = 'FEAS-10002',
  FEAS_10004 = 'FEAS-10004',
  FEAS_10005 = 'FEAS-10005',
  VAL_20001 = 'VAL-20001',
  SITE_NOT_FOUND = '404',
}

export enum MessageType {
  ERROR = 'ERROR',
  INFO = 'INFO',
}

export enum SnackbarColor {
  ERROR = 'red',
  INFO = 'green',
}
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private visibilitySubject = new Subject<boolean>();
  public visibility$ = this.visibilitySubject.asObservable();

  private messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();

  private colorSubject = new Subject<string>();
  public color$ = this.colorSubject.asObservable();

  constructor() {}

  public displayErrorMessage(errorCode: string, retryAfter: number = 0) {
    const validErrorCode = this.getErrorCodeEnum(errorCode);
    const message = `${MessageType.ERROR}.${validErrorCode}`;
    this.activateSnackbar(message, SnackbarColor.ERROR);
  }

  public displayInfoMessage(infoMessage: string, retryAfter: number = 0) {
    const validInfoMessage = this.getErrorCodeEnum(infoMessage);
    const message = `${MessageType.INFO}.${validInfoMessage}`;
    this.activateSnackbar(message, SnackbarColor.INFO);
  }

  public activateSnackbar(message: string, color: string) {
    this.visibilitySubject.next(true);
    this.messageSubject.next(message);
    this.colorSubject.next(color);
    //setTimeout(() => this.deactivateSnackbar(), 5000);
  }

  public deactivateSnackbar() {
    this.visibilitySubject.next(false);
  }

  private getErrorCodeEnum(errorCode: string): ErrorCodes | undefined {
    const normalizedCode = errorCode.replace(/-/g, '_') as keyof typeof ErrorCodes;
    return ErrorCodes[normalizedCode];
  }
}
