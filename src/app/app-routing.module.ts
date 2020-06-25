import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnoncesListComponent } from './annonces/annonces-list/annonces-list.component';
import { AnnoncesDetailsComponent } from './annonces/annonces-details/annonces-details.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DemandesListComponent } from './demandes/demandes-list/demandes-list.component';
import { QuestionnairesListComponent } from './questionnaires/questionnaires-list/questionnaires-list.component';
import { QuestionnaireComponent } from './questionnaires/questionnaire/questionnaire.component';
import { CreateParticipantComponent } from './participant/create-participant/create-participant.component';


const routes: Routes = [
  { path: "",
    redirectTo: '/home',
     pathMatch: 'full'
  },
  {
    path:"singup",
    component:CreateParticipantComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"annonces",
    component:AnnoncesListComponent
  },
  {
    path:"annonces/:id",
    component:AnnoncesDetailsComponent
  },
  {
    path:"demandes/:typeDmd",
    component:DemandesListComponent
  },
  {
    path:"questionnaires/:typeQuest",
    component:QuestionnairesListComponent
  },{
    path:"questionnaire",
    component:QuestionnaireComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"**",
    component:NoPageFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
