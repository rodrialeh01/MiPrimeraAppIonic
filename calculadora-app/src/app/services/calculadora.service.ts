import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';

export interface OperacionRequest {
  num1:number;
  num2:number;
}

export interface OperacionResponse {
  resultado: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  private apiUrl = 'http://localhost:3000/operacion';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  sumar(num1:number, num2:number): Observable<OperacionResponse> {
    const body: OperacionRequest = { num1, num2 };
    return this.http.post<OperacionResponse>(`${this.apiUrl}/suma`, body, this.httpOptions)
    .pipe(
      timeout(5000) // Tiempo máximo de espera de 5 segundos
    );
  }

  restar(num1:number, num2:number): Observable<OperacionResponse> {
    const body: OperacionRequest = { num1, num2 };
    return this.http.post<OperacionResponse>(`${this.apiUrl}/resta`, body, this.httpOptions)
    .pipe(
      timeout(5000) // Tiempo máximo de espera de 5 segundos
    );
  }
}
