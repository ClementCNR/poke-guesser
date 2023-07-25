import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonData(): Observable<any> {
    return this.http.get('/assets/data.json');
  }
  createPokemon(pokemon: any): Observable<any> {
    return this.getPokemonData().pipe(
      map((pokemonData: any[]) => {
        const newPokemon = {
          number: pokemonData.length + 1,
          ...pokemon
        };
        pokemonData.push(newPokemon);
        return newPokemon;
      })
    );
  }




}
