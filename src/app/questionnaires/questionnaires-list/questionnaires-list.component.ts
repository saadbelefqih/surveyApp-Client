import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantsService } from 'src/app/services/participants.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTransferServiceService } from 'src/app/services/data-transfer-service.service';

@Component({
  selector: 'app-questionnaires-list',
  templateUrl: './questionnaires-list.component.html',
  styleUrls: ['./questionnaires-list.component.css']
})
export class QuestionnairesListComponent implements OnInit , OnDestroy{
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isDtInitialized:boolean = false;
  typeQuestionnaire:string="";
  questionnaires:[]=[];
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private participantService:ParticipantsService,
    private dataTransferService:DataTransferServiceService,
    private authenticationService:AuthenticationService) {
  }

  ngOnInit(): void {
    this.getParamId();
    this.dtTrigger.next();
    this.datatableFR();
  }

  datatableFR(){
    this.dtOptions = {
      
      language: {
        processing:     "Traitement en cours...",
        search:         "Rechercher&nbsp;:",
        lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
        info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        infoPostFix:    "",
        loadingRecords: "Chargement en cours...",
        zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
        emptyTable:     "Aucune donnée disponible dans le tableau",
        paginate: {
            first:      "Premier",
            previous:   "Pr&eacute;c&eacute;dent",
            next:       "Suivant",
            last:       "Dernier"
        },
        aria: {
            sortAscending:  ": activer pour trier la colonne par ordre croissant",
            sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }
    },
      pagingType: 'full_numbers',
      pageLength: 8,
      processing: true,
      dom: 'Bfrtip'
    }
  }

  getParamId(){
    this.activatedRoute.params.subscribe(
      params => {
        this.typeQuestionnaire=params.typeQuest;
        this.getQuestionnaires(this.typeQuestionnaire);
        
      }
    );
  }

  getQuestionnaires(typeDemande?:string){
    let userId=Number(this.authenticationService.isUserIdLoggedIn());
    if(userId!=0){
      switch (typeDemande) {
        case "EnAttente":
          this.participantService.getQuestionnairesToAnswer(userId).subscribe(res=>{
            this.questionnaires=res;
            console.log(this.questionnaires);
            this.rerender();
          })
        break;
        case "Repondus":
          this.participantService.getQuestionnairesAll(userId).subscribe(res=>{
            this.questionnaires=res;
            console.log(this.questionnaires);
            this.rerender();
          })
        break;
        default:
          this.participantService.getQuestionnairesToAnswer(userId).subscribe(res=>{
            this.questionnaires=res;
            console.log(this.questionnaires);
            this.rerender();
          })
        }
    }
  }
  onRedirectQuestionnaire(ligneQuest){
    if(ligneQuest){
      this.dataTransferService.data=ligneQuest;
      this.router.navigateByUrl("/questionnaire");
    }
  }

  onRedirectAnnonce(id){
    this.router.navigateByUrl("/annonces/"+btoa(id));
  }



  rerender(): void {
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true
      this.dtTrigger.next();
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
