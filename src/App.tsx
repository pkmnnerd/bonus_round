import { useCallback, useEffect, useState } from 'react';
import './index.css';

// --- DATA ---
const INITIAL_PHRASES = [
  // --- EASY (Heavy on R, S, T, L, N, E) ---
  { phrase: "BETTER LATE THAN NEVER", category: "PHRASE", difficulty: "EASY" },
  { phrase: "MOUNTAIN RETREAT", category: "PLACE", difficulty: "EASY" },
  { phrase: "TALENTED ARTIST", category: "PERSON", difficulty: "EASY" },
  { phrase: "STAY TUNED", category: "PHRASE", difficulty: "EASY" },
  { phrase: "LOCAL LIBRARY", category: "PLACE", difficulty: "EASY" },
  { phrase: "MAKING A DIFFERENCE", category: "WHAT ARE YOU DOING?", difficulty: "EASY" },
  { phrase: "OUT OF THE BLUE", category: "PHRASE", difficulty: "EASY" },
  { phrase: "WINNING STREAK", category: "PHRASE", difficulty: "EASY" },
  { phrase: "STARTING THE ENGINE", category: "WHAT ARE YOU DOING?", difficulty: "EASY" },
  { phrase: "BEST IN SHOW", category: "PHRASE", difficulty: "EASY" },
  { phrase: "A BREATH OF FRESH AIR", category: "PHRASE", difficulty: "EASY" },
  { phrase: "DANCING THE NIGHT AWAY", category: "WHAT ARE YOU DOING?", difficulty: "EASY" },
  { phrase: "TROPICAL ISLAND", category: "PLACE", difficulty: "EASY" },
  { phrase: "LEMON MERINGUE PIE", category: "FOOD & DRINK", difficulty: "EASY" },
  { phrase: "PROUD PARENTS", category: "PEOPLE", difficulty: "EASY" },
  { phrase: "SURPRISE ENDING", category: "THING", difficulty: "EASY" },
  { phrase: "READY SET GO", category: "PHRASE", difficulty: "EASY" },
  { phrase: "MORNING COFFEE", category: "FOOD & DRINK", difficulty: "EASY" },
  { phrase: "SUNNY WEATHER", category: "THING", difficulty: "EASY" },
  { phrase: "READING A NOVEL", category: "WHAT ARE YOU DOING?", difficulty: "EASY" },
  { phrase: "WORTH THE WAIT", category: "PHRASE", difficulty: "EASY" },
  { phrase: "VALUABLE ASSET", category: "THING", difficulty: "EASY" },
  { phrase: "NEXT DOOR NEIGHBOR", category: "PERSON", difficulty: "EASY" },
  { phrase: "JUST IN TIME", category: "PHRASE", difficulty: "EASY" },
  { phrase: "GARDEN FLOWERS", category: "LIVING THINGS", difficulty: "EASY" },
  { phrase: "STAYING ORGANIZED", category: "WHAT ARE YOU DOING?", difficulty: "EASY" },
  { phrase: "GREEN TEA", category: "FOOD & DRINK", difficulty: "EASY" },
  { phrase: "GOLDEN OPPORTUNITY", category: "THING", difficulty: "EASY" },
  { phrase: "PIECE OF CAKE", category: "PHRASE", difficulty: "EASY" },
  { phrase: "TAKING A NAP", category: "WHAT ARE YOU DOING?", difficulty: "EASY" },

  // --- MEDIUM (Includes G, H, M, B, P, or Y) ---
  { phrase: "BUYING A SOUVENIR", category: "WHAT ARE YOU DOING?", difficulty: "MEDIUM" },
  { phrase: "SPICY GUACAMOLE", category: "FOOD & DRINK", difficulty: "MEDIUM" },
  { phrase: "QUIET NEIGHBORHOOD", category: "PLACE", difficulty: "MEDIUM" },
  { phrase: "WILD HORSES", category: "LIVING THINGS", difficulty: "MEDIUM" },
  { phrase: "LOYAL COMPANION", category: "PERSON", difficulty: "MEDIUM" },
  { phrase: "WAKING UP EARLY", category: "WHAT ARE YOU DOING?", difficulty: "MEDIUM" },
  { phrase: "HIDDEN GEM", category: "PLACE", difficulty: "MEDIUM" },
  { phrase: "BLUEBERRY MUFFINS", category: "FOOD & DRINK", difficulty: "MEDIUM" },
  { phrase: "GLOWING REVIEW", category: "THING", difficulty: "MEDIUM" },
  { phrase: "WAITING FOR THE BUS", category: "WHAT ARE YOU DOING?", difficulty: "MEDIUM" },
  { phrase: "BRIGHT FUTURE", category: "THING", difficulty: "MEDIUM" },
  { phrase: "FAMOUS AUTHOR", category: "PERSON", difficulty: "MEDIUM" },
  { phrase: "EXOTIC PLANTS", category: "LIVING THINGS", difficulty: "MEDIUM" },
  { phrase: "EASY DOES IT", category: "PHRASE", difficulty: "MEDIUM" },
  { phrase: "BUSTLING CITY", category: "PLACE", difficulty: "MEDIUM" },
  { phrase: "CHESTNUTS ROASTING", category: "FOOD & DRINK", difficulty: "MEDIUM" },
  { phrase: "GOURMET BREAKFAST", category: "FOOD & DRINK", difficulty: "MEDIUM" },
  { phrase: "PLAYFUL PUPPIES", category: "LIVING THINGS", difficulty: "MEDIUM" },
  { phrase: "POLKA DOT TIE", category: "THING", difficulty: "MEDIUM" },
  { phrase: "MAJESTIC EAGLE", category: "LIVING THING", difficulty: "MEDIUM" },
  { phrase: "BACK TO BASICS", category: "PHRASE", difficulty: "MEDIUM" },
  { phrase: "OVER-THE-TOP!", category: "PHRASE", difficulty: "MEDIUM" },
  { phrase: "LIVING THE DREAM-ISH", category: "PHRASE", difficulty: "MEDIUM" },
  { phrase: "UP TO NO GOOD", category: "PHRASE", difficulty: "MEDIUM" },
  { phrase: "BAGGAGE CLAIM", category: "PLACE", difficulty: "MEDIUM" },
  { phrase: "JOVIAL MOOD", category: "THING", difficulty: "MEDIUM" },
  { phrase: "FROZEN YOGURT", category: "FOOD & DRINK", difficulty: "MEDIUM" },
  { phrase: "JOVIAL MOOD", category: "THING", difficulty: "MEDIUM" },
  { phrase: "PUBLIC AUCTION", category: "EVENT", difficulty: "MEDIUM" },
  { phrase: "EXPECT THE UNEXPECTED", category: "PHRASE", difficulty: "MEDIUM" },

  // --- HARD (Includes J, Q, X, Z, K, W, or uncommon phrasing) ---
  { phrase: "JAZZ MUSICIAN", category: "PERSON", difficulty: "HARD" },
  { phrase: "QUARTZ CRYSTAL", category: "THING", difficulty: "HARD" },
  { phrase: "VIVID IMAGINATION", category: "THING", difficulty: "HARD" },
  { phrase: "ZIGZAGGING AROUND", category: "WHAT ARE YOU DOING?", difficulty: "HARD" },
  { phrase: "BOX OF CANDY", category: "FOOD & DRINK", difficulty: "HARD" },
  { phrase: "WIZARD OF OZ", category: "CHARACTER", difficulty: "HARD" },
  { phrase: "QUICK REFLEXES", category: "THINGS", difficulty: "HARD" },
  { phrase: "PICKING UP THE SLACK", category: "WHAT ARE YOU DOING?", difficulty: "HARD" },
  { phrase: "AQUARIUM EXHIBIT", category: "PLACE", difficulty: "HARD" },
  { phrase: "PUMPKIN PATCH", category: "PLACE", difficulty: "HARD" },
  { phrase: "EXTRAORDINARY QUALITY", category: "THING", difficulty: "HARD" },
  { phrase: "WILD BUFFALO", category: "LIVING THING", difficulty: "HARD" },
  { phrase: "FANCY TUXEDO", category: "THING", difficulty: "HARD" },
  { phrase: "SQUEAKY CLEAN", category: "PHRASE", difficulty: "HARD" },
  { phrase: "JUMPING ROPE", category: "WHAT ARE YOU DOING?", difficulty: "HARD" },
  { phrase: "OFF THE BEATEN PATH", category: "PHRASE", difficulty: "HARD" },
  { phrase: "KANGAROO POUCH", category: "THING", difficulty: "HARD" },
  { phrase: "ZYDECO MUSIC", category: "THING", difficulty: "HARD" },
  { phrase: "EQUIPMENT MANAGER", category: "PERSON", difficulty: "HARD" },
  { phrase: "FRENCH DIP SANDWICH", category: "FOOD & DRINK", difficulty: "HARD" },
  { phrase: "WHIPPING UP A BATCH", category: "WHAT ARE YOU DOING?", difficulty: "HARD" },
  { phrase: "JACKPOT WINNER", category: "PERSON", difficulty: "HARD" },
  { phrase: "KNOWLEDGE IS POWER", category: "PHRASE", difficulty: "HARD" },
  { phrase: "BACKYARD BARBECUE", category: "EVENT", difficulty: "HARD" },
  { phrase: "DON'T COUNT YOUR CHICKENS", category: "PROVERB", difficulty: "HARD" },
  { phrase: "MYSTERY BOX", category: "THING", difficulty: "HARD" },
  { phrase: "POCKET WATCH", category: "THING", difficulty: "HARD" },
  { phrase: "KICKING BACK", category: "WHAT ARE YOU DOING?", difficulty: "HARD" },
  { phrase: "FRESH SQUEEZED LEMONADE", category: "FOOD & DRINK", difficulty: "HARD" },
  { phrase: "FLUFFY KITTEN", category: "LIVING THING", difficulty: "HARD" },
];




const RSTLNE = ['R', 'S', 'T', 'L', 'N', 'E'];
const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ".split("");
const VOWELS = "AEIOU".split("");

interface Phrase {
  phrase: string;
  category: string;
  difficulty: string;
}

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
type GameState = 'START' | 'LETTERS' | 'REVEAL' | 'SOLVE' | 'WIN' | 'LOSE';

export default function App() {
  const getInitialRevealed = (phrase: string) => {
    const revealed = new Set(RSTLNE);
    phrase.split("").forEach(char => {
      if (char !== " " && !/^[A-Z]$/.test(char)) {
        revealed.add(char);
      }
    });
    return revealed;
  };

  const [gameState, setGameState] = useState<GameState>('START');
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');
  const [currentPhraseObj, setCurrentPhraseObj] = useState<Phrase>(() => {
    const easyPool = INITIAL_PHRASES.filter(p => p.difficulty === 'EASY');
    return easyPool[Math.floor(Math.random() * easyPool.length)];
  });

  const [revealedLetters, setRevealedLetters] = useState<Set<string>>(() =>
    getInitialRevealed(currentPhraseObj.phrase.toUpperCase())
  );
  const [pickedConsonants, setPickedConsonants] = useState<string[]>([]);
  const [pickedVowel, setPickedVowel] = useState<string | null>(null);
  const [solveInput, setSolveInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);

  const currentPhrase = currentPhraseObj.phrase.toUpperCase();
  const currentCategory = currentPhraseObj.category;

  const handleDifficultyChange = (d: Difficulty) => {
    setDifficulty(d);
    const pool = INITIAL_PHRASES.filter(p => p.difficulty === d);
    const nextPhrase = pool[Math.floor(Math.random() * pool.length)];
    setCurrentPhraseObj(nextPhrase);
    setRevealedLetters(getInitialRevealed(nextPhrase.phrase.toUpperCase()));
    setPickedConsonants([]);
    setPickedVowel(null);
    setSolveInput("");
  };

  // --- LOGIC ---
  const startTimer = useCallback(() => {
    setGameState('SOLVE');
    setTimeLeft(20);
  }, []);

  useEffect(() => {
    let timer: number;
    if (gameState === 'SOLVE' && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'SOLVE') {
      checkSolve();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const checkSolve = () => {
    if (solveInput.trim().toUpperCase() === currentPhrase) {
      setGameState('WIN');
    } else {
      setGameState('LOSE');
    }
  };

  const handlePickLetter = (char: string) => {
    if (revealedLetters.has(char)) return; // Already revealed (RSTLNE)
    if (pickedConsonants.includes(char) || pickedVowel === char) return; // Already picked

    if (VOWELS.includes(char)) {
      if (!pickedVowel) {
        setPickedVowel(char);
      }
    } else if (CONSONANTS.includes(char)) {
      if (pickedConsonants.length < 3) {
        setPickedConsonants(prev => [...prev, char]);
      }
    }
  };

  // Keyboard Picking Listener
  useEffect(() => {
    if (gameState !== 'LETTERS') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        handlePickLetter(char);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, pickedConsonants, pickedVowel, revealedLetters]);

  // Global Keyboard Listener for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (gameState === 'START') {
          setGameState('LETTERS');
        } else if (gameState === 'LETTERS') {
          if (pickedConsonants.length === 3 && pickedVowel) {
            revealPicked();
          }
        } else if (gameState === 'REVEAL') {
          startTimer();
        } else if (gameState === 'WIN' || gameState === 'LOSE') {
          resetGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, pickedConsonants, pickedVowel, revealedLetters, currentPhrase]);

  // Auto-reveal when selection is complete
  useEffect(() => {
    if (gameState === 'LETTERS' && pickedConsonants.length === 3 && pickedVowel) {
      const timer = setTimeout(revealPicked, 1000); // 1s delay for better UX
      return () => clearTimeout(timer);
    }
  }, [pickedConsonants, pickedVowel, gameState]);

  // Transitions: Reveal -> Solve
  useEffect(() => {
    if (gameState === 'REVEAL') {
      const timer = setTimeout(startTimer, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState, startTimer]);

  const revealPicked = () => {
    setGameState((prev) => {
      if (prev !== 'LETTERS') return prev;
      const nextSet = new Set(revealedLetters);
      pickedConsonants.forEach(c => nextSet.add(c));
      if (pickedVowel) nextSet.add(pickedVowel);
      setRevealedLetters(nextSet);
      return 'REVEAL';
    });
  };

  const startGame = () => {
    setGameState('LETTERS');
  };

  const resetGame = () => {
    const pool = INITIAL_PHRASES.filter(p => p.difficulty === difficulty);
    const nextPhrase = pool[Math.floor(Math.random() * pool.length)];

    setCurrentPhraseObj(nextPhrase);
    setRevealedLetters(getInitialRevealed(nextPhrase.phrase.toUpperCase()));
    setPickedConsonants([]);
    setPickedVowel(null);
    setSolveInput("");
    setTimeLeft(20);
    setGameState('START');
  };

  return (
    <div className="game-container">
      <div className="info-header">
        <div className="difficulty-badge">{difficulty}</div>
        <div className="category-badge">{currentCategory}</div>
      </div>

      <div className="phrase-grid">
        {currentPhrase.split(" ").map((word: string, wIdx: number, array: string[]) => (
          <div key={wIdx} className="word-group">
            {word.split("").map((char: string, cIdx: number) => (
              <div
                key={cIdx}
                className={`tile ${(gameState !== 'START' && revealedLetters.has(char)) || gameState === 'WIN' || gameState === 'LOSE' ? 'revealed' : ''}`}
              >
                {char}
              </div>
            ))}
            {wIdx < array.length - 1 && (
              <div key="space" className="tile space" />
            )}
          </div>
        ))}
      </div>

      {(['LETTERS', 'REVEAL', 'SOLVE', 'WIN', 'LOSE'].includes(gameState)) && (
        <div className="revealed-letters-display">
          <div className="letter-group">
            {RSTLNE.map(char => (
              <div key={char} className="display-tile revealed">{char}</div>
            ))}
          </div>
          <div className="divider" />
          <div className="letter-group">
            {pickedConsonants.map(char => (
              <div key={char} className="display-tile revealed">{char}</div>
            ))}
            {pickedConsonants.length < 3 && Array.from({ length: 3 - pickedConsonants.length }).map((_, i) => (
              <div key={`empty-c-${i}`} className="display-tile empty" />
            ))}
            {pickedVowel ? (
              <div className="display-tile revealed vowel">{pickedVowel}</div>
            ) : (
              <div className="display-tile empty vowel" />
            )}
          </div>
        </div>
      )}

      {gameState === 'START' && (
        <div className="start-screen">
          <div className="difficulty-instructions">
            <h2>Select Difficulty</h2>
          </div>
          <div className="difficulty-selector">
            {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((d) => (
              <button
                key={d}
                className={`difficulty-btn ${difficulty === d ? 'active' : ''}`}
                onClick={() => handleDifficultyChange(d)}
              >
                {d}
              </button>
            ))}
          </div>
          <button className="play-again-btn" onClick={startGame}>
            LET'S PLAY!
          </button>
        </div>
      )}

      {gameState === 'LETTERS' && (
        <div className="controls-panel">
          <div className="picking-instructions">
            <h2>Pick Your Letters</h2>
            <span>Type 3 Consonants & 1 Vowel</span>
          </div>

          <div className="letter-pool">
            {CONSONANTS.map(c => (
              <button
                key={c}
                onClick={() => handlePickLetter(c)}
                disabled={revealedLetters.has(c) || pickedConsonants.includes(c) || (pickedConsonants.length >= 3 && !pickedConsonants.includes(c))}
                className={`letter-btn ${pickedConsonants.includes(c) ? 'selected' : ''}`}
              >
                {c}
              </button>
            ))}
            <div style={{ gridColumn: '1 / -1', height: '10px' }} />
            {VOWELS.map(v => (
              <button
                key={v}
                onClick={() => handlePickLetter(v)}
                disabled={revealedLetters.has(v) || pickedVowel !== null}
                className={`letter-btn vowel ${pickedVowel === v ? 'selected' : ''}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'SOLVE' && (
        <div className="controls-panel">
          <div className={`timer-display ${timeLeft <= 5 ? 'urgent' : ''}`}>
            00:{timeLeft.toString().padStart(2, '0')}
          </div>
          <div className="solve-input-container">
            <input
              autoFocus
              className="solve-input"
              value={solveInput}
              onChange={(e) => {
                const val = e.target.value;
                setSolveInput(val);
                if (val.trim().toUpperCase() === currentPhrase) {
                  setGameState('WIN');
                }
              }}
              placeholder="TYPE YOUR ANSWER..."
            />
          </div>
        </div>
      )}

      {(gameState === 'WIN' || gameState === 'LOSE') && (
        <div className="result-overlay">
          <div className={`result-card ${gameState.toLowerCase()}`}>
            <h1>{gameState === 'WIN' ? '🎉 YOU SOLVED IT!' : '❌ OUT OF TIME'}</h1>
            <p>The phrase was:</p>
            <h2 style={{ color: 'var(--accent-primary)' }}>{currentPhrase}</h2>
            <button className="play-again-btn" onClick={resetGame}>PLAY AGAIN</button>
          </div>
        </div>
      )}
    </div>
  );
}
