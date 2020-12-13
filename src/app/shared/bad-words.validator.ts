import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as BadWordsFilter from 'bad-words';

const filter = new BadWordsFilter();
filter.addWords('badwords');

/* bad words will invalidate input */
export function BadWordsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return filter.isProfane(control.value) ? { badWord: { value: control.value } } : null;
  };
}
