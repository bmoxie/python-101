export type Playground = {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  /** Optional lines fed to input() one at a time */
  sampleInputs?: string[];
  /** Soft check: stdout must include this (case-insensitive) */
  expectIncludes?: string;
  hint?: string;
};

export type StretchGoal = {
  /** Short challenge in everyday words */
  prompt: string;
  /** Plain-English explanation when they tap “I don’t know what that means” */
  explain: string;
  /** Optional jargon dictionary */
  jargon?: { term: string; meaning: string }[];
  /** Step-by-step mini lesson */
  miniLesson: string[];
  /** Optional runnable demo for the mini lesson */
  demo?: Playground;
};

export type Lesson = {
  slug: string;
  number: number;
  week: 1 | 2;
  title: string;
  duration: string;
  summary: string;
  why: string;
  teach: string[];
  example: Playground;
  challenge: Playground;
  stretch?: StretchGoal;
};

export const lessons: Lesson[] = [
  {
    slug: "say-hello",
    number: 1,
    week: 1,
    title: "Say Hello",
    duration: "15 min",
    summary: "Make Python talk with print().",
    why: "Every program starts by showing something on the screen. print() is how Python speaks.",
    teach: [
      "Python is a language you type in plain English-ish words.",
      "print() shows a message. Put your message in quotes.",
      "You can print more than one thing — just add another print() line.",
      "Quotes can be single 'like this' or double \"like this\". Pick one and stick with it for that message.",
    ],
    example: {
      id: "l1-example",
      title: "Watch it run",
      instructions: "Press Run. Change the words inside the quotes and run again.",
      starterCode: `print("Hello, world!")
print("I am learning Python.")`,
    },
    challenge: {
      id: "l1-challenge",
      title: "Your turn",
      instructions:
        "Print three lines: your name, your favorite snack, and one emoji or fun word.",
      starterCode: `# Add three messages below

`,
      expectIncludes: "print(",
      hint: "You need three separate print(\"...\") lines.",
    },
    stretch: {
      prompt:
        "Print a tiny face made of keyboard characters — three lines that look like a smiley.",
      explain:
        "This means draw a simple face using only letters and symbols on your keyboard (like : and ), not a photo. Each print() makes one line of the face.",
      jargon: [
        {
          term: "ASCII art",
          meaning:
            "Old-school drawings made from typing characters. Example: a smile made of : and )",
        },
      ],
      miniLesson: [
        "Think of three lines stacked: eyes on line 1, nose on line 2, mouth on line 3.",
        "Each line is its own print(\"...\") — same skill as the main challenge.",
        "Try the starter below, then change the characters to invent your own face.",
      ],
      demo: {
        id: "l1-stretch",
        title: "Try a face",
        instructions: "Press Run. Then change the characters inside the quotes.",
        starterCode: `print("  o o  ")
print("   ^   ")
print("  \\_/  ")`,
      },
    },
  },
  {
    slug: "name-tags",
    number: 2,
    week: 1,
    title: "Name Tags",
    duration: "15 min",
    summary: "Store values in variables so you can reuse them.",
    why: "Programs remember things — your score, your name, a secret number. Variables are labeled boxes that hold those values.",
    teach: [
      "A variable is a name that points to a value: score = 10",
      "Text (called a string) goes in quotes: name = \"Alex\"",
      "Numbers do not need quotes: lives = 3",
      "You can use a variable later: print(name)",
      "You can stick strings together with +: print(\"Hi \" + name)",
    ],
    example: {
      id: "l2-example",
      title: "Watch it run",
      instructions: "Change the values and run again. Notice how print uses the variables.",
      starterCode: `player = "River"
score = 42
print("Player:")
print(player)
print("Score:")
print(score)
print(player + " has " + str(score) + " points!")`,
    },
    challenge: {
      id: "l2-challenge",
      title: "Your turn",
      instructions:
        "Make variables for pet_name and pet_type. Print a sentence that uses both.",
      starterCode: `# Example goal: "Mochi is a cat"
pet_name = ""
pet_type = ""

`,
      expectIncludes: "is a",
      hint: "Fill in the variables, then print(pet_name + \" is a \" + pet_type)",
    },
    stretch: {
      prompt: "Add an age variable and include it in your sentence.",
      explain:
        "You already have pet_name and pet_type. Make one more labeled box called age that holds a number, then mention that number when you print.",
      jargon: [
        {
          term: "variable",
          meaning: "A name that remembers a value, like age = 3",
        },
      ],
      miniLesson: [
        "Under your other variables, add something like: age = 3",
        "Numbers do not need quotes.",
        "When you print, turn the number into text with str(age), same trick as Lesson 2’s example.",
        "Try the demo, then copy the idea into your challenge code.",
      ],
      demo: {
        id: "l2-stretch",
        title: "Age in a sentence",
        instructions: "Run this, then change the age number.",
        starterCode: `pet_name = "Mochi"
pet_type = "cat"
age = 3
print(pet_name + " is a " + pet_type + " and is " + str(age) + " years old.")`,
      },
    },
  },
  {
    slug: "asking-questions",
    number: 3,
    week: 1,
    title: "Asking Questions",
    duration: "20 min",
    summary: "Use input() to let someone type answers.",
    why: "Games and apps get interesting when the computer listens. input() pauses and waits for a typed answer.",
    teach: [
      "answer = input(\"What is your name? \") stores what the person typed.",
      "Whatever comes from input() is text (a string), even if they type a number.",
      "In this playground, sample answers are provided so you can press Run without typing.",
      "Later you can run the same idea in Replit or VS Code and type live.",
    ],
    example: {
      id: "l3-example",
      title: "Watch it run",
      instructions:
        "This demo uses a sample answer of \"Sam\". Press Run to see the conversation.",
      starterCode: `name = input("What is your name? ")
print("Nice to meet you, " + name + "!")
print("Welcome to Python 101.")`,
      sampleInputs: ["Sam"],
    },
    challenge: {
      id: "l3-challenge",
      title: "Your turn",
      instructions:
        "Ask for a favorite color, then print a sentence that includes their answer. Sample input is already set to \"teal\".",
      starterCode: `# Ask a question with input(), then print using the answer

`,
      sampleInputs: ["teal"],
      expectIncludes: "teal",
      hint: "color = input(\"Favorite color? \") then print something with color in it.",
    },
    stretch: {
      prompt: "Ask two questions (name + color) and use both in one sentence.",
      explain:
        "Call input() twice — once for a name, once for a color — store each answer in its own variable, then print one sentence that uses both answers.",
      jargon: [
        {
          term: "input()",
          meaning: "Pauses and waits for an answer, then gives you that answer as text.",
        },
      ],
      miniLesson: [
        "First line: name = input(\"Name? \")",
        "Second line: color = input(\"Favorite color? \")",
        "Then print one sentence that adds both with +",
        "Sample answers below are already set so Run works immediately.",
      ],
      demo: {
        id: "l3-stretch",
        title: "Two questions",
        instructions: "Sample answers: Jordan, then purple.",
        starterCode: `name = input("Name? ")
color = input("Favorite color? ")
print(name + " loves the color " + color + "!")`,
        sampleInputs: ["Jordan", "purple"],
      },
    },
  },
  {
    slug: "making-choices",
    number: 4,
    week: 1,
    title: "Making Choices",
    duration: "20 min",
    summary: "Teach Python to decide with if / else.",
    why: "Games branch: door A or door B, win or lose. if/else is how your program picks a path.",
    teach: [
      "if checks a condition: if score > 10:",
      "Indented lines under if only run when the condition is true.",
      "else: runs when the if was false.",
      "Compare strings carefully: \"yes\" is not the same as \"Yes\". Use .lower() to be friendly.",
      "Use == to check equality. = is for assigning. Easy mix-up!",
    ],
    example: {
      id: "l4-example",
      title: "Watch it run",
      instructions: "Sample answer is \"forest\". Change the sample inputs or the code and re-run.",
      starterCode: `path = input("forest or cave? ")
path = path.lower()

if path == "forest":
    print("You hear birds. Safe path!")
else:
    print("It is dark. Bring a torch.")`,
      sampleInputs: ["forest"],
    },
    challenge: {
      id: "l4-challenge",
      title: "Your turn",
      instructions:
        "Ask if they like pizza (yes/no). If yes, print a celebration. If no, print something else. Sample input: yes",
      starterCode: `answer = input("Do you like pizza? ")
answer = answer.lower()

# Add if / else below

`,
      sampleInputs: ["yes"],
      expectIncludes: "pizza",
      hint: "if answer == \"yes\": then an indented print. else: another print.",
    },
    stretch: {
      prompt: "Add a third choice with elif — for example, someone answers \"maybe\".",
      explain:
        "if handles one answer. else handles everything else. elif (say “else if”) sits in the middle for another specific answer before you give up and use else.",
      jargon: [
        {
          term: "elif",
          meaning: "Short for “else if” — check another condition after if failed.",
        },
      ],
      miniLesson: [
        "Keep your if answer == \"yes\": block.",
        "Under it, add: elif answer == \"maybe\": with its own indented print.",
        "Then else: for anything that isn’t yes or maybe.",
        "Try the demo with sample answer maybe.",
      ],
      demo: {
        id: "l4-stretch",
        title: "Three paths",
        instructions: "Sample answer is maybe. Change it to yes or no and re-run.",
        starterCode: `answer = input("Do you like pizza? ")
answer = answer.lower()

if answer == "yes":
    print("Pizza party!")
elif answer == "maybe":
    print("We can share a slice.")
else:
    print("More pasta for you!")`,
        sampleInputs: ["maybe"],
      },
    },
  },
  {
    slug: "repeat-that",
    number: 5,
    week: 2,
    title: "Repeat That",
    duration: "20 min",
    summary: "Use for loops to do something many times.",
    why: "Counting, dealing cards, showing a list of levels — loops save you from copy-pasting the same line 100 times.",
    teach: [
      "for i in range(5): runs the indented block 5 times. i becomes 0, 1, 2, 3, 4.",
      "You can loop over letters in a word: for letter in \"hi\":",
      "Indentation still matters — the loop body must be indented.",
      "range(1, 6) gives 1 through 5 (stops before 6).",
    ],
    example: {
      id: "l5-example",
      title: "Watch it run",
      instructions: "Press Run. Try changing range(5) to range(3) or range(1, 6).",
      starterCode: `print("Countdown!")
for n in range(5, 0, -1):
    print(n)
print("Go!")`,
    },
    challenge: {
      id: "l5-challenge",
      title: "Your turn",
      instructions: "Print your name 5 times using a for loop (not five separate print lines).",
      starterCode: `name = "Ada"
# Loop here so name prints 5 times

`,
      expectIncludes: "Ada",
      hint: "for i in range(5): then an indented print(name)",
    },
    stretch: {
      prompt:
        "Print numbered lines like \"1. Ada\", \"2. Ada\"… using the loop’s counting variable.",
      explain:
        "In for i in range(5): the letter i is a tiny counter. Each lap it becomes a new number. You can print that number next to the name.",
      jargon: [
        {
          term: "loop variable",
          meaning: "The name after for (like i) that changes each time the loop repeats.",
        },
      ],
      miniLesson: [
        "range(5) gives 0, 1, 2, 3, 4 — computers often start counting at 0.",
        "To show 1–5 for humans, print i + 1.",
        "Glue the number and name: print(str(i + 1) + \". \" + name)",
        "Run the demo, then adapt it in your challenge box.",
      ],
      demo: {
        id: "l5-stretch",
        title: "Numbered repeats",
        instructions: "Press Run. Try changing the name.",
        starterCode: `name = "Ada"
for i in range(5):
    print(str(i + 1) + ". " + name)`,
      },
    },
  },
  {
    slug: "packing-lists",
    number: 6,
    week: 2,
    title: "Packing Lists",
    duration: "20 min",
    summary: "Keep many items in one list.",
    why: "Inventories, high scores, to-do lists — a list holds an ordered collection of values.",
    teach: [
      "Create a list with square brackets: snacks = [\"chips\", \"fruit\", \"cookies\"]",
      "First item is index 0: snacks[0]",
      "Add an item with .append(\"popcorn\")",
      "Loop through everything: for snack in snacks:",
      "len(snacks) tells you how many items are in the list.",
    ],
    example: {
      id: "l6-example",
      title: "Watch it run",
      instructions: "Add another item with append and run again.",
      starterCode: `quests = ["find key", "open door", "grab gem"]
quests.append("escape")

print("You have", len(quests), "quests:")
for q in quests:
    print("- " + q)

print("First quest:", quests[0])`,
    },
    challenge: {
      id: "l6-challenge",
      title: "Your turn",
      instructions:
        "Make a list of 3 favorite games. Print each one on its own line with a for loop.",
      starterCode: `games = []

`,
      expectIncludes: "-",
      hint: "Fill the list, then: for g in games: print(\"- \" + g)",
    },
    stretch: {
      prompt: "Print how many games are in your list using len().",
      explain:
        "len() means “length” — how many items are inside the list. You don’t count by hand; Python counts for you.",
      jargon: [
        {
          term: "len()",
          meaning: "Returns how many things are in a list (or how many characters are in a string).",
        },
      ],
      miniLesson: [
        "After your games list exists, write: print(len(games))",
        "Or make a friendlier sentence with str(len(games)).",
        "Run the demo to see the number change when you append another game.",
      ],
      demo: {
        id: "l6-stretch",
        title: "Count the list",
        instructions: "Run, then uncomment the append line and run again.",
        starterCode: `games = ["Minecraft", "Roblox", "Stardew"]
# games.append("Celeste")
print("You listed " + str(len(games)) + " games.")`,
      },
    },
  },
  {
    slug: "your-own-recipes",
    number: 7,
    week: 2,
    title: "Your Own Recipes",
    duration: "20 min",
    summary: "Write functions — reusable mini-programs.",
    why: "When you repeat the same steps, wrap them in a function. Call it whenever you need that recipe.",
    teach: [
      "Define with def: def greet(name):",
      "Indented lines are the function body.",
      "Call it with greet(\"Maya\") — that runs the body.",
      "Functions can return a value with return.",
      "Defining a function does nothing until you call it.",
    ],
    example: {
      id: "l7-example",
      title: "Watch it run",
      instructions: "Try calling shout with a different word.",
      starterCode: `def shout(word):
    print(word.upper() + "!!!")

shout("hello")
shout("python")`,
    },
    challenge: {
      id: "l7-challenge",
      title: "Your turn",
      instructions:
        "Write a function introduce(name, hobby) that prints a sentence using both. Call it twice with different people.",
      starterCode: `def introduce(name, hobby):
    # print a sentence here
    pass

# Call introduce twice below

`,
      expectIncludes: "!",
      hint: "Inside the function: print(name + \" loves \" + hobby + \"!\") then call it twice.",
    },
    stretch: {
      prompt:
        "Make a function that returns a string instead of printing, then print the result yourself.",
      explain:
        "So far your functions print for you. return hands a value back to the caller — like a recipe that gives you the cake so you decide what to do with it (print it, save it, etc.).",
      jargon: [
        {
          term: "return",
          meaning: "Sends a value out of the function to whoever called it.",
        },
      ],
      miniLesson: [
        "Inside the function, use return \"some text\" instead of print(...).",
        "When you call it, catch the result: message = introduce(\"Maya\", \"coding\")",
        "Then print(message) outside the function.",
        "Try the demo — notice print lives outside the function.",
      ],
      demo: {
        id: "l7-stretch",
        title: "Return, then print",
        instructions: "Run this. Then change the names in the calls.",
        starterCode: `def introduce(name, hobby):
    return name + " loves " + hobby + "!"

message = introduce("Maya", "coding")
print(message)
print(introduce("Sam", "soccer"))`,
      },
    },
  },
  {
    slug: "build-a-game",
    number: 8,
    week: 2,
    title: "Build a Game",
    duration: "25 min",
    summary: "Combine everything into a tiny guessing game.",
    why: "Real projects mix tools: variables, input, if/else, and loops. This is your two-week boss fight — and you already have the pieces.",
    teach: [
      "We'll build a number guessing game.",
      "The computer picks a secret number (we'll set it for practice).",
      "The player guesses in a loop until they get it — or run out of tries.",
      "if/elif/else tells them \"too high\", \"too low\", or \"you win!\".",
      "Take it slow. Run often. Change one thing at a time.",
    ],
    example: {
      id: "l8-example",
      title: "See a working version",
      instructions:
        "Sample guesses: 3, then 8, then 7. Watch how the loop and if/else work together.",
      starterCode: `secret = 7
tries = 3

print("Guess the number (1-10). You have", tries, "tries.")

for attempt in range(tries):
    guess = int(input("Guess: "))
    if guess == secret:
        print("You got it!")
        break
    elif guess < secret:
        print("Too low.")
    else:
        print("Too high.")
else:
    print("Out of tries. The number was", secret)`,
      sampleInputs: ["3", "8", "7"],
    },
    challenge: {
      id: "l8-challenge",
      title: "Make it yours",
      instructions:
        "Change the secret number and the welcome message. Then tweak the too-high / too-low lines so they sound like you. Sample guesses: 2, 5, 5",
      starterCode: `secret = 5
tries = 3

print("=== Your Game Title Here ===")
print("Guess 1-10. Tries:", tries)

for attempt in range(tries):
    guess = int(input("Guess: "))
    if guess == secret:
        print("You win!")
        break
    elif guess < secret:
        print("Too low.")
    else:
        print("Too high.")
else:
    print("Game over. It was", secret)`,
      sampleInputs: ["2", "5", "5"],
      expectIncludes: "win",
      hint: "Change secret, the title print, and the message strings. Keep the if/elif/else logic.",
    },
    stretch: {
      prompt:
        "Add a score that starts at 100 and loses 10 points on each wrong guess. Print the final score.",
      explain:
        "Make a variable called score that begins at 100. Every time the guess is wrong, subtract 10. When the game ends, print whatever score is left.",
      jargon: [
        {
          term: "score -= 10",
          meaning: "Shorthand for score = score - 10 (take 10 points away).",
        },
      ],
      miniLesson: [
        "Near the top, add: score = 100",
        "In the too-low and too-high branches (wrong guesses), add: score = score - 10",
        "Don’t subtract when they win.",
        "At the end, print the score. The demo shows one way.",
      ],
      demo: {
        id: "l8-stretch",
        title: "Scoring version",
        instructions: "Sample guesses: 2, then 9, then 5. Watch the score drop, then win.",
        starterCode: `secret = 5
tries = 3
score = 100

print("Guess 1-10. Tries:", tries)

for attempt in range(tries):
    guess = int(input("Guess: "))
    if guess == secret:
        print("You win! Score:", score)
        break
    elif guess < secret:
        print("Too low.")
        score = score - 10
    else:
        print("Too high.")
        score = score - 10
else:
    print("Game over. It was", secret, "Score:", score)`,
        sampleInputs: ["2", "9", "5"],
      },
    },
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getAdjacentLessons(slug: string) {
  const index = lessons.findIndex((l) => l.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}
