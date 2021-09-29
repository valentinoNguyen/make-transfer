import { ComponentFixture, async as realAsync, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { TransactionListComponent } from './transaction-list.component';
import { BbUIModule } from 'src/app/bb-ui/bb-ui.module';

function setTimeoutPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BbUIModule
      ],
      declarations: [TransactionListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    component.transactions = [
      {
        id: '1',
        categoryCode: "#12a580",
        dates: {
          valueDate: new Date().getTime()
        },
        transaction: {
          amountCurrency: {
            amount: 200,
            currencyCode: "EUR"
          },
          type: "Salaries",
          creditDebitIndicator: "CRDT"
        },
        merchant: {
          name: 'Backbase',
          accountNumber: "SI64397745065188826"
        }
      },
      {
        id: '2',
        categoryCode: "#d51271",
        dates: {
          valueDate: new Date().getTime()
        },
        transaction: {
          amountCurrency: {
            amount: 400,
            currencyCode: "EUR"
          },
          type: "Salaries",
          creditDebitIndicator: "CRDT"
        },
        merchant: {
          name: 'Texaco',
          accountNumber: "SI64397745065188826"
        }
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct items on filter change', () => {
    const filterInput = fixture.debugElement.nativeElement.querySelector('#transactions');
    expect(filterInput).toBeTruthy();

    filterInput.value = 'back';
    filterInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.filteredTransactions$.subscribe(filteredItems => {
      console.log('------filteredItems');
      console.log(filteredItems);
      expect(filteredItems.length).toEqual(1);
    });
  });
});
