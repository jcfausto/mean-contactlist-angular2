import { MeanContaclistAngular2Page } from './app.po';

describe('mean-contaclist-angular2 App', function() {
  let page: MeanContaclistAngular2Page;

  beforeEach(() => {
    page = new MeanContaclistAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
