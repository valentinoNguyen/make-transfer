import { CurrencyPipe } from '@angular/common';
import { Component, Input, Output, TemplateRef, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Account } from '../../models';
import { TransferInfo } from '../../models/transfer-info.model';
import { balanceMinExceedValidator } from '../../validators';

@Component({
  selector: 'app-transaction-transfer-form',
  templateUrl: './transaction-transfer-form.component.html',
  styleUrls: ['./transaction-transfer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionTransferFormComponent {
  @Input() set currentAccount(account: Account) {
    if (account) {
      this.setCurrentAccount(account);
    }
  }
  @Output() makeTransfer = new EventEmitter<TransferInfo>();

  formGroup: FormGroup;
  formSubmitted = false;
  modalRef?: BsModalRef;
  account: Account;
  transferInfo?: TransferInfo;
  decimalRegex = /^\d*[.]?\d*$/;

  get toAccountCtr(): AbstractControl { return this.formGroup.get('toAccount'); }
  get amountCtr(): AbstractControl { return this.formGroup.get('amount'); }


  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private modalService: BsModalService
  ) {
    this.formGroup = fb.group({
      fromAccount: [{ value: null, disabled: true }],
      toAccount: [null, [Validators.required]],
      amount: [null],
    });
  }

  submit(modalTemplate: TemplateRef<any>): void {
    this.formSubmitted = true;
    if (this.formGroup.valid) {
      const { toAccount, amount } = this.formGroup.value;
      this.transferInfo = {
        toAccount,
        amount: Number(amount)
      };
      this.openReviewModal(modalTemplate);
    }
  }

  sendTransfer(): void {
    this.makeTransfer.emit(this.transferInfo);
  }

  private openReviewModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  private setCurrentAccount(account: Account): void {
    this.account = account;
    const { currencyCode = 'EUR', amount = 0 } = account.amountCurrency;

    this.formGroup.patchValue({
      fromAccount: `My Personal Account: ${this.currencyPipe.transform(amount, currencyCode)}`,
      toAccount: null,
      amount: null,
    });

    this.amountCtr.clearValidators();
    this.amountCtr.setValidators([Validators.required, Validators.min(0), Validators.pattern(this.decimalRegex), balanceMinExceedValidator(account.minBalanceAllowed, amount)]);
    this.amountCtr.updateValueAndValidity();
    this.formSubmitted = false;
  }
}
