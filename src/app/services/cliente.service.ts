import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  entidade = "clientes"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.urlBase}${environment.appClientId}/${this.entidade}.json`);
  }

  get(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.urlBase}${environment.appClientId}/${this.entidade}/${id}.json`);
  }

  post(cliente: Cliente): Observable<string> {
    return this.http.post<string>(`${environment.urlBase}${environment.appClientId}/${this.entidade}.json`, cliente);
  }

  put(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.urlBase}${environment.appClientId}/${this.entidade}/${id}.json`, cliente)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<Cliente>(`${environment.urlBase}${environment.appClientId}/${this.entidade}/${id}.json`)
  }
}
