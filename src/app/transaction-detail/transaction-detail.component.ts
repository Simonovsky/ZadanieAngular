import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../transaction';
import { Location } from '@angular/common';


@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  transaction:Transaction

  constructor(
    private route: ActivatedRoute,
    private transactionService : TransactionService,
    private location: Location
  ) { 

  }

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.transactionService.getTransaction(id)
    .subscribe(transaction => this.transaction = transaction);
    
  }

  goBack(): void {
    this.location.back();
  }

}
