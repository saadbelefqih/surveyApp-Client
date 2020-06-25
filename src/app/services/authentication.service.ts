import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

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
}
