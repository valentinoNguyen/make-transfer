import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Account, Transaction, TransferInfo } from '../models';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {
  private _mockTransactions: Transaction[];
  private _mockBalance = 10000;

  constructor(
    private http: HttpClient
  ) {
  }

  getCurrentAccountInfo(): Observable<Account> {
    return of({
      amountCurrency: {
        amount: this._mockBalance,
        currencyCode: "EUR"
      },
      minBalanceAllowed: -500
    });
  }

  getTransactions(): Observable<Transaction[]> {
    // GET CORS ERROR
    // const headers = new HttpHeaders()
    //   .append('Content-Type', 'application/json')
    //   .append('Access-Control-Allow-Headers', 'Content-Type')
    //   .append('Access-Control-Allow-Methods', 'GET')
    //   .append('Access-Control-Allow-Origin', '*');
    // return this.http.get<Transaction[]>('https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions', { headers });

    if (this._mockTransactions) {
      return of(this._mockTransactions);
    }
    return this.http.get<{ data: Transaction[] }>('/assets/sample-data/transactions.json').pipe(
      map(response => response.data),
      tap(transactions => this._mockTransactions = transactions)
    );
  }

  makeTransfer(transferInfo: TransferInfo): Observable<Transaction> {
    const newTransaction: Transaction = {
      id: uuidv4(),
      categoryCode: "#12a580",
      dates: {
        valueDate: new Date().getTime()
      },
      transaction: {
        amountCurrency: {
          amount: transferInfo.amount,
          currencyCode: "EUR"
        },
        type: "Salaries",
        creditDebitIndicator: "CRDT"
      },
      merchant: {
        name: transferInfo.toAccount,
        accountNumber: "SI64397745065188826"
      }
    };
    this._mockBalance -= transferInfo.amount;
    this._mockTransactions = [
      ...this._mockTransactions,
      newTransaction
    ];
    return of(newTransaction);
  }
}
