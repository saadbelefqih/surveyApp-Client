import { Component, OnInit, OnDestroy ,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantsService } from 'src/app/services/participants.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-demandes-list',
  templateUrl: './demandes-list.component.html',
  styleUrls: ['./demandes-list.component.css']
})
export class DemandesListComponent implements OnInit , OnDestroy{
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isDtInitialized:boolean = false;
 typeDemande:string;
public demandes:[]=[];

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private participantService:ParticipantsService,
    private authenticationService:AuthenticationService) { }

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
          this.typeDemande=params.typeDmd;
          this.getDemandes(this.typeDemande);
          
        }
      );
  }

  getDemandes(typeDemande?:string){
    let userId=Number(this.authenticationService.isUserIdLoggedIn());
    if(userId!=0){
      switch (typeDemande) {
        case "acceptedDmD":
          this.participantService.getDemandeValides(userId).subscribe(res=>{
            this.demandes=res;
            this.rerender();
          })
        break;
        case "pendingDmD":
          this.participantService.getDemandePendings(userId).subscribe(res=>{
            this.demandes=res;
            this.rerender();
          })
        break;
        case "rejectedDmD":
          this.participantService.getDemandeRefuses(userId).subscribe(res=>{
            this.demandes=res;
            this.rerender();
          })
        break;
        default:
          this.participantService.getDemandePendings(userId).subscribe(res=>{
            this.demandes=res;
            this.rerender();
          })
        }
    }
  }

  onRedirect(id){
    this.router.navigateByUrl("/annonces/"+btoa(id));
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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

}
