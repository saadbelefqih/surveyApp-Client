import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Search } from '../shared/model/search.model';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {
  private url:string='http://localhost:4949/api/annonces';
  constructor(private http:HttpClient) { }
  getAll(page:Number,search:Search){
    return this.http.get(this.url+"?page="+page+"&size=6&words="+search.words+"&datedebut="+search.datedebut+"&datefin="+search.datefin);
  }

  getOneByID(id:Number){
    return this.http.get(this.url+"/getOne/"+id);
  }

}
