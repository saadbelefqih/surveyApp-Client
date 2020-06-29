import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ParticipantsService } from 'src/app/services/participants.service';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private router:Router,
    private participantService:ParticipantsService) { }

  ngOnInit(): void {
  }

  onRessetPassword(loginform){
    
    let username=loginform.username;
    let email=loginform.email;
    console.log("loginform.username,",username);
    console.log("loginform.email,",email);
    this.participantService.ressetPassword(username,email).subscribe(res=>{
      if(res.password!=null){
        Swal.fire({
          title:"Votre nouveau mot de passe '"+res.password+"'",
          icon:'success',
          showCloseButton: false,
            }).then(()=>{
          this.router.navigate(['/login']);})
      }
      else{
          Swal.fire({
          icon: 'error',
          title: "Donneés fourneés incorrectes",
          showConfirmButton: false,
          timer: 2500
          })
      }
      
      },error=>{
            Swal.fire({
            icon: 'error',
            title: "Donneés fourneés incorrectes",
            showConfirmButton: false,
            timer: 2500
            })
          })
    }

}
