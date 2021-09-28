import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TransactionScreenComponent } from './components/transaction-screen/transaction-screen.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionScreenComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TransactionRoutingModule {
}
