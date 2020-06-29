import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataSharingServiceService } from 'src/app/services/data-sharing-service.service';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isUserLoggedIn:Boolean=false;
  currentUser:String="";
  constructor(private authentocationService: AuthenticationService,
              private router:Router,
              private dataSharingService: DataSharingServiceService) {
                this.dataSharingService.isUserLoggedIn.subscribe( value => {
                  this.isUserLoggedIn = value;
                  this.checkifUserIsConnected();
              });
               }

  ngOnInit(): void {
  }
  checkifUserIsConnected(){
    let user:any =this.authentocationService.isUserNameLoggedIn();
    if(user){
      this.isUserLoggedIn=true;
      this.currentUser=user;
    }
    else{this.isUserLoggedIn= false;}
  }

  onLogout(){
    this.authentocationService.logOut();
    this.isUserLoggedIn=false;
    this.dataSharingService.isUserLoggedIn.next(true);
    Swal.fire({
      position: "bottom-left",
      icon: 'info',
      title: "Au revoir ",
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
  });
  }

}
