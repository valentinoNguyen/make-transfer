import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransactionTransferFormComponent } from './transaction-transfer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BbUIModule } from 'src/app/bb-ui/bb-ui.module';

describe('TransactionTransferFormComponent', () => {
  let component: TransactionTransferFormComponent;
  let fixture: ComponentFixture<TransactionTransferFormComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ModalModule.forRoot(),
        BbUIModule
      ],
      declarations: [ TransactionTransferFormComponent ],
      providers: [CurrencyPipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTransferFormComponent);
    component = fixture.componentInstance;
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
});
