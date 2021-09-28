import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function balanceMinExceedValidator(minBalance: number, currentBalance: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentValue = Number(control.value);

    if (isNaN(currentValue) || currentValue === null || control.invalid) {
      return null;
    }

    if ((currentBalance - currentValue) < minBalance) {
      return {
        balanceMinExceed: true
      };
    }

    return null;
  };
}