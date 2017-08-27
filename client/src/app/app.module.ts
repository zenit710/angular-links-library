import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/app.component';
import { LinkComponent } from './components/linkForm.component';
import { LinkCollectionComponent } from './components/linkCollection.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkComponent,
    LinkCollectionComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [LinkCollectionComponent ]
})
export class AppModule { }
