import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataTransferServiceService } from 'src/app/services/data-transfer-service.service';
import { Reponse } from 'src/app/shared/model/reponse.model';
import { ReponseDetails } from 'src/app/shared/model/reponseDetails.model';
import { ParticipantsService } from 'src/app/services/participants.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  ligneQuest: any;
  isFinish=false;
  currentQuestionPosition:number=0;
  questions:any[]=[];
  currentQuestion:any;
  reponse:Reponse= new Reponse();
  // option 
  option1:boolean=false;
  option2:boolean=false;
  option3:boolean=false;
  option4:boolean=false;
  constructor(
    private router:Router,
    private dataTrasferService:DataTransferServiceService,
    private participantService:ParticipantsService,
    private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.ligneQuest=this.dataTrasferService.data;
    this.questions=this.ligneQuest?.ligneQuestionnaire?.questionnaire?.questions;
    this.reponse.idReponse=this.ligneQuest?.idReponse;
    this.reponse.reponsesDetails=[];
    this.onGetNextQuestion(0);
  }

  onGetNextQuestion(position:number=0){
    this.currentQuestion=this.questions[position];
      this.currentQuestionPosition=position;
      
        if(position!=0){
        let repDetail=new ReponseDetails();
          repDetail.question=this.questions[position-1].idQuestion;;
          repDetail.isOption1=this.option1;
          repDetail.isOption2=this.option2;
          repDetail.isOption3=this.option3;
          repDetail.isOption4=this.option4;
          this.reponse.addReponse(repDetail);}
          if(position<this.questions.length){
            let hasrep=this.setQuestionByResponse(this.currentQuestion.idQuestion);
          if(!hasrep){
          this.option1=false;
          this.option2=false;
          this.option3=false;
          this.option4=false;}
          }
          else{
          this.isFinish=true;}
  }

  onSaveAswer(){
    let userId:number=+this.authenticationService.isUserIdLoggedIn();
    this.participantService.saveAnswer(userId,this.reponse).subscribe((rep)=>{
      if(rep==true){
        Swal.fire({
          title:'Confirmation!',
          text:'Votre réponse a été envoyé.',
          icon:'success',
          showCloseButton: false,
        }).then(()=>{
          this.router.navigate(['/questionnaire', 'Repondus']);
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: "Oops...",
          text: "Ereur d'envoie,Merci de resseyer !",
          timer: 3000
          })
      }
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

  onGetPrecedentQuestion(){
    if(this.currentQuestionPosition>=1){
      this.currentQuestion=this.questions[this.currentQuestionPosition-1];
      this.currentQuestionPosition=this.currentQuestionPosition-1;
      this.setQuestionByResponse(this.currentQuestion.idQuestion)
      this.isFinish=false;
    }
  }

  setQuestionByResponse(idQuestion:number):boolean{
    let repDetail:ReponseDetails=this.reponse.getReponseDetails(idQuestion);
      if(repDetail){
        this.option1=repDetail.isOption1;
        this.option2=repDetail.isOption2;
        this.option3=repDetail.isOption3;
        this.option4=repDetail.isOption4;
        return true
      }
      return false;
  }

}
