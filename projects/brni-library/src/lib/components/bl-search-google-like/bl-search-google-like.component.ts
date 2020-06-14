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
  
  isNotNullAndUndefined(element: any){
      return this._utilService.isNotNullAndUndefined(element);
  }
  
  isNotNullAndUndefinedDS(DS: IBLDataSource<any>){
    if(!this.isNotNullAndUndefined(DS)){
      return false;
    }
    if(!this.isNotNullAndUndefined(DS.dataSource)){
      return false;
    }
    return true;
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
      console.log('input', value);
      if(!this.isToExclude(value)){
        this.checkWaitingForDS(true);
      } else {
        this.excludeNext = null;
      }
      this.emitSearchedValue(value);
    });

    fromEvent(this.inputSearchElement.nativeElement, 'focus')
    .pipe(
      takeUntil(this.toDestroy)
      )
    .subscribe((value) => {
      this.isDropDownVisible = true;
    });

    fromEvent(this.inputSearchElement.nativeElement, 'blur')
    .pipe(
      takeUntil(this.toDestroy),
      delay(150)
      )
    .subscribe((value) => {
      this.isDropDownVisible = false;
    });

  }

  isToExclude(value: string): boolean {
    let res: boolean = false;
    if(this.excludeNext != null && this.excludeNext === value){
      res = true;
    }
    return res;
  }

  select(item: any){
    this.selectedValue.emit(item);
    this.isDropDownVisible = false;
    this.inputValue = this.retrieveValueFromItem(item);
    this.excludeNext = this.retrieveValueFromItem(item);
  }

  checkWaitingForDS(waiting: boolean){
    if(this.isDynamicDataSource){
      this.waitingForDataSource.emit(waiting);  
      this.setSpinnerVisible(waiting);
    }
  }

  setSpinnerVisible(visible: boolean){
    this.spinnerVisible = visible;
  }

  emitSearchedValue(valueInserted: string){
    this.lastSearchedValue = valueInserted;
    this.searchedValue.emit(valueInserted);
  }

  ngOnDestroy(): void {
    this.toDestroy.next();
    this.toDestroy.complete();
  }

  retrieveValueFromItem(item: any){
    let res: string = null;
    if(this.isNotNullAndUndefined((this.dataSourcePropertyToUse))){
      res = this.getObjProp(item, this.dataSourcePropertyToUse);
    } else {
      res = item;
    }
    return res;
  }

  getObjProp(item: any, prop: string){
    return this._utilService.getObjProp(item, prop);
  }

}
