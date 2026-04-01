// ============================================
//  sentences.js — pool of typing sentences
// ============================================

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog near the river bank.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "Every expert was once a beginner who refused to give up on their dream.",
  "The best way to predict the future is to invent it yourself.",
  "Code is like humor. When you have to explain it, it is probably bad.",
  "First solve the problem, then write the code as cleanly as possible.",
  "A good programmer looks both ways before crossing a one-way street.",
  "The computer was born to solve problems that did not exist before it.",
  "Simplicity is the soul of efficiency in any great software system.",
  "Learning to write programs stretches your mind and helps you think better.",
  "Any fool can write code that a computer can understand, but good programmers write code humans can understand.",
  "The function of good software is to make the complex appear simple and clear.",
  "Talk is cheap. Show me the code and I will believe your skills.",
  "Debugging is twice as hard as writing the code in the first place.",
  "The most disastrous thing you can ever learn is your first programming language.",
];

function getRandomSentence() {
  return SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
}
