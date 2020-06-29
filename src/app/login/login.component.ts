import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataSharingServiceService } from '../services/data-sharing-service.service';
import { ParticipantsService } from '../services/participants.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,
              private router:Router,
              private dataSharingService: DataSharingServiceService) { }

  ngOnInit(): void {
    
  }

  onLogin(loginform){
    this.authenticationService.login(loginform.username,loginform.password).subscribe(res=>{ 
      this.authenticationService.saveToken(res,loginform.username);
      this.authenticationService.getUserId(loginform.username).subscribe(res=>{
          this.authenticationService.saveUser(res);
          Swal.fire({
            position: "bottom-left",
            icon: 'success',
            title: "Bonjour "+loginform.username,
            showConfirmButton: false,
            timer: 2500
          }).then(()=>{
            this.dataSharingService.isUserLoggedIn.next(true);
          this.router.navigate(['/']);
          })
          },error=>{
            this.authenticationService.logOut();
            Swal.fire({
            position: "bottom-left",
            icon: 'error',
            title: "Erreur !!! invalid User ",
            showConfirmButton: false,
            timer: 2500
            })
          })

      },error=>{
        this.authenticationService.logOut();
        Swal.fire({
        position: "bottom-left",
        icon: 'error',
        title: "Erreur !!! invalid Authentification ",
        showConfirmButton: false,
        timer: 2500
        })
      })

    }
  
}
