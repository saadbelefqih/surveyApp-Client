import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { NavbarComponent } from './layout/header/navbar/navbar.component';
import { SearchbarComponent } from './layout/header/searchbar/searchbar.component';
import { BannerComponent } from './layout/header/banner/banner.component';
import { TopbarComponent } from './layout/header/topbar/topbar.component';
import { PageTitleComponent } from './layout/header/page-title/page-title.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AnnoncesListComponent } from './annonces/annonces-list/annonces-list.component';
import { AnnoncesDetailsComponent } from './annonces/annonces-details/annonces-details.component';
import { HomeComponent } from './home/home.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { LoginComponent } from './login/login.component';
import { AuthHtppInterceptorServiceService } from './services/auth-htpp-interceptor-service.service';
import { DemandesListComponent } from './demandes/demandes-list/demandes-list.component';
import { QuestionnairesListComponent } from './questionnaires/questionnaires-list/questionnaires-list.component';
import { QuestionnaireComponent } from './questionnaires/questionnaire/questionnaire.component';
import { CreateParticipantComponent } from './participant/create-participant/create-participant.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SearchbarComponent,
    BannerComponent,
    TopbarComponent,
    PageTitleComponent,
    FooterComponent,
    AnnoncesListComponent,
    AnnoncesDetailsComponent,
    HomeComponent,
    NoPageFoundComponent,
    LoginComponent,
    DemandesListComponent,
    QuestionnairesListComponent,
    QuestionnaireComponent,
    CreateParticipantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    YouTubePlayerModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: AuthHtppInterceptorServiceService,  multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
