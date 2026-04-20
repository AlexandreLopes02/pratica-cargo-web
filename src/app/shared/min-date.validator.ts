import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minTodayDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    // value vem como "YYYY-MM-DD"
    const selected = new Date(value + 'T00:00:00');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selected < today ? { pastDate: true } : null;
  };
}
