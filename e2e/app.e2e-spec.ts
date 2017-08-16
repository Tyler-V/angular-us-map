import { AngularUsMapPage } from './app.po';

describe('angular-us-map App', () => {
  let page: AngularUsMapPage;

  beforeEach(() => {
    page = new AngularUsMapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
