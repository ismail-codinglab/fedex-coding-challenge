import 'jest-preset-angular';

Object.defineProperty(window, 'DragEvent', {
  // tslint:disable-next-line:identifier-blacklist
  value: class DragEvent {},
});
