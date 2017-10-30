import { OoklaAngularPage } from './app.po';

describe('ookla-angular App', () => {
  let page: OoklaAngularPage;

  beforeEach(() => {
    page = new OoklaAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
