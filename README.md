I wanted to try out Antigravity, and I also really wanted a version of this, and
I couldn't find one online.

It was much less work than figuring it out myself, but the AI was much less capable
than I thought, as it had trouble rendering spaces, and briefly showing the next word. It even
put O as a consonant. Maybe I should have used a larger model than Gemini 3 Flash.

AI generated README below:
----

# Wheel of Fortune Bonus Round

**Live Demo: [https://pkmnnerd.github.io/bonus_round/](https://pkmnnerd.github.io/bonus_round/)**

A browser-based recreation of the Wheel of Fortune bonus round, built with React and Vite.

## Features
- **Classic Gameplay**: Experience the bonus round with the standard RSTLNE reveal and your own pick of 3 consonants and 1 vowel.
- **Randomized Phrases**: Every session starts with a random phrase from a curated list.
- **Auto-Submission**: Instant win detection as you type the answer—no submit button needed.
- **Punctuation Support**: Commas, apostrophes, and hyphens are automatically revealed at the start.
- **Responsive Design**: A clean, grid-based layout with smart word wrapping.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
1. Clone the repository or navigate to the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`.

### How to Play
1. Click **"LET'S PLAY!"** to see a randomized hidden phrase.
2. The letters **R, S, T, L, N, E** and any punctuation will be revealed automatically.
3. Pick **3 consonants** and **1 vowel** from the letter pool.
4. Click **"REVEAL LETTERS"** to see your picks on the board.
5. You have **20 seconds** to solve the phrase! Simply type your answer into the input field.
6. The game wins automatically once the correct phrase is typed.

## Technologies Used
- React
- Vite
- Vanilla CSS
