import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host:string='http://localhost:4949';


  constructor(private http:HttpClient) { }

  public login(username:string,password:string){
    return this.http.post<any>(this.host+"/login",{username,password})
  }

  getUserId(username:String){
    return this.http.post<any>(this.host+"/getUserId",{"username":username});
  }

  
  getParticipantByID(idParicipant:number){
    return this.http.get<any>(this.host+"/getParticipant/"+idParicipant);}

  saveToken(token,username){
    console.log(token);
    sessionStorage.setItem('token',token.token);
    sessionStorage.setItem('username',username);

  }

  saveUser(userid){
    sessionStorage.setItem('userid',userid);
  }

  isUserNameLoggedIn() {
    if(sessionStorage.getItem('username') && sessionStorage.getItem('token') && sessionStorage.getItem('userid') )
    {return sessionStorage.getItem('username');}
    else{return null;}
  }

  isUserIdLoggedIn() {
    if(sessionStorage.getItem('username') && sessionStorage.getItem('token') && sessionStorage.getItem('userid') )
    {return sessionStorage.getItem('userid');}
    else{return null;}
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('token');}


  checkifUserExists(username:string){
      return this.http.get<any>(this.host+"/checkExistUserName/"+username);}

  saveParticipant(participant){
    return this.http.post<any>(this.host+"/singUp/Participant",participant);}

  updateParticipant(participant){
      return this.http.put<any>(this.host+"/updateParticipant",participant);}

  loadPhotoParticipant(idParicipant:number,photo:File): Observable<HttpEvent<any>>{
      const formData: FormData = new FormData();
      formData.append('photo', photo);
      const req = new HttpRequest('POST', this.host+"/uploadPhoto/"+idParicipant, formData, {
        reportProgress: true,
        responseType: 'json'
      });
      return this.http.request(req);
  }

  getPhotoParticipant(idParticipant:number): Observable<HttpEvent<Blob>>{
    return this.http.get<any>(this.host+"/getPhoto/"+idParticipant);}
  
}
