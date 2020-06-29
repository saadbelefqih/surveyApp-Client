import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ParticipantsService } from 'src/app/services/participants.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'annonces-details',
  templateUrl: './annonces-details.component.html',
  styleUrls: ['./annonces-details.component.css']
})
export class AnnoncesDetailsComponent implements OnInit {
  idAnnonce:Number=null;
  annonce:any;
  url;
  baseUrl:string = 'https://www.youtube.com/embed/';
  constructor(private annoncesService:AnnoncesService,
    private PartcipantService:ParticipantsService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private authenticationService:AuthenticationService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getParamId();
    this.getOneAnnonce(this.idAnnonce);
    
  }

  getOneAnnonce(id:Number){
    this.annoncesService.getOneByID(this.idAnnonce).subscribe((annonce:any)=>{
      this.annonce=annonce;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.annonce.urlVideoAnnonce);
    })
  }

  getParamId(){
    this.idAnnonce=parseInt(atob(this.activatedRoute.snapshot.params.id));
  }

  onPost(){
    let userId=this.authenticationService.isUserIdLoggedIn();
    if(userId!=null){
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "vous étes sur que vous voulez postuler votre demande !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, je confirme!'
      }).then((result) => {
        if (result.value && this.idAnnonce && userId) {
          
          this.PartcipantService.postDemandeParticipation(this.idAnnonce,Number(userId)).subscribe(res=>{
            Swal.fire({
              title:'Confirmation!',
              text:'Votre demande a été envoyé.',
              icon:'success',
              showCloseButton: false,
            })
          },(error)=>{
            Swal.fire({
            icon: 'error',
            title: "Oops...",
            text: 'Vous avez déja postuler pour cette annonce, Merci de verifier!',
            timer: 3000
            })
          }
          
          )
          
        }
      })
    }
    else{
      this.router.navigateByUrl("/login");}
  }



}
