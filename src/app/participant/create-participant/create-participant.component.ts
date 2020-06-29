import { Component, OnInit } from '@angular/core';
import { VillesService } from 'src/app/services/villes.service';
import { ProfessionsService } from 'src/app/services/professions.service';
import { ParticipantsService } from 'src/app/services/participants.service';
import { NgForm } from '@angular/forms';
import { Participant } from 'src/app/shared/model/participant.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'create-participant',
  templateUrl: './create-participant.component.html',
  styleUrls: ['./create-participant.component.css']
})
export class CreateParticipantComponent implements OnInit {
  existUserName:true;
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
    private villesService:VillesService,
    private professionsService:ProfessionsService,
    private participantService:ParticipantsService,
    private authentification:AuthenticationService) { }

  ngOnInit(): void {
    this.loadAllParams();
  }

  loadAllParams(){
    this.professionsService.getAll().subscribe((professions:any)=>{
      this.professions=professions;
    })
    this.villesService.getAll().subscribe((villes:any)=>{
      this.villes=villes;})
    }

  userNameCheckUnique(value){
    if(value){
      this.authentification.checkifUserExists(value).subscribe((rep)=>{
        this.existUserName=rep;
      });
    }
  }



  onSubmit(){
    this.authentification.saveParticipant(this.participant).subscribe((rep)=>{
      Swal.fire({
        title:'Félicitations!',
        text:'Vous étés desormais Participant.',
        icon:'success',
        showCloseButton: false,
      }).then(()=>{
        this.router.navigate(['/login']);
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
