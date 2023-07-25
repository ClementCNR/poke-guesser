import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import {ListComponent} from "./entities/entity-list/entity-list.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'pokedex', component: ListComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/game', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

