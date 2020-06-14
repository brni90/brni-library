import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../services/util.service';
import { GoogleLikeFilterParameter } from '../interfaces-internal';
import { stringify } from 'querystring';
import { IBLDataSource } from '../interfaces';

@Pipe({
  name: 'googleLikeFilter'
})
export class GoogleLikeFilterPipe implements PipeTransform {

  filterParams: GoogleLikeFilterParameter = null;

  constructor(private _utilService: UtilService) {
  }

  transform(value: IBLDataSource<any>, searchedValue: string, dataSourcePropertyToUse: string): any[] {
    if(value == null || value == void 0){
      return [];
    }

    if(value.dataSource == null || value.dataSource == void 0){
      return [];
    }

    if( searchedValue == null
        || searchedValue == void 0
        || (searchedValue != null && searchedValue !== void 0 && searchedValue.trim() === "")){
      return value.dataSource;
    }

    this.filterParams = this._buildFilterParams(searchedValue, dataSourcePropertyToUse);
    return value.dataSource.filter((item) => this._isStrContained(item));
  }

  _buildFilterParams(searchedValue: string, dataSourcePropertyToUse: string) : GoogleLikeFilterParameter{
    return {
      searchedValue: searchedValue,
      dataSourcePropertyToUse: dataSourcePropertyToUse
    };
  }

  _isStrContained(item: any): boolean {
    let found: boolean = false;
     if(this._utilService.isNotNullAndUndefined(item)){
       const itemStr: string = (this._utilService.isNotNullAndUndefined(this.filterParams.dataSourcePropertyToUse)) ?
                                     this._utilService.getObjProp(item, this.filterParams.dataSourcePropertyToUse)
                                     : item;
       return itemStr.includes(this.filterParams.searchedValue);
     }
    return found;
  }

}
