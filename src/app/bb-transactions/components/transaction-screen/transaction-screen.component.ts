import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionApiService } from '../../services/transaction-api.service';
import { Account, Transaction, TransferInfo } from '../../models';

@Component({
  selector: 'bb-transaction-screen',
  templateUrl: './transaction-screen.component.html',
  styleUrls: ['./transaction-screen.component.scss']
})
export class TransactionScreenComponent implements OnInit {
  currentAccount$: Observable<Account>;
  transactions$: Observable<Transaction[]>;
  constructor(
    private transactionSvc: TransactionApiService,
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  makeTransfer(transferInfo: TransferInfo): void {
    this.transactionSvc.makeTransfer(transferInfo).subscribe(_ => {
      this.fetchData();
    });
  }

  private fetchData(): void {
    this.transactions$ = this.transactionSvc.getTransactions();
    this.currentAccount$ = this.transactionSvc.getCurrentAccountInfo();
  }
}
