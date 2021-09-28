import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { Transaction } from '../../models';

@Component({
  selector: 'bb-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent {
  @Input() set transactions(transactions: Transaction[]) {
    if (transactions) {
      const sortedTransactions = [...transactions];
      sortedTransactions.sort((a, b) =>
        new Date(b.dates.valueDate).getTime() - new Date(a.dates.valueDate).getTime()
      );
      this.transactionsSubject$.next(sortedTransactions);
    }
  }

  filteredTransactions$: Observable<Transaction[]>;

  private filterChangeSubject$ = new Subject<string>();
  private transactionsSubject$ = new Subject<Transaction[]>();

  constructor() {
    this.filteredTransactions$ = combineLatest([
      this.transactionsSubject$.asObservable(),
      this.filterChangeSubject$.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
      )
    ]).pipe(
      map(([transactions, searchTerm]) => {
        const searchTermLowerCase = searchTerm ? searchTerm.toLocaleLowerCase() : '';
        if (searchTermLowerCase) {
          return transactions.filter(t => t.merchant?.name?.toLocaleLowerCase().includes(searchTermLowerCase));
        }
        return [...transactions];
      })
    );
  }

  searchChange(searchTerm: string): void {
    this.filterChangeSubject$.next(searchTerm);
  }
}
