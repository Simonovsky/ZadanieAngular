import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  transactions : Transaction[]

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private transactionService : TransactionService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getTransaction();
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


  goBack(): void {
    this.location.back();
  }

  

 save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}