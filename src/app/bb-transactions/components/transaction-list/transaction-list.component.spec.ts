import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListComponent } from './transaction-list.component';
import { BbUIModule } from 'src/app/bb-ui/bb-ui.module';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
