import { AbsurdDemoPage } from './app.po';

describe('absurd-demo App', () => {
  let page: AbsurdDemoPage;

  beforeEach(() => {
    page = new AbsurdDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
