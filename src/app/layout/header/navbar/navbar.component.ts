import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataSharingServiceService } from 'src/app/services/data-sharing-service.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn:Boolean=false;
  constructor(
    private authentocationService: AuthenticationService,
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
    }
    else{this.isUserLoggedIn= false;}
  }

}
