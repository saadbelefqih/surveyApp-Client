import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnoncesListComponent } from './annonces/annonces-list/annonces-list.component';
import { AnnoncesDetailsComponent } from './annonces/annonces-details/annonces-details.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { LoginComponent } from './login/login.component';
import { DemandesListComponent } from './demandes/demandes-list/demandes-list.component';
import { QuestionnairesListComponent } from './questionnaires/questionnaires-list/questionnaires-list.component';
import { QuestionnaireComponent } from './questionnaires/questionnaire/questionnaire.component';
import { CreateParticipantComponent } from './participant/create-participant/create-participant.component';
import { ForgetPasswordComponent } from './participant/forget-password/forget-password.component';
import { ViewParticipantComponent } from './participant/view-participant/view-participant.component';
import { UpdateParticipantComponent } from './participant/update-participant/update-participant.component';


const routes: Routes = [
  { path: "",
    redirectTo: '/annonces',
     pathMatch: 'full'
  },
  {
    path:"singup",
    component:CreateParticipantComponent
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
    path:"profile",
    component:ViewParticipantComponent
  },
  {
    path:"profile/update",
    component:UpdateParticipantComponent
  },
  {
    path:"forgetPassword",
    component:ForgetPasswordComponent
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
