import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { ClockFactory, Clock } from '../../../shared/clock';
import anime from 'animejs';
import { Hole } from './hole.model';

@Component({
  selector: 'ac-radiogolf',
  templateUrl: './radiogolf.component.html',
  styleUrls: ['./radiogolf.component.css']
})
export class RadioGolfComponent implements OnInit, AfterViewChecked  {
  private clock: Clock;
  private readonly maxTime = 3000;
  private easing = [0, .2, 0, .95];
  private animating = false;
  public holes: Array<Hole> = [];
  private elements: any = {};
  private selectors = {
    path: '.js-radiogolf-path',
    ball: '.js-radiogolf-ball',
    hole: '.js-radiogolf-hole',
  };

  @Input() inputs: string;
  @Input() name: string;

  constructor() {
    this.clock = ClockFactory.create(this.maxTime);
  }

  public ngOnInit(): void {
    for (let i = 0; i < parseInt(this.inputs, 10); i++) {
      this.holes.push(new Hole())
    }

    this.elements.path = document.querySelector(this.selectors.path);
    this.elements.ball = document.querySelector(this.selectors.ball);
  }

  public ngAfterViewChecked(): void {
    let holes = document.querySelectorAll(this.selectors.hole);
    this.holes.forEach((hole: Hole, i: number) => {
      hole.create(holes[i]);
    });
  }

  private onFinishAnimation(): void {
    this.animating = false;
    var curTransform = new WebKitCSSMatrix(window.getComputedStyle(this.elements.path).webkitTransform);

    let pathLeft = this.elements.path.offsetLeft;

    let ballLeft = this.elements.ball.offsetLeft + curTransform.m41;
    let ballWidth = this.elements.ball.offsetWidth;

    for (let hole of this.holes) {
      let left = hole.base.offsetLeft - pathLeft;
      let width = hole.base.offsetWidth;
      hole.active = false;

      if (ballLeft >= left && ballLeft <= left + width) {
        hole.active = true;
      }
    }
  }

  public startCharging(): void {
    this.clock.start();
    let options = {
      translateX: 0,
      easing: 'linear',
      duration: 1
    };

    anime(Object.assign({}, options, {
      targets: this.elements.path,
    }));

    anime(Object.assign({}, options, {
      targets: this.elements.ball,
    }));
  }

  public stopCharging(): void {
    this.animating = true;
    let time = this.clock.stop();
    let translation = time * 100 / this.maxTime;
    var pr = prompt('translate %?');
    translation = parseFloat(pr);
    let options = {
      translateX: `${translation}%`,
      easing: this.easing
    };


    anime(Object.assign({}, options, {
      targets: this.elements.path,
    }));

    anime(Object.assign({}, options, {
      targets: this.elements.ball,
      translateX: `${-translation}%`,
    })).finished.then(() => this.onFinishAnimation());
  }

}
