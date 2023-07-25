import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonService } from "../services/pokemon.service";

@Component({
  selector: 'app-pokemon-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  pokemons: any = [];
  pokemonForm: FormGroup;
  selectedPokemon: any;

  constructor(
    private pokemonService: PokemonService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.pokemonForm = this.formBuilder.group({
      name: ['', Validators.required],
      hp: ['', Validators.required],
      attack: ['', Validators.required],
      defense: ['', Validators.required],
      speed: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern(/\.(jpeg|jpg|gif|png)$/i)]]
    });
  }

  ngOnInit(): void {
    this.pokemonService.getPokemonData().subscribe(data => {
      this.pokemons = data;
    });
  }

  createPokemon(): void {
    if (this.pokemonForm.valid) {
      const newPokemon = {
        name: this.pokemonForm.value.name,
        hp: this.pokemonForm.value.hp,
        attack: this.pokemonForm.value.attack,
        defense: this.pokemonForm.value.defense,
        speed: this.pokemonForm.value.speed,
        imageUrl: this.pokemonForm.value.imageUrl
      };

      this.pokemonService.createPokemon(newPokemon).subscribe(
        (createdPokemon) => {
          this.pokemons.push(createdPokemon);
          this.pokemonForm.reset();
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error creating Pokémon:', error);
        }
      );
    }
  }
  isExternalImage(imageUrl: string): boolean {
    const externalUrlPattern = /^https?:\/\//i;
    return externalUrlPattern.test(imageUrl);
  }
  deletePokemon(pokemon: any): void {
    const index = this.pokemons.indexOf(pokemon);
    if (index !== -1) {
      this.pokemons.splice(index, 1);
    }
  }
  selectPokemon(pokemon: any): void {
    this.selectedPokemon = pokemon;
    this.pokemonForm.patchValue({
      name: pokemon.name,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      imageUrl: pokemon.imageUrl
    });
  }

  updatePokemon(): void {
  }

  cancelUpdate(): void {
    this.selectedPokemon = null;
    this.pokemonForm.reset();
  }
  duplicatePokemon(pokemon: any): void {
    const duplicatedPokemon = { ...pokemon };
    this.pokemons.push(duplicatedPokemon);
  }

}
