import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ParticipantsService } from 'src/app/services/participants.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-participant',
  templateUrl: './view-participant.component.html',
  styleUrls: ['./view-participant.component.css']
})
export class ViewParticipantComponent implements OnInit {
age: number;
timeStamp:number;
activeImport:boolean=false;
participant:any;
selectedPhoto:any;
userId:number;
progressLoading:number=0;
  constructor(private authenticationService:AuthenticationService,private participantService:ParticipantsService) { }

  ngOnInit(): void {
    this.getParticipant();
  }
  getParticipant(){
    this.userId=+this.authenticationService.isUserIdLoggedIn();
    if(this.userId!=null){
      this.authenticationService.getParticipantByID(this.userId).subscribe(prtcp=>{
        this.participant=prtcp;
        //calcule Age
        let timeDiff = Math.abs(Date.now() - new Date(prtcp?.dateNaissance).getTime());
        this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      })
    }
  }
  activerBtnLoad(){
    this.activeImport=true;
  }

  onSelectImage(event){
   let photos= event.target.files;
   this.selectedPhoto=photos.item(0);
  }

  uploadPhoto(){
    this.progressLoading = 0;

    this.authenticationService.loadPhotoParticipant(this.userId,this.selectedPhoto).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressLoading = Math.round(100 * event.loaded / event.total);
          console.log("loading",this.progressLoading);
        } else if (event instanceof HttpResponse) {
          Swal.fire({
            title:"Photo a été bien importée",
            icon:'success',
            showCloseButton: false,
              }).then(()=>{this.getTimeStamp()})
        }
      },
      err => {
        Swal.fire({
          title:"La taille de l'image doit être < 1M",
          icon:'error',
          showCloseButton: false,
            })
        this.progressLoading = 0;
        this.selectedPhoto = undefined;
        this.activeImport=false;
        
      });
    this.progressLoading = 0;
    this.selectedPhoto = undefined;
    this.activeImport=false;
  }

  getTimeStamp(){
    this.timeStamp=(new Date()).getTime();
  }



}
