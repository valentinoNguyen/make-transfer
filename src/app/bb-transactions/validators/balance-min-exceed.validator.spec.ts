import { FormControl, Validators } from '@angular/forms';
import { balanceMinExceedValidator } from "./balance-min-exceed.validator";

describe('balanceMinExceedValidator', () => {
  const validator = balanceMinExceedValidator(-500, 10000);
  const control = new FormControl('input');

  it('should return null when value is valid', () => {
    control.setValue(1000);
    expect(validator(control)).toEqual(null);
  });

  it('should return error when value is invalid', () => {
    control.setValue(10501);
    expect(validator(control)).toEqual({ balanceMinExceed: true });
  });

  it('should return null when value is empty', () => {
    control.setValue('');
    expect(validator(control)).toEqual(null);
  });

  it('should return null on control is invalid', () => {
    control.setValue(null);
    control.setValidators(Validators.required);
    control.updateValueAndValidity();
    expect(validator(control)).toEqual(null);
  });

  it('should return null on value is not a number', () => {
    control.setValue('100abc');
    expect(validator(control)).toEqual(null);
  });

});
