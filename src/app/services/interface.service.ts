import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor() { }

  public notice: any = { showing: false }
  public alert: any = { showing: false }

  public showAlert = (message: string): void => {
    this.alert.message = message
    this.alert.showing = true
  };

  public closeAlert = (): void => { this.alert.showing = false }
  public alertMessage = (): string => this.alert.message
  public alertClasses = (): any => ({ 'alert-showing' : this.alert.showing })

  public showNotice = (message: string): void => {
    if (!this.notice.showing) {
      this.notice.showing = true
      this.notice.message = message
      setTimeout(() => {
        this.notice.showing = false
        this.notice.message = null
      }, 5000)
    }
  };

  public noticeClasses = (): any => ({ 'notice-showing': this.notice.showing })
}
