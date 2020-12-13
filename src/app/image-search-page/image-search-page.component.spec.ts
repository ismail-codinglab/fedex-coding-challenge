import { of } from 'rxjs';
import { ImageSearchPageComponent } from './image-search-page.component';

jest.mock('@angular/router');

const provide = (mock: any): any => mock;
const basicListData = {
  pagination: {
    total_count: 100,
    count: 10,
    offset: 0,
  },
  data: [
    {
      url: 'https://media2.giphy.com/media/TYlus7VAr9c4M/giphy-preview.gif',
    },
  ],
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
describe('LoginPageComponent', () => {
  let imageSearchPage: ImageSearchPageComponent;
  const debounceTime = 500 + 100; /** 100ms margin for code execution */
  const responseTime = 1000;

  beforeEach(() => {
    const http = { get: jest.fn(() => of(basicListData)) };
    imageSearchPage = new ImageSearchPageComponent(provide(http));
    imageSearchPage.ngOnInit();
  });

  describe('Happy flow', () => {
    it('should be able to search for images', async () => {
      const spy = jest.spyOn(imageSearchPage, 'searchGiphy');
      imageSearchPage.searchControl.setValue('test');
      await sleep(debounceTime);
      expect(spy).toHaveBeenCalledTimes(1);
      await sleep(responseTime); // wait for searchGiphy to process request
      expect(imageSearchPage.gifs).toHaveProperty('length', 1);
    });

    it('should reset offset to 0 when searching for new searchterm', async () => {
      imageSearchPage.offsetControl.setValue(1);
      expect(imageSearchPage.offsetControl.value).toEqual(1);
      imageSearchPage.searchControl.setValue('test');
      imageSearchPage.searchControl.markAsDirty();
      await sleep(debounceTime);
      expect(imageSearchPage.offsetControl.value).toEqual(0);
    });

    it('should not trigger a new search when same text is entered', async () => {
      const spy = jest.spyOn(imageSearchPage, 'searchGiphy');
      imageSearchPage.searchControl.setValue('test');
      await sleep(debounceTime);
      expect(spy).toHaveBeenCalledTimes(1);

      imageSearchPage.searchControl.setValue('notTest');
      imageSearchPage.searchControl.setValue('test');
      await sleep(debounceTime);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not trigger a new search when typing next character within 500ms', async () => {
      const spy = jest.spyOn(imageSearchPage, 'searchGiphy');
      imageSearchPage.searchControl.setValue('tes');
      await sleep(100);

      imageSearchPage.searchControl.setValue('test');
      await sleep(debounceTime);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Non-happy flow', () => {
    it('should show error when after field is filled it is left empty', () => {
      // always test initial/pre conditions to prevent false positives.
      // E.g. if i didn't do these two lines below, it could be false even without setValue('')
      imageSearchPage.searchControl.setValue('test');
      expect(imageSearchPage.searchForm.valid).toEqual(true);

      imageSearchPage.searchControl.setValue('');
      expect(imageSearchPage.searchForm.valid).toEqual(false);
    });
    it('should show error when inserting bad words', () => {
      imageSearchPage.searchControl.setValue('test');
      expect(imageSearchPage.searchForm.valid).toEqual(true);

      imageSearchPage.searchControl.setValue('badWords');
      expect(imageSearchPage.searchForm.valid).toEqual(false);
    });
  });
});
