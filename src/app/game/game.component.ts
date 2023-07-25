import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

interface SubmittedPokemon {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  pokemonData: any[] = [];
  selectedPokemon: any = null;
  guesses: string[] = Array(6).fill('');
  currentGuessIndex: number = 0;
  pokemonToGuess: any = null;
  gameEnded: boolean = false;
  submittedPokemon: SubmittedPokemon[] = [];
  isGameWon: boolean = false;
  showPokemonImage: boolean = false;

  @ViewChild('guessInput') guessInput!: ElementRef<HTMLInputElement>;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonData().subscribe(data => {
      this.pokemonData = data;
      this.pokemonToGuess = data[Math.floor(Math.random() * data.length)];
      console.log(this.pokemonToGuess.name)
    });
  }

  selectPokemon(pokemon: any): void {
    const guess = pokemon.name;
    this.updateGuess(this.currentGuessIndex, guess);

    this.selectedPokemon = pokemon;
    if (this.guessInput) {
      const nextInput = document.getElementById('guessInput' + this.currentGuessIndex);
      if (nextInput) {
        nextInput.focus();
      }
    }

  }


  updateGuess(index: number, guess: string): void {
    if (index === this.currentGuessIndex) {
      this.guesses[index] = guess;
    }
  }

  submitGuess(index: number, guess: string): void {
    if (index === this.currentGuessIndex && guess !== '') {
      const normalizedGuess = guess.toLowerCase();
      const correctName = this.pokemonToGuess.name.toLowerCase();

      if (normalizedGuess === correctName) {
        this.isGameWon = true;
        this.showPokemonImage = true;
        this.gameEnded = true
        return;
      }
      const isValidPokemon = this.pokemonData.some(pokemon => pokemon.name.toLowerCase() === normalizedGuess);
      if (!isValidPokemon) {
        alert('Please enter a valid Pokemon name');
        return;
      }

      const submittedPokemonStats = this.pokemonData.find(pokemon => pokemon.name.toLowerCase() === normalizedGuess);

      this.submittedPokemon.push({
        name: submittedPokemonStats.name,
        hp: submittedPokemonStats.hp,
        attack: submittedPokemonStats.attack,
        defense: submittedPokemonStats.defense,
        speed: submittedPokemonStats.speed
      });

      this.guesses[index] = 'Submitted';

      if (this.currentGuessIndex < this.guesses.length - 1) {
        this.currentGuessIndex++;
      } else {
        this.showPokemonImage = true;
        this.gameEnded = true;

      }
    }
  }

  restartGame(): void {
    this.guesses = Array( 6).fill('');
    this.currentGuessIndex = 0;
    this.pokemonToGuess = this.pokemonData[Math.floor(Math.random() * this.pokemonData.length)];
    this.gameEnded = false;
    this.submittedPokemon = [];
    this.isGameWon = false;
    this.showPokemonImage = false;
  }
}
