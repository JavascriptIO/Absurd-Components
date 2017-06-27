let selectors = {
  target: '.js-radio_golf-target',
  label: '.js-radio_golf-label',
  input: '.js-radio_golf-input',
};

export class Hole {
  public base: HTMLElement;
  public target: HTMLElement;
  public input: HTMLElement;
  public label: HTMLElement;
  public active = false;

  create(element: Element) {
    this.base = element as HTMLElement;
    this.target = this.base.querySelector(selectors.target) as HTMLElement;
    this.label = this.base.querySelector(selectors.label) as HTMLElement;
    this.input = this.base.querySelector(selectors.input) as HTMLElement;
  }
}