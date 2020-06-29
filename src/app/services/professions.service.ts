import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessionsService {
  private url:string='http://localhost:4949/api/professions';
  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get(this.url);
  }
}
