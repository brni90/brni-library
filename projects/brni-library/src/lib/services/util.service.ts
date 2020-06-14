import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public isNotNullAndUndefined(element: any){
    if(element != null && element !== void 0){
      return true;
    }
    return false;
  }

  public getObjProp(item: any, prop: string){
    if(item == null || item === void 0){
      return null;
    }
    return item[prop];
  }
}
