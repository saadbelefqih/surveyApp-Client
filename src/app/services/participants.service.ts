import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { demande } from '../shared/model/demande.model';
import { Reponse } from '../shared/model/reponse.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private url:string='http://localhost:4949/api/participants';
  constructor(private http:HttpClient,private authenticationService:AuthenticationService) { }

getParticipant(username:string){
  return this.http.get<any>(this.url+"/getParticipant/"+username);}

postDemandeParticipation(idannonce:Number,userId:Number){
  return this.http.post<any>(this.url+"/demandeParticipation",{"idParticipant":userId,"idAnnonce":idannonce})}

getDemandePendings(userId:Number){
  return this.http.get<any>(this.url+"/getDemandes/pendings/"+userId);}

getDemandeRefuses(userId:Number){
  return this.http.get<any>(this.url+"/getDemandes/refuses/"+userId);}
  
getDemandeValides(userId:Number){
  return this.http.get<any>(this.url+"/getDemandes/valides/"+userId);}

getQuestionnairesToAnswer(userId:Number){
  return this.http.get<any>(this.url+"/getQuestionnaires/toAnswer/"+userId);}

getQuestionnairesAll(userId:Number){
  return this.http.get<any>(this.url+"/getQuestionnaires/"+userId);}

saveAnswer(userId:Number,reponse:Reponse){
    return this.http.post<any>(this.url+"/getQuestionnaires/saveAnswer/"+userId,reponse);}



}
