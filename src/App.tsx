import { useCallback, useEffect, useState } from 'react';
import './index.css';

// --- DATA ---
const INITIAL_PHRASES = [
  { phrase: "PIECE OF CAKE", category: "PHRASE" },
  { phrase: "GOLDEN OPPORTUNITY", category: "THING" },
  { phrase: "MAKING A DIFFERENCE", category: "WHAT ARE YOU DOING?" },
  { phrase: "MOUNTAIN RETREAT", category: "PLACE" },
  { phrase: "FRESH SQUEEZED LEMONADE", category: "FOOD & DRINK" },
  { phrase: "OUT OF THE BLUE", category: "PHRASE" },
  { phrase: "TALENTED ARTIST", category: "PERSON" },
  { phrase: "FLUFFY KITTEN", category: "LIVING THING" },
  { phrase: "BETTER LATE THAN NEVER", category: "PHRASE" },
  { phrase: "MYSTERY BOX", category: "THING" },
  { phrase: "KEEPING A SECRET", category: "WHAT ARE YOU DOING?" },
  { phrase: "TROPICAL PARADISE", category: "PLACE" },
  { phrase: "HOT APPLE CIDER", category: "FOOD & DRINK" },
  { phrase: "PROUD PARENTS", category: "PEOPLE" },
  { phrase: "MAJESTIC EAGLE", category: "LIVING THING" },
  { phrase: "JUST IN TIME", category: "PHRASE" },
  { phrase: "HIGH EXPECTATIONS", category: "THINGS" },
  { phrase: "BUYING A SOUVENIR", category: "WHAT ARE YOU DOING?" },
  { phrase: "QUIET NEIGHBORHOOD", category: "PLACE" },
  { phrase: "SPICY GUACAMOLE", category: "FOOD & DRINK" },
  { phrase: "FAMOUS AUTHOR", category: "PERSON" },
  { phrase: "GARDEN FLOWERS", category: "LIVING THINGS" },
  { phrase: "WORTH THE WAIT", category: "PHRASE" },
  { phrase: "VALUABLE ASSET", category: "THING" },
  { phrase: "STAYING ORGANIZED", category: "WHAT ARE YOU DOING?" },
  { phrase: "LOCAL LIBRARY", category: "PLACE" },
  { phrase: "GOURMET BREAKFAST", category: "FOOD & DRINK" },
  { phrase: "DISTANT RELATIVE", category: "PERSON" },
  { phrase: "PLAYFUL PUPPIES", category: "LIVING THINGS" },
  { phrase: "EASY DOES IT", category: "PHRASE" },
  { phrase: "LUCKY CHARM", category: "THING" },
  { phrase: "LOOKING SHARP", category: "WHAT ARE YOU DOING?" },
  { phrase: "BUSTLING CITY", category: "PLACE" },
  { phrase: "CHESTNUTS ROASTING", category: "FOOD & DRINK" },
  { phrase: "LOYAL COMPANION", category: "PERSON" },
  { phrase: "EXOTIC PLANTS", category: "LIVING THINGS" },
  { phrase: "BACK TO BASICS", category: "PHRASE" },
  { phrase: "SURPRISE ENDING", category: "THING" },
  { phrase: "TAKING A CHANCE", category: "WHAT ARE YOU DOING?" },
  { phrase: "COZY CABIN", category: "PLACE" },
  { phrase: "ICED CARAMEL MACCHIATO", category: "FOOD & DRINK" },
  { phrase: "NEXT DOOR NEIGHBOR", category: "PERSON" },
  { phrase: "WILD HORSES", category: "LIVING THINGS" },
  { phrase: "STAY TUNED", category: "PHRASE" },
];

const shuffle = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const PHRASES = shuffle(INITIAL_PHRASES);

const RSTLNE = ['R', 'S', 'T', 'L', 'N', 'E'];
const CONSONANTS = "BCDFGHJKMPQVXYZ".split(""); // Simplified vowel check
const VOWELS = "AIOU".split(""); // E is already in RSTLNE

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

  const [currentIdx, setCurrentIdx] = useState(0);
  const [gameState, setGameState] = useState<GameState>('START');
  const [revealedLetters, setRevealedLetters] = useState<Set<string>>(() => getInitialRevealed(PHRASES[0].phrase.toUpperCase()));
  const [pickedConsonants, setPickedConsonants] = useState<string[]>([]);
  const [pickedVowel, setPickedVowel] = useState<string | null>(null);
  const [solveInput, setSolveInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);

  const currentPhrase = PHRASES[currentIdx].phrase.toUpperCase();
  const currentCategory = PHRASES[currentIdx].category;

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
  }, [gameState, pickedConsonants, pickedVowel, revealedLetters, currentIdx]);

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

  const resetGame = () => {
    const nextIdx = (currentIdx + 1) % PHRASES.length;
    const nextPhrase = PHRASES[nextIdx].phrase.toUpperCase();

    setGameState('START');
    setCurrentIdx(nextIdx);
    setRevealedLetters(getInitialRevealed(nextPhrase));
    setPickedConsonants([]);
    setPickedVowel(null);
    setSolveInput("");
    setTimeLeft(20);
  };

  return (
    <div className="game-container">
      <div className="category-badge">{currentCategory}</div>

      <div className="phrase-grid">
        {currentPhrase.split(" ").map((word, wIdx, array) => (
          <div key={wIdx} className="word-group">
            {word.split("").map((char, cIdx) => (
              <div
                key={cIdx}
                className={`tile ${revealedLetters.has(char) || gameState === 'WIN' || gameState === 'LOSE' ? 'revealed' : ''}`}
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

      {gameState === 'START' && (
        <button className="play-again-btn" onClick={() => setGameState('LETTERS')}>
          LET'S PLAY!
        </button>
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
                disabled={pickedConsonants.includes(c) || (pickedConsonants.length >= 3 && !pickedConsonants.includes(c))}
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
                disabled={pickedVowel !== null}
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
