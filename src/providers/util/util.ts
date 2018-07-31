import { HttpClient } from '@angular/common/http';
import {ElementRef, Injectable} from '@angular/core';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  constructor(public element:ElementRef) {}

///...///

  protected autoSizeDescription(): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height 	= 'auto';
    textArea.style.height 	= textArea.scrollHeight + 'px';
    return;
  }

}
