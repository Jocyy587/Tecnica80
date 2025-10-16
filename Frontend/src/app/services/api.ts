// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private readonly API_URL = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }


  obtenerUsuarios(): Observable<any> {
    const url = `${this.API_URL}/usuarios`;
    console.log('Haciendo petición a:', url);
    return this.http.get(url);
  }
}