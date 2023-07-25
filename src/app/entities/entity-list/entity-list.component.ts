import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {MatDialog} from "@angular/material/dialog";
import {EntityDetailComponent} from "../entity-detail/entity-detail.component";



@Component({
  selector: 'app-pokemon-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class ListComponent implements OnInit {
  pokemons: any = [];

  constructor(private pokemonService: PokemonService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonData().subscribe(data => {
      this.pokemons = data;
    });
  }
  openPokemonDetails(pokemon: any): void {
    const dialogRef = this.dialog.open(EntityDetailComponent, {
      data: pokemon,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
