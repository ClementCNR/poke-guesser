import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GameComponent} from "./game/game.component";
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListComponent} from "./entities/entity-list/entity-list.component";
import {EntityDetailComponent} from "./entities/entity-detail/entity-detail.component";
import {MatDialogModule} from "@angular/material/dialog";
import {AdminComponent} from "./admin/admin.component";


@NgModule({
  declarations: [

    AppComponent,
    GameComponent,
    ListComponent,
    EntityDetailComponent,
    AdminComponent

  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, MatDialogModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
