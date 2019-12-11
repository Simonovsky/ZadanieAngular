import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  hero: Hero;

  sender: Hero;
  reciever: Hero;

  transactions: Transaction[];


  constructor(
    private transactionService: TransactionService,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
    this.getTransaction();
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  getTransaction(): void {
    this.transactionService.getTransactions()
    .subscribe(transaction => this.transactions = transaction);
  }

  add(note: string, amount:number, senderId: number, recieverId:number, type: string): void {
    this.transactionService.addTransaction({ senderId:senderId , recieverId:recieverId, amount:amount, note:note, type:type } as Transaction)
      .subscribe(transaction => {
        this.transactions.push(transaction);
      });


    this.heroService.getHero(recieverId.valueOf())
      .subscribe(hero => {this.reciever = hero

      this.sender = this.hero;
      
      this.sender.balance = parseFloat( this.sender.balance.toString() ) - parseFloat( amount.toString() ) ;
      this.reciever.balance = parseFloat( this.reciever.balance.toString() ) + parseFloat( amount.toString() ) ;

      this.heroService.updateHero(this.sender)
      .subscribe(() => this.doNothing());

      this.heroService.updateHero(this.reciever)
      .subscribe(() => this.doNothing());
              
    });
  }

  doNothing(){

  }

  goBack(): void {
    this.location.back();
  }

  newTransactionnote(note: string, amount:number, senderId: number, recieverId:number, type:string): void {
    if (!amount) { return; }
    this.transactionService.addTransaction({ senderId , recieverId, amount, note , type} as Transaction)
      .subscribe(transaction => {
        this.transactions.push(transaction);
      });

      this.getHero
  }

  delete(transaction: Transaction): void {
    this.transactions = this.transactions.filter(h => h !== transaction);
    this.transactionService.deleteTransaction(transaction).subscribe();
  }

}