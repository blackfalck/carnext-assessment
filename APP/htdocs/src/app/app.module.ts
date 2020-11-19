import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormioModule} from 'angular-formio';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {AuthInterceptor} from './lib/interceptors/auth/auth.interceptor';
import {UnauthorizedInterceptor} from './lib/interceptors/unauthorized/Unauthorized.interceptor';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {FilterCompletedPipe} from "./pipes/filter-filers/filter-completed.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SpinnerComponent,
    FilterCompletedPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormioModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    NgxDropzoneModule,
    NgxGalleryModule,
    FontAwesomeModule,
  ],
  providers:
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
      {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
    ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
