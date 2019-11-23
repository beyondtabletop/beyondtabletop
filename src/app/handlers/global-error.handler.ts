import { Injectable, ErrorHandler } from '@angular/core';
import { InterfaceService } from '../services/interface.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private interfaceSvc: InterfaceService
  ) { }

  handleError(error: Error) {
    this.interfaceSvc.showNotice(`An error has occurred: ${error.message.substr(0, 150)}... See the JavaScript Console for more details.`)
    console.error(error)
  }
}
