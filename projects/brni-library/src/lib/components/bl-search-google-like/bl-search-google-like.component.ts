import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { fromEvent, Subscription, Subject} from 'rxjs';
import { takeUntil, map, debounceTime, filter, distinctUntilChanged, delay } from 'rxjs/operators';
import { IBLDataSource } from '../../interfaces';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'lib-bl-search-google-like',
  templateUrl: './bl-search-google-like.component.html',
  styleUrls: ['./bl-search-google-like.component.scss']
})
export class BlSearchGoogleLikeComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @ViewChild('inputsearch') inputSearchElement: ElementRef;
  toDestroy = new Subject<void>();

  @Input() placeHolder: string = '';
  @Input() debounceTime: number = 500; //default 500ms
  @Input() dataSourceObj: IBLDataSource<any>;
  @Input() dataSourcePropertyToUse: string = null;
  @Input() isDynamicDataSource: boolean = false;
  @Input() noResultsFound: string = 'Nessun risultato trovato';

  @Input() heightInputText: string = '30px';
  @Input() maxHeightDropdown: string = '200px';
  @Input() width: string = '200px';

  @Input() delayBlurEvent: number = 150;

  @Output() searchedValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() waitingForDataSource: EventEmitter<boolean> = new EventEmitter<boolean>();

  inputValue: string = null;
  lastSearchedValue: string = null;
  isDropDownVisible: boolean = false;
  excludeNext: string = null;

  minWidth: string = '100px';
  spinnerVisible: boolean = false;
  
  constructor(private _utilService: UtilService) { }

  ngOnInit(): void {
    if(this.isDynamicDataSource){
      this.setSpinnerVisible(true);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes != null && changes !== void 0){
      if(changes["dataSourceObj"] != null && changes["dataSourceObj"] !== void 0){
        if(this.dataSourceObj != null && this.dataSourceObj !== void 0
          && this.dataSourceObj.searchedValue === this.lastSearchedValue){
            this.checkWaitingForDS(false);
            this.isDropDownVisible = true;
          }
      }
    }
  }
  

  ngAfterViewInit(): void {

    fromEvent(this.inputSearchElement.nativeElement, 'input')
    .pipe(
      takeUntil(this.toDestroy),
      debounceTime(this.debounceTime),
      map((e: any) => {
        if(this.isNotNullAndUndefined(e) && this.isNotNullAndUndefined(e.target)){
          return e.target.value;
        }})
      )
    .subscribe((value) => {

      //if the datasource type is dynamic and the "value" is the last value selected ("excludeNext"),
      //enable the waiting for the DS
      if(!this.isToExclude(value)){
        this.checkWaitingForDS(true);
      } 

      this.emitSearchedValue(value);
    });

    /**
     * Opens the drowpdown when focus event triggers
     */
    fromEvent(this.inputSearchElement.nativeElement, 'focus')
    .pipe(
      takeUntil(this.toDestroy)
      )
    .subscribe((value) => {
      this.isDropDownVisible = true;
    });

    /**
     * Close the drowpdown when blur event triggers
     */
    fromEvent(this.inputSearchElement.nativeElement, 'blur')
    .pipe(
      takeUntil(this.toDestroy),
      delay(this.delayBlurEvent)
      )
    .subscribe((value) => {
      this.isDropDownVisible = false;
    });

  }
  

  /**
   * Comparison between the @param value and the excludeNext params which contains
   * the last value selected by the user.
   * 
   * If the comparison matches, return true. Otherwise, false.
   */
  isToExclude(value: string): boolean {
    let res: boolean = false;
    if(this.excludeNext != null && this.excludeNext === value){
      res = true;
    }
    return res;
  }

  
  /**
   * If the datasource type is dynamic, this method modify the spinner visibility and
   * emit the value specifiyng we are still waiting or not for the new DS
   * 
   */
  checkWaitingForDS(waiting: boolean){
    if(this.isDynamicDataSource){
      this.waitingForDataSource.emit(waiting);  
      this.setSpinnerVisible(waiting);
    }
  }

  /**
   * Method used when the user select an item from the dropdown
   * 
   * @param item: the item selected
   */
  select(item: any){
    this.selectedValue.emit(item);
    this.isDropDownVisible = false;
    this.inputValue = this.retrieveValueFromItem(item);
    this.excludeNext = this.retrieveValueFromItem(item);
  }


  /**
   * Method used to set the visibility of the spinner
   *
   */
  setSpinnerVisible(visible: boolean){
    this.spinnerVisible = visible;
  }

  /**
   * Method used when we want to emit the value inserted in the search box by the user
   */
  emitSearchedValue(valueInserted: string){
    this.lastSearchedValue = valueInserted;
    this.searchedValue.emit(valueInserted);
  }



  /**
   * Retrieve the value of the property with name {{dataSourcePropertyToUse}}
   * 
   * @param item: the object we want to discover the property name 
   */
  retrieveValueFromItem(item: any){
    let res: string = null;
    if(this.isNotNullAndUndefined((this.dataSourcePropertyToUse))){
      res = this.getObjProp(item, this.dataSourcePropertyToUse);
    } else {
      res = item;
    }
    return res;
  }

  /**
   * Returns the value of a specific property on an object
   *  
   * @param item: the object
   * @param prop: the property name
   */
  getObjProp(item: any, prop: string){
    return this._utilService.getObjProp(item, prop);
  }

  
  /**
   * Method to check if a generic @param element is not null and undefined
   * 
   */
  isNotNullAndUndefined(element: any){
    return this._utilService.isNotNullAndUndefined(element);
}

/**
 * Method to check if the datasource @param DS is not null and undefined
 * 
 */
isNotNullAndUndefinedDS(DS: IBLDataSource<any>){
  if(!this.isNotNullAndUndefined(DS)){
    return false;
  }
  if(!this.isNotNullAndUndefined(DS.dataSource)){
    return false;
  }
  return true;
}

  /**
   * Method used to unsubscribe from the observable used for searching
   */
  ngOnDestroy(): void {
    this.toDestroy.next();
    this.toDestroy.complete();
  }

}
