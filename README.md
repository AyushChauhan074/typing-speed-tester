# ⌨️ TypeTest — Typing Speed Tester

> How fast are your fingers? Find out.

---

## What it does

- Shows a random sentence to type
- Starts the timer the moment you begin typing
- Tracks WPM, accuracy, time, and errors in real time
- Shows a results screen with a rating when you finish

---

## Features

- ✅ Live WPM counter while typing
- ✅ Live accuracy percentage
- ✅ Character-by-character color feedback (green = correct, red = wrong)
- ✅ Animated cursor on current character
- ✅ Progress bar
- ✅ 15 different sentences — random every round
- ✅ Result badge based on your speed
- ✅ Paste disabled (no cheating)
- ✅ Press Space on home screen to start instantly

---

## Project Structure

```
typing-speed-tester/
│
├── index.html          # All screens (idle, typing, result)
├── css/
│   └── style.css       # Editorial minimal styling
├── js/
│   ├── sentences.js    # Sentence pool + random picker
│   └── script.js       # Timer, WPM, accuracy, render logic
└── README.md
```

---

## How to Run

Just open `index.html` in a browser. No setup needed.

```bash
git clone https://github.com/your-username/typing-speed-tester.git
cd typing-speed-tester
open index.html
```

---

## Tech Stack

- HTML
- CSS (custom properties, animations)
- Vanilla JavaScript

---

## WPM Rating Scale

| WPM | Rating |
|-----|--------|
| 80+ | you type like a machine |
| 60–79 | faster than most humans |
| 40–59 | decent. keep going |
| 20–39 | room to grow. a lot of it |
| 0–19 | was the keyboard plugged in? |

---

*Built as a 2nd semester CSE project. Just HTML, CSS, and JS.*
