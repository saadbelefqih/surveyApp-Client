import { Component, OnInit } from '@angular/core';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { Router } from '@angular/router';
import { Search } from 'src/app/shared/model/search.model';

@Component({
  selector: 'annonces-list',
  templateUrl: './annonces-list.component.html',
  styleUrls: ['./annonces-list.component.css']
})
export class AnnoncesListComponent implements OnInit {
  annoncesList : []=[];
  search:Search={
    words: "",
    datedebut:"",
    datefin:""
  };
  currentPage:Number=0;
  pages:Array<Number>;

  constructor(private annoncesService:AnnoncesService,
    private router:Router) { }

  ngOnInit(): void {
    this.search={
      words: "",
      datedebut:"",
      datefin:""
    };
    this.getAnnonces();
  }
  getAnnonces(page:Number=0){
    this.annoncesService.getAll(page,this.search).subscribe((annonce:any)=>{
      this.currentPage=page;
      this.pages=new Array<Number>(annonce.totalPages);
      this.annoncesList=annonce.content;
      this.sortBy("dateDebutPublication");
    })
  }

  sortBy(value?:string)
  {
    switch (value) {
      case "dateDebutPublication": 
        this.annoncesList=this.annoncesList.sort((a: any, b: any) =>
          new Date(b.dateDebutPublication).getTime() - new Date(a.dateDebutPublication).getTime());
        break;
      case "dateFinPublication":
        this.annoncesList=this.annoncesList.sort((a: any, b: any) =>
          new Date(a.dateFinPublication).getTime() - new Date(b.dateFinPublication).getTime());
        break;
      case "dateDebutRecherche":
        this.annoncesList=this.annoncesList.sort((a: any, b: any) =>
          new Date(b.dateDebutTravail).getTime() - new Date(a.dateDebutTravail).getTime());
        break;
      case "dateFinRecherche":
        this.annoncesList=this.annoncesList.sort((a: any, b: any) =>
          new Date(a.dateFinTravail).getTime() - new Date(b.dateFinTravail).getTime());
        break;
      default:
        this.annoncesList=this.annoncesList.sort((a: any, b: any) =>
          new Date(b.dateDebutPublication).getTime() - new Date(a.dateDebutPublication).getTime());
  }

  }

  onRedirect(id){
    this.router.navigateByUrl("/annonces/"+btoa(id));
  }

}
