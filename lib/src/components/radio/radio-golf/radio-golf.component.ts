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
    private easing: [0, .2, 0, .95];
    private reset: true;

    constructor() {
        this.clock = ClockFactory.create(this.maxTime);
    }

    public startCharging(): void {
        this.clock.start();
    }

    public stopCharging(): void {
        let time = this.clock.stop();
        let translation = time * 100 / this.maxTime;
        
        anime({
            targets: '.js-radio_golf-path',
            translateX: `${translation}%`,
            easing: this.easing
        });

        anime({
            targets: '.js-radio_golf-ball',
            translateX: `${-translation}%`,
            easing: this.easing
        });
    }

}
