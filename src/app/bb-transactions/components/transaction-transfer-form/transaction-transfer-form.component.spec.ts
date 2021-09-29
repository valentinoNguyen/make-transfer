import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionTransferFormComponent } from './transaction-transfer-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BbUIModule } from 'src/app/bb-ui/bb-ui.module';

describe('TransactionTransferFormComponent', () => {
  let component: TransactionTransferFormComponent;
  let fixture: ComponentFixture<TransactionTransferFormComponent>;
  let formGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ModalModule.forRoot(),
        BbUIModule
      ],
      declarations: [TransactionTransferFormComponent],
      providers: [CurrencyPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTransferFormComponent);
    component = fixture.componentInstance;
    component.currentAccount = {
      amountCurrency: {
        currencyCode: 'EUR',
        amount: 10000,
      },
      minBalanceAllowed: -500,
    };
    formGroup = component.formGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger make transfer event', () => {
    spyOn(component.makeTransfer, 'emit');
    component.sendTransfer();
    expect(component.makeTransfer.emit).toHaveBeenCalled();
  });

  it('should have correct number of input', () => {
    const formElm = fixture.debugElement.nativeElement.querySelector('#transfer-form');
    const inputElms = formElm.querySelectorAll('input');
    expect(inputElms.length).toEqual(3);
  });

  it('should have from account input disabled', () => {
    expect(formGroup.get('fromAccount').disabled).toEqual(true);
  });

  it('should have correct value binding when account input change', () => {
    const fromAccountValue = formGroup.get('fromAccount').value;
    const toAccountValue = formGroup.get('toAccount').value;
    const amountValue = formGroup.get('amount').value;
    expect(fromAccountValue).toEqual('My Personal Account: €10,000.00');
    expect(toAccountValue).toEqual(null);
    expect(amountValue).toEqual(null);
  });

  it('should show require validation error on form submitted', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();
    const errors = fixture.debugElement.nativeElement.querySelectorAll('.invalid-feedback');
    expect(errors.length).toEqual(2);
    expect(errors[0].textContent.trim()).toEqual('This field is required');
  });

  it('should show invalid amount validation error on form submitted', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    const amountInput = fixture.debugElement.nativeElement.querySelector('#amount');

    expect(button).toBeTruthy();
    expect(amountInput).toBeTruthy();

    amountInput.value = '1000a';
    amountInput.dispatchEvent(new Event('input'));

    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(_ => {
      const errors = fixture.debugElement.nativeElement.querySelectorAll('.invalid-feedback');

      expect(errors.length).toEqual(2);
      expect(errors[0].textContent.trim()).toEqual('This field is required');
      expect(errors[1].textContent.trim()).toEqual('Invalid amount');
    });
  });

  it('should show not enough balance validation error on form submitted', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    const amountInput = fixture.debugElement.nativeElement.querySelector('#amount');

    expect(button).toBeTruthy();
    expect(amountInput).toBeTruthy();

    amountInput.value = '10501';
    amountInput.dispatchEvent(new Event('input'));

    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(_ => {
      const errors = fixture.debugElement.nativeElement.querySelectorAll('.invalid-feedback');

      expect(errors.length).toEqual(2);
      expect(errors[0].textContent.trim()).toEqual('This field is required');
      expect(errors[1].textContent.trim()).toEqual('There is not enough balance');
    });
  });
});
