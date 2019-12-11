import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 0, name: 'Jozo', balance: 20000 },
      { id: 1, name: 'Marco', balance: 20000 },
      { id: 2, name: 'Kristina', balance: 20000 },
      { id: 3, name: 'Sara',balance: 20000 },
    ];

    const transactions = [
      {id: 0, senderId: 0, recieverId: 2, amount: 100, note: " Pneumatiky " , type: "Payment" },
      {id: 1, senderId: 1, recieverId: 0, amount: 150, note: " Svetla " , type: "Payment" },
      {id: 2, senderId: 2, recieverId: 1, amount: 10320, note: " Auto " , type: "Card" },
      {id: 3, senderId: 2, recieverId: 0, amount: 1005, note: " Iphone " , type: "Payment" }
    ] ;
    
    return {heroes , transactions};
  }



  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[] , transactions:Transaction[]): number {
    if(heroes.length > 0){
    return heroes.length > 0 ? Math.max(...heroes.map(Hero => Hero.id)) + 1 : 11;
    }else{
    return transactions.length > 0 ? Math.max(...transactions.map(Transaction => Transaction.id)) + 1 : 11;
    }
  }

}
