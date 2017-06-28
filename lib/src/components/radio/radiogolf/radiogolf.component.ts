import { Component, Input, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
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
  private readonly easing = [0, .2, 0, .95];
  private animating = false;
  public holes: Array<Hole> = [];
  private element: Element;
  private $ball: HTMLElement;
  private $path: HTMLElement;
  private readonly selectors = {
    path: '.js-radiogolf-path',
    ball: '.js-radiogolf-ball',
    hole: '.js-radiogolf-hole'
  };

  @Input() inputs: string;
  @Input() name: string;

  constructor(private elementRef: ElementRef) {
    this.clock = ClockFactory.create(this.maxTime);
    this.element = this.elementRef.nativeElement as Element;
  }

  public ngOnInit(): void {
    for (let i = 0; i < parseInt(this.inputs, 10); i++) {
      this.holes.push(new Hole())
    }

    this.$path = this.element.querySelector(this.selectors.path) as HTMLElement;
    this.$ball = this.element.querySelector(this.selectors.ball) as HTMLElement;
  }

  public ngAfterViewChecked(): void {
    let holes = this.element.querySelectorAll(this.selectors.hole);
    this.holes.forEach((hole: Hole, i: number) => {
      hole.create(holes[i]);
    });
  }

  private onFinishAnimation(): void {
    this.animating = false;
    var curTransform = new WebKitCSSMatrix(window.getComputedStyle(this.$path).webkitTransform);

    let pathLeft = this.$path.offsetLeft;

    let ballLeft = this.$ball.offsetLeft + curTransform.m41;
    let ballWidth = this.$ball.offsetWidth;

    for (let hole of this.holes) {
      let left = hole.target.offsetLeft - pathLeft;
      let width = hole.target.offsetWidth;
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
      targets: this.$path
    }));

    anime(Object.assign({}, options, {
      targets: this.$ball
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
      targets: this.$path,
    }));

    anime(Object.assign({}, options, {
      targets: this.$ball,
      translateX: `${-translation}%`,
    })).finished.then(() => this.onFinishAnimation());
  }

}
