import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Transaction } from './transaction';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionsUrl = 'api/transactions';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(  
  private http: HttpClient,
  private messageService: MessageService) { }

  /** POST: add a new transaction to the server */
  addTransaction (transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionsUrl, transaction, this.httpOptions).pipe(
      tap((newTransaction: Transaction) => this.log(`added transaction w/ id=${newTransaction.id}`)),
      catchError(this.handleError<Transaction>('addTransaction'))
    );
  }

  /** GET transactiones from the server */
  getTransactions (): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsUrl)
      .pipe(
        tap(_ => this.log('fetched transactions')),
        catchError(this.handleError<Transaction[]>('getTransactions', []))
      );
  }

  /** Log a TransactionService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`TransactionService: ${message}`);
  }

  getTransaction(id: number): Observable<Transaction> {
    const url = `${this.transactionsUrl}/${id}`;
    return this.http.get<Transaction>(url).pipe(
      tap(_ => this.log(`fetched transaction id=${id}`)),
      catchError(this.handleError<Transaction>(`getTransaction id=${id}`))
    );
  }

  /** DELETE: delete the Transaction from the server */
  deleteTransaction (transaction: Transaction | number): Observable<Transaction> {
    const id = typeof transaction === 'number' ? transaction : transaction.id;
    const url = `${this.transactionsUrl}/${id}`;

    return this.http.delete<Transaction>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted transaction id=${id}`)),
      catchError(this.handleError<Transaction>('deleteTransaction'))
    );
  }

  /** PUT: update the Transaction on the server */
  updateTransaction (transaction: Transaction): Observable<any> {
    return this.http.put(this.transactionsUrl, transaction, this.httpOptions).pipe(
      tap(_ => this.log(`updated transaction id=${transaction.id}`)),
      catchError(this.handleError<any>('updateTransaction'))
    );
  }
  

  /* GET transactions whose name contains search term */
  searchTransactions(term: string): Observable<Transaction[]> {
    if (!term.trim()) {
      // if not search term, return empty Transaction array.
      return of([]);
    }
    return this.http.get<Transaction[]>(`${this.transactionsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found transactions matching "${term}"`)),
      catchError(this.handleError<Transaction[]>('searchTransactions', []))
    );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  **/
  private handleError<T> (operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {

     // TODO: send the error to remote logging infrastructure
     console.error(error); // log to console instead

     // TODO: better job of transforming error for user consumption
     this.log(`${operation} failed: ${error.message}`);

     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
}
}