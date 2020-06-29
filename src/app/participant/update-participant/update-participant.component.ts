import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Participant } from 'src/app/shared/model/participant.model';
import { VillesService } from 'src/app/services/villes.service';
import { ProfessionsService } from 'src/app/services/professions.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-participant',
  templateUrl: './update-participant.component.html',
  styleUrls: ['./update-participant.component.css']
})
export class UpdateParticipantComponent implements OnInit {

existUserName:true;
userId:number;
villes:[];
professions:[];

participant:Participant={
  id:null,
  genre:true,
  nom:"",
  prenom:"",
  dateNaissance:null,
  hasImage:false,
  email:"",
  username:"",
  password:"",
  repassword:"",
  tel:"",
  adresse:"",
  ville:null,
  profession:null 
}
  constructor(
    private router:Router,
    private authenticationService:AuthenticationService,
    private villesService:VillesService,
    private professionsService:ProfessionsService) { }

  ngOnInit(): void {
    this.loadAllParams();
    this.getParticipant();
  }

  getParticipant(){
    this.userId=+this.authenticationService.isUserIdLoggedIn();
    if(this.userId!=null){
      this.authenticationService.getParticipantByID(this.userId).subscribe(prtcp=>{
        this.participant.id=prtcp.id;
        this.participant.genre=prtcp.genre;
        this.participant.nom=prtcp.nom;
        this.participant.prenom=prtcp.prenom;
        this.participant.dateNaissance=prtcp.dateNaissance;
        this.participant.email=prtcp.email;
        this.participant.tel=prtcp.tel;
        this.participant.adresse=prtcp.adresse;
        this.participant.username=prtcp.username;
        this.participant.ville=prtcp.ville.idVille;
        this.participant.profession=prtcp.profession.idProfession;
      })
    }
  }

  loadAllParams(){
    this.professionsService.getAll().subscribe((professions:any)=>{
      this.professions=professions;
    })
    this.villesService.getAll().subscribe((villes:any)=>{
      this.villes=villes;})
    }

    onSubmit(){
      console.log("updated",this.participant);
      this.authenticationService.updateParticipant(this.participant).subscribe((rep)=>{
        Swal.fire({
          title:'Vos données desormais a jour !',
          icon:'success',
          showCloseButton: false,
        }).then(()=>{
          this.router.navigate(['/profile']);
        })
      },(error)=>{
        Swal.fire({
        icon: 'error',
        title: "Oops...",
        text: "Ereur d'envoie,Merci de resseyer !",
        timer: 3000
        })
      }
      )
    }

}
