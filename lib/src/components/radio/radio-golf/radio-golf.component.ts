import { Component } from '@angular/core';
import { ClockFactory, Clock } from '../../../shared/clock';
import anime from 'animejs';

@Component({
  selector: 'ac-radio_golf',
  templateUrl: './radio-golf.component.html',
  styleUrls: ['./radio-golf.component.css']
})
export class RadioGolfComponent {
  private clock: Clock;
  private readonly maxTime = 3000;
  private easing = [0, .2, 0, .95];
  private animating = false;
  private targets = {
    path: '.js-radio_golf-path',
    ball: '.js-radio_golf-ball'
  };

  constructor() {
    this.clock = ClockFactory.create(this.maxTime);
  }

  private onFinishAnimation(): void {
    this.animating = false;
  }

  public startCharging(): void {
    this.clock.start();
    let options = {
      translateX: 0,
      easing: 'linear',
      duration: 1
    };

    anime(Object.assign({}, options, {
      targets: this.targets.path,
    }));

    anime(Object.assign({}, options, {
      targets: this.targets.ball,
    }));
  }

  public stopCharging(): void {
    this.animating = true;
    let time = this.clock.stop();
    let translation = time * 100 / this.maxTime;
    let options = {
      translateX: `${translation}%`,
      easing: this.easing
    };

    anime(Object.assign({}, options, {
      targets: this.targets.path,
    }));

    anime(Object.assign({}, options, {
      targets: this.targets.ball,
      translateX: `${-translation}%`,
    })).finished.then(() => this.onFinishAnimation());
  }

}
