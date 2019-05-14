import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthorAddComponent } from './author-add/author-add.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { PublicationAddComponent } from './publication-add/publication-add.component';
import { PublicationListComponent } from './publication-list/publication-list.component';

/*Other imports*/
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthorAddComponent,
    AuthorListComponent,
    PublicationAddComponent,
    PublicationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	RouterModule.forRoot([
		  {
		    path: 'authors',
		    component: AuthorListComponent
		  },
		  {
		    path: 'authors/add',
		    component: AuthorAddComponent
		  },
		  {
		    path: 'authors/add/:id',
		    component: AuthorAddComponent
		  },
		  {
		    path: 'publications',
		    component:PublicationListComponent
		  },
		  {
		    path: 'publications/add',
		    component: PublicationAddComponent
		  },
		  {
		    path: 'publications/add/:id',
		    component: PublicationAddComponent
		  }    
		]),
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
