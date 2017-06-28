let selectors = {
  target: '.js-radiogolf-target',
  label: '.js-radiogolf-label',
  input: '.js-radiogolf-input',
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