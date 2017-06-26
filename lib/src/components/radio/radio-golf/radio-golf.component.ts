import { Component } from '@angular/core';
import { ClockFactory, Clock } from '../../../shared/clock';

@Component({
  selector: 'ac-radio-golf',
  templateUrl: './radio-golf.component.html'
})
export class RadioGolfComponent {
  private clock: Clock;
  private readonly maxTime = 3000;

  constructor() {
    this.clock = ClockFactory.create(this.maxTime);
  }
  
  public startCharging(): void {
    this.clock.start();
  }

  public stopCharging(): void {
    let time = this.clock.stop();
  }

}