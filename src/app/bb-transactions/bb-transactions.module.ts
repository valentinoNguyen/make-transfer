import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

import { BbUIModule } from '../bb-ui/bb-ui.module';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionScreenComponent } from './components/transaction-screen/transaction-screen.component';
import { TransactionRoutingModule } from './bb-transactions-routing.module';
import { TransactionTransferFormComponent } from './components/transaction-transfer-form/transaction-transfer-form.component';


@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ReactiveFormsModule,
    BbUIModule,
    ModalModule.forRoot()
  ],
  declarations: [
    TransactionListComponent,
    TransactionScreenComponent,
    TransactionTransferFormComponent,
  ],
  providers: [
    CurrencyPipe
  ]
})
export class TransactionsModule { }
