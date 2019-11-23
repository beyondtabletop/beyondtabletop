import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'bt-hold-delete',
  templateUrl: './hold-delete.component.html',
  styleUrls: ['./hold-delete.component.scss']
})

export class HoldDeleteComponent implements OnInit{
  @Input() public title: string
  @Output() public holdComplete: EventEmitter<any> = new EventEmitter()

  public time: number
  public subscription: Subscription
  public holdCounter: Observable<any>
  public LIMIT = 2000
  public INTERVAL_PERIOD = 25

  constructor (
    private sheetSvc: SheetService
  ) { }

  ngOnInit() {
    this.holdCounter = interval(this.INTERVAL_PERIOD).pipe(
      takeWhile(() => this.time >= 0)
    )
    this.time = this.LIMIT
  }

  ringClass() {
    this.time === this.LIMIT ? 'inactive' : 'active'
  }

  mouseDown() {
    this.unsubscribe()
    this.subscription = this.holdCounter.subscribe(() => {
      this.time -= this.INTERVAL_PERIOD
    }, () => {}, () => {
      if (this.time <= 0) {
        this.time = this.LIMIT
        this.holdComplete.emit()
      }
      this.unsubscribe()
    })
  }

  mouseUp() {
    this.time = this.LIMIT
    this.unsubscribe()
  }

  ringValue() {
    const time_ceiling = Math.min(this.time, this.LIMIT)
    const percent = Math.floor(time_ceiling * 100 / this.LIMIT)
    return Math.floor(percent * 6.29)
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null
    }
  }
}
