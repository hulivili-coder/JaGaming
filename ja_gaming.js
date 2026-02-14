// 🎮 JA GAMING Launcher 🎮
// Renamed from fun_game_fixed.js to a clearer name.

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

class GameLauncher {
  constructor() {
    this.totalScore = 0;
    this.gamesPlayed = 0;
  }

  showMainMenu() {
    console.clear();
    console.log('\n╔' + '═'.repeat(58) + '╗');
    console.log('║' + ' '.repeat(15) + '🎮 ULTIMATE GAME LAUNCHER 🎮' + ' '.repeat(15) + '║');
    console.log('╠' + '═'.repeat(58) + '╣');
    console.log('║  1. 🎯 Number Guessing Game                                  ║');
    console.log('║  2. 🪨 Rock Paper Scissors                                   ║');
    console.log('║  3. 🎲 Higher or Lower                                       ║');
    console.log('║  4. 🧩 Word Guessing Game                                    ║');
    console.log('║  5. 📊 View Stats                                            ║');
    console.log('║  6. 🚪 Exit                                                  ║');
    console.log('╚' + '═'.repeat(58) + '╝\n');
  }

  updateScore(points) {
    this.totalScore += points;
    this.gamesPlayed++;
  }

  showStats() {
    console.log('\n📊 YOUR GAME STATISTICS 📊');
    console.log('═'.repeat(50));
    console.log(`Total Games Played: ${this.gamesPlayed}`);
    console.log(`Total Score: ${this.totalScore}`);
    if (this.gamesPlayed > 0) {
      console.log(`Average Score: ${(this.totalScore / this.gamesPlayed).toFixed(1)}`);
    }
    console.log('═'.repeat(50) + '\n');
    this.promptToContinue(() => this.start());
  }

  promptToContinue(callback) {
    rl.question('Press Enter to continue...', () => callback());
  }

  numberGuessingGame() {
    const secret = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    const maxAttempts = 10;

    console.log('\n🎯 NUMBER GUESSING GAME 🎯');
    console.log('═'.repeat(50));
    console.log('Guess a number between 1 and 100!');
    console.log(`You have ${maxAttempts} attempts.\n`);

    const playRound = () => {
      if (attempts >= maxAttempts) {
        console.log(`💀 Game Over! The number was ${secret}`);
        this.promptToContinue(() => this.start());
        return;
      }

      rl.question('Your guess: ', (input) => {
        const guess = parseInt(input, 10);
        if (isNaN(guess) || guess < 1 || guess > 100) {
          console.log('❌ Enter a valid number!');
          playRound();
          return;
        }

        attempts++;
        const diff = Math.abs(guess - secret);
        if (guess === secret) {
          const score = Math.max(0, 1000 - attempts * 50);
          console.log(`\n🎉 YOU WON! 🎉 (${attempts} attempts)`);
          console.log(`⭐ Score: ${score}`);
          this.updateScore(score);
          this.promptToContinue(() => this.start());
        } else {
          if (diff <= 5) console.log('🔥 BOILING HOT!');
          else if (diff <= 15) console.log('🌡️  HOT!');
          else if (diff <= 30) console.log('🟡 WARM');
          else if (diff <= 50) console.log('🟦 COOL');
          else console.log('❄️  FREEZING!');
          console.log(guess < secret ? '📈 TOO LOW' : '📉 TOO HIGH');
          console.log(`Attempts left: ${maxAttempts - attempts}\n`);
          playRound();
        }
      });
    };

    playRound();
  }

  rockPaperScissors() {
    console.log('\n🪨 ROCK PAPER SCISSORS 🪨');
    console.log('═'.repeat(50));
    console.log('(1) Rock  (2) Paper  (3) Scissors\n');

    rl.question('Your choice: ', (input) => {
      const choices = ['Rock', 'Paper', 'Scissors'];
      const userIdx = parseInt(input, 10) - 1;
      if (isNaN(userIdx) || userIdx < 0 || userIdx > 2) { console.log('❌ Invalid choice!'); this.rockPaperScissors(); return; }
      const computerIdx = Math.floor(Math.random() * 3);
      const user = choices[userIdx], computer = choices[computerIdx];
      console.log(`\nYou: ${user} | Computer: ${computer}`);
      let score = 0;
      if (userIdx === computerIdx) console.log('🤝 TIE!');
      else if ((userIdx === 0 && computerIdx === 2) || (userIdx === 1 && computerIdx === 0) || (userIdx === 2 && computerIdx === 1)) { console.log('🎉 YOU WIN!'); score = 500; }
      else console.log('💀 YOU LOSE!');
      console.log(`⭐ Score: ${score}\n`);
      this.updateScore(score);
      this.promptToContinue(() => this.start());
    });
  }

  higherOrLower() {
    let current = Math.floor(Math.random() * 100) + 1;
    let streak = 0;
    console.log('\n⬆️⬇️  HIGHER OR LOWER ⬆️⬇️');
    console.log('═'.repeat(50));
    console.log('Predict if the next number is higher or lower!\n');

    const playRound = () => {
      console.log(`Current number: ${current}`);
      rl.question('Is next higher? (y/n): ', (input) => {
        const guessHigher = input.toLowerCase() === 'y';
        const oldNum = current;
        const next = Math.floor(Math.random() * 100) + 1;
        const isHigher = next > oldNum;
        const correct = guessHigher === isHigher;
        current = next;
        if (correct) { streak++; console.log(`✅ Correct! (${current}) Streak: ${streak}\n`); playRound(); }
        else { console.log(`❌ Wrong! (${current}) Game Over!`); const score = Math.max(0, streak * 250); console.log(`⭐ Score: ${score}\n`); this.updateScore(score); this.promptToContinue(() => this.start()); }
      });
    };

    playRound();
  }

  wordGuessingGame() {
    const words = ['JAVASCRIPT','PROGRAMMING','DEVELOPER','COMPUTER','KEYBOARD','MONITOR','ALGORITHM','DATABASE','INTERNET','FUNCTION'];
    const word = words[Math.floor(Math.random() * words.length)];
    const guessed = new Set(); let wrongGuesses = 0; const maxWrong = 6;
    console.log('\n🧩 WORD GUESSING GAME 🧩');
    console.log('═'.repeat(50));
    console.log('Guess letters to reveal the word!\n');

    const display = () => { const disp = word.split('').map(l => guessed.has(l) ? l : '_').join(' '); console.log(`Word: ${disp}`); console.log(`Wrong guesses: ${wrongGuesses}/${maxWrong}`); console.log(`Guessed: ${[...guessed].join(', ') || 'None'}\n`); };

    const playRound = () => {
      display();
      if (wrongGuesses >= maxWrong) { console.log(`💀 Game Over! Word was: ${word}`); this.promptToContinue(() => this.start()); return; }
      if ([...word].every(l => guessed.has(l))) { const score = Math.max(0, 1000 - (wrongGuesses * 100)); console.log(`🎉 YOU WON! 🎉\n⭐ Score: ${score}`); this.updateScore(score); this.promptToContinue(() => this.start()); return; }

      rl.question('Guess a letter: ', (input) => {
        const letter = (input || '').toUpperCase();
        if (!letter.match(/^[A-Z]$/)) { console.log('❌ Enter a valid letter!\n'); playRound(); return; }
        if (guessed.has(letter)) { console.log('Already guessed!\n'); playRound(); return; }
        guessed.add(letter);
        if (!word.includes(letter)) { wrongGuesses++; console.log('❌ Wrong!\n'); } else { console.log('✅ Correct!\n'); }
        playRound();
      });
    };

    playRound();
  }

  start() {
    this.showMainMenu();
    rl.question('Choose a game: ', (choice) => {
      switch (choice.trim()) {
        case '1': this.numberGuessingGame(); break;
        case '2': this.rockPaperScissors(); break;
        case '3': this.higherOrLower(); break;
        case '4': this.wordGuessingGame(); break;
        case '5': this.showStats(); break;
        case '6': console.log('\n👋 Thanks for playing! Final Score: ' + this.totalScore + '\n'); rl.close(); process.exit(0); break;
        default: console.log('❌ Invalid choice!'); this.start();
      }
    });
  }
}

// Launch the game
const launcher = new GameLauncher();
launcher.start();
