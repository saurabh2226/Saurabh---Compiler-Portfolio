import command from '../config.json' assert { type: 'json' };
import { HELP, HELP_ALL } from "./commands/help";
import { BANNER } from "./commands/banner";
import { ABOUT } from "./commands/about"
import { DEFAULT } from "./commands/default";
import { PROJECTS } from "./commands/projects";
import { CONTRIBUTIONS } from "./commands/contributions";
import { ACHIEVEMENTS } from './commands/achievements';
import { EXPERIENCE } from './commands/experience';
import { EDUCATION } from './commands/education';
import { SKILLS } from './commands/skills';
import { POSITIONS } from './commands/positions';
import { CONTACT } from './commands/contact';
import { SUMMARY } from './commands/summary';
import { NOW } from './commands/now';

type ThemeName = "default" | "matrix" | "amber";
type ThemePalette = Record<string, string>;

const THEMES: Record<ThemeName, ThemePalette> = {
  default: {
    "--bg": command.colors.background,
    "--text": command.colors.foreground,
    "--banner": command.colors.banner,
    "--border": command.colors.border.color,
    "--prompt-default": command.colors.prompt.default,
    "--prompt-user": command.colors.prompt.user,
    "--prompt-host": command.colors.prompt.host,
    "--prompt-input": command.colors.prompt.input,
    "--link": command.colors.link.text,
    "--link-highlight-bg": command.colors.link.highlightColor,
    "--link-highlight-text": command.colors.link.highlightText,
    "--command": command.colors.commands.textColor,
    "--keys": command.colors.banner,
  },
  matrix: {
    "--bg": "#020B05",
    "--text": "#B3FFD1",
    "--banner": "#54FF8F",
    "--border": "#39D879",
    "--prompt-default": "#8DC6A4",
    "--prompt-user": "#77FFAA",
    "--prompt-host": "#49E38C",
    "--prompt-input": "#77FFAA",
    "--link": "#57F593",
    "--link-highlight-bg": "#163D24",
    "--link-highlight-text": "#CFFFE0",
    "--command": "#8DFFB9",
    "--keys": "#54FF8F",
  },
  amber: {
    "--bg": "#1A1105",
    "--text": "#FFE7C2",
    "--banner": "#FFC45C",
    "--border": "#FFB347",
    "--prompt-default": "#D7B98A",
    "--prompt-user": "#FFD28A",
    "--prompt-host": "#FFC45C",
    "--prompt-input": "#FFD28A",
    "--link": "#FFD28A",
    "--link-highlight-bg": "#5C3A07",
    "--link-highlight-text": "#FFF1D9",
    "--command": "#FFD28A",
    "--keys": "#FFC45C",
  }
};

// mutWriteLines gets deleted and reassigned.
let mutWriteLines = document.getElementById("write-lines");
let historyIdx = 0;
let tempInput = "";
let userInput = "";
let isSudo = false;
let isPasswordInput = false;
let passwordCounter = 0;
let bareMode = false;

const WRITELINESCOPY = mutWriteLines;
const TERMINAL = document.getElementById("terminal");
const USERINPUT = document.getElementById("user-input") as HTMLInputElement | null;
const INPUT_HIDDEN = document.getElementById("input-hidden");
const PASSWORD = document.getElementById("password-input");
const PASSWORD_INPUT = document.getElementById("password-field") as HTMLInputElement | null;
const PRE_HOST = document.getElementById("pre-host");
const PRE_USER = document.getElementById("pre-user");
const HOST = document.getElementById("host");
const USER = document.getElementById("user");
const PROMPTS = Array.from(document.querySelectorAll("#prompt"));
const COMMANDS = [
  "help", "about", "summary", "projects", "repo", "banner", "clear",
  "contributions", "achievements", "experience", "education", "skills",
  "positions", "contact", "now", "history", "whoami", "date", "theme",
  "echo", "sudo", "ls", "rm -rf"
];
const HISTORY: string[] = [];
const SUDO_PASSWORD = command.password;
const REPO_LINK = command.repoLink;

const scrollToBottom = () => {
  const main = document.getElementById("main");
  if (!main) return;

  main.scrollTop = main.scrollHeight;
}

function userInputHandler(e: KeyboardEvent) {
  const key = e.key;

  switch (key) {
    case "Enter":
      e.preventDefault();
      if (!isPasswordInput) {
        enterKey();
      } else {
        passwordHandler();
      }
      scrollToBottom();
      break;
    case "Escape":
      if (USERINPUT) USERINPUT.value = "";
      break;
    case "ArrowUp":
    case "ArrowDown":
      arrowKeys(key);
      e.preventDefault();
      break;
    case "Tab":
      tabKey();
      e.preventDefault();
      break;
  }
}

function enterKey() {
  if (!mutWriteLines || !USERINPUT) return;
  const resetInput = "";
  userInput = USERINPUT.value;

  const userInputHtml = bareMode ? userInput : `<span class='output'>${userInput}</span>`;

  HISTORY.push(userInput);
  historyIdx = HISTORY.length;

  if (userInput === 'clear') {
    commandHandler(userInput.toLowerCase().trim());
    USERINPUT.value = resetInput;
    userInput = resetInput;
    return;
  }

  const primaryPrompt = PROMPTS[0]?.innerHTML ?? "user@host:$ ~";
  const div = document.createElement("div");
  div.innerHTML = `<span id="prompt">${primaryPrompt}</span> ${userInputHtml}`;

  if (mutWriteLines.parentNode) {
    mutWriteLines.parentNode.insertBefore(div, mutWriteLines);
  }

  if (userInput.trim().length !== 0) {
    commandHandler(userInput.toLowerCase().trim());
  }

  USERINPUT.value = resetInput;
  userInput = resetInput;
}

function tabKey() {
  if (!USERINPUT) return;
  const currInput = USERINPUT.value.trim();
  if (currInput.includes(" ")) return;

  const match = COMMANDS.find((cmd) => cmd.startsWith(currInput));
  if (match) USERINPUT.value = match;
}

function arrowKeys(key: string) {
  if (!USERINPUT) return;
  switch (key) {
    case "ArrowDown":
      if (historyIdx !== HISTORY.length) {
        historyIdx += 1;
        USERINPUT.value = HISTORY[historyIdx] ?? "";
        if (historyIdx === HISTORY.length) USERINPUT.value = tempInput;
      }
      break;
    case "ArrowUp":
      if (historyIdx === HISTORY.length) tempInput = USERINPUT.value;
      if (historyIdx !== 0) {
        historyIdx -= 1;
        USERINPUT.value = HISTORY[historyIdx] ?? "";
      }
      break;
  }
}

function getClosestCommand(input: string): string | null {
  if (!input) return null;
  const startsWith = COMMANDS.find((cmd) => cmd.startsWith(input));
  if (startsWith) return startsWith;
  const contains = COMMANDS.find((cmd) => cmd.includes(input));
  return contains ?? null;
}

function showHistory() {
  const recent = HISTORY.slice(-10);
  if (recent.length === 0) {
    writeLines(["<br>", "No command history yet.", "<br>"]);
    return;
  }

  const output = ["<br>", "<strong>Recent Commands</strong>"];
  recent.forEach((cmd, idx) => {
    output.push(`${idx + 1}. ${cmd}`);
  });
  output.push("<br>");
  writeLines(output);
}

function applyTheme(themeName: ThemeName) {
  const root = document.documentElement;
  const theme = THEMES[themeName];
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

function commandHandler(input: string) {
  const tokens = input.split(/\s+/).filter(Boolean);
  const baseCommand = tokens[0] ?? "";
  const args = tokens.slice(1);

  if (input.startsWith("rm -rf") && input.trim() !== "rm -rf") {
    if (isSudo) {
      if (input === "rm -rf src" && !bareMode) {
        bareMode = true;

        setTimeout(() => {
          if (!TERMINAL || !WRITELINESCOPY) return;
          TERMINAL.innerHTML = "";
          TERMINAL.appendChild(WRITELINESCOPY);
          mutWriteLines = WRITELINESCOPY;
        });

        easterEggStyles();
        setTimeout(() => {
          writeLines(["What made you think that was a good idea?", "<br>"]);
        }, 200);

        setTimeout(() => {
          writeLines(["Now everything is ruined.", "<br>"]);
        }, 1200);
      } else if (input === "rm -rf src" && bareMode) {
        writeLines(["there's no more src folder.", "<br>"]);
      } else {
        if (bareMode) {
          writeLines(["What else are you trying to delete?", "<br>"]);
        } else {
          writeLines(["<br>", "Directory not found.", "type <span class='command'>'ls'</span> for a list of directories.", "<br>"]);
        }
      }
    } else {
      writeLines(["Permission not granted.", "<br>"]);
    }
    return;
  }

  switch (baseCommand) {
    case 'clear':
      setTimeout(() => {
        if (!TERMINAL || !WRITELINESCOPY) return;
        TERMINAL.innerHTML = "";
        TERMINAL.appendChild(WRITELINESCOPY);
        mutWriteLines = WRITELINESCOPY;
        writeLines(BANNER);
      });
      break;
    case 'banner':
      if (bareMode) {
        writeLines(["Welcome To My Portfolio", "<br>"]);
        break;
      }
      writeLines(BANNER);
      break;
    case 'help':
      if (bareMode) {
        writeLines(["maybe restarting your browser will fix this.", "<br>"]);
        break;
      }
      if (args[0] === "all" || args[0] === "-a") {
        writeLines(HELP_ALL);
      } else {
        writeLines(HELP);
      }
      break;
    case 'about':
      if (bareMode) {
        writeLines(["Nothing to see here.", "<br>"]);
        break;
      }
      writeLines(ABOUT);
      break;
    case 'summary':
      if (bareMode) {
        writeLines(["You already deleted the source. There is no summary now.", "<br>"]);
        break;
      }
      writeLines(SUMMARY);
      break;
    case 'projects':
      if (bareMode) {
        writeLines(["I don't want you to break the other projects.", "<br>"]);
        break;
      }
      writeLines(PROJECTS);
      break;
    case 'repo':
      writeLines(["Redirecting to github.com...", "<br>"]);
      setTimeout(() => {
        window.open(REPO_LINK, '_blank');
      }, 500);
      break;
    case 'contributions':
      if (bareMode) {
        writeLines(["I don't want you to break the project contributions.", "<br>"]);
        break;
      }
      writeLines(CONTRIBUTIONS);
      break;
    case 'achievements':
      if (bareMode) {
        writeLines(["I don't want you to break the achievements listed here.", "<br>"]);
        break;
      }
      writeLines(ACHIEVEMENTS);
      break;
    case 'experience':
      writeLines(EXPERIENCE);
      break;
    case 'education':
      writeLines(EDUCATION);
      break;
    case 'skills':
      writeLines(SKILLS);
      break;
    case 'positions':
      writeLines(POSITIONS);
      break;
    case 'contact':
      writeLines(CONTACT);
      break;
    case 'now':
      writeLines(NOW);
      break;
    case 'history':
      showHistory();
      break;
    case 'whoami':
      writeLines([
        "<br>",
        `${command.username}@${command.hostname}`,
        command.subtitle,
        command.aboutGreeting,
        "<br>"
      ]);
      break;
    case 'date':
      writeLines(["<br>", new Date().toLocaleString(), "<br>"]);
      break;
    case 'theme': {
      if (bareMode) {
        writeLines(["No themes left after deleting src.", "<br>"]);
        break;
      }
      const themeArg = args[0] as ThemeName | undefined;
      if (!themeArg || !(themeArg in THEMES)) {
        writeLines(["<br>", "Usage: theme <default|matrix|amber>", "<br>"]);
        break;
      }
      applyTheme(themeArg);
      writeLines([`Theme changed to <span class='command'>${themeArg}</span>.`, "<br>"]);
      break;
    }
    case 'echo':
      writeLines(["<br>", args.join(" ") || "...", "<br>"]);
      break;
    case 'rm':
      if (input === "rm -rf") {
        if (bareMode) {
          writeLines(["don't try again.", "<br>"]);
          break;
        }

        if (isSudo) {
          writeLines(["Usage: <span class='command'>'rm -rf &lt;dir&gt;'</span>", "<br>"]);
        } else {
          writeLines(["Permission not granted.", "<br>"]);
        }
        break;
      }
      writeLines(DEFAULT);
      break;
    case 'sudo':
      if (bareMode) {
        writeLines(["no.", "<br>"]);
        break;
      }
      if (!PASSWORD || !USERINPUT || !INPUT_HIDDEN || !PASSWORD_INPUT) return;
      isPasswordInput = true;
      USERINPUT.disabled = true;

      INPUT_HIDDEN.style.display = "none";
      PASSWORD.style.display = "block";
      setTimeout(() => {
        PASSWORD_INPUT.focus();
      }, 100);
      break;
    case 'ls':
      if (bareMode) {
        writeLines(["", "<br>"]);
        break;
      }

      if (isSudo) {
        writeLines(["src", "<br>"]);
      } else {
        writeLines(["Permission not granted.", "<br>"]);
      }
      break;
    default: {
      if (bareMode) {
        writeLines(["type 'help'", "<br>"]);
        break;
      }

      const suggestion = getClosestCommand(baseCommand);
      if (suggestion) {
        writeLines([
          "<br>",
          "COMMAND NOT FOUND",
          `Did you mean <span class='command'>'${suggestion}'</span>?`,
          "<br>"
        ]);
        break;
      }

      writeLines(DEFAULT);
      break;
    }
  }
}

function writeLines(message: string[]) {
  message.forEach((item, idx) => {
    displayText(item, idx);
  });
}

function displayText(item: string, idx: number) {
  setTimeout(() => {
    if (!mutWriteLines || !mutWriteLines.parentNode) return;
    const line = document.createElement("p");
    line.innerHTML = item;
    mutWriteLines.parentNode.insertBefore(line, mutWriteLines);
    scrollToBottom();
  }, 38 * idx);
}

function revertPasswordChanges() {
  if (!INPUT_HIDDEN || !PASSWORD || !PASSWORD_INPUT || !USERINPUT) return;
  PASSWORD_INPUT.value = "";
  USERINPUT.disabled = false;
  INPUT_HIDDEN.style.display = "block";
  PASSWORD.style.display = "none";
  isPasswordInput = false;

  setTimeout(() => {
    USERINPUT.focus();
  }, 200);
}

function passwordHandler() {
  if (!PASSWORD_INPUT) return;
  if (passwordCounter === 2) {
    writeLines(["<br>", "INCORRECT PASSWORD.", "PERMISSION NOT GRANTED.", "<br>"]);
    revertPasswordChanges();
    passwordCounter = 0;
    return;
  }

  if (PASSWORD_INPUT.value === SUDO_PASSWORD) {
    writeLines(["<br>", "PERMISSION GRANTED.", "Try <span class='command'>'rm -rf'</span>", "<br>"]);
    revertPasswordChanges();
    isSudo = true;
    return;
  }

  PASSWORD_INPUT.value = "";
  passwordCounter += 1;
}

function easterEggStyles() {
  if (!USERINPUT) return;
  const bars = document.getElementById("bars");
  const body = document.body;
  const main = document.getElementById("main");
  const span = document.getElementsByTagName("span");

  if (bars) bars.remove();
  if (main) main.style.border = "none";

  body.style.backgroundColor = "black";
  body.style.fontFamily = "VT323, monospace";
  body.style.fontSize = "20px";
  body.style.color = "white";

  for (let i = 0; i < span.length; i++) {
    span[i].style.color = "white";
  }

  USERINPUT.style.backgroundColor = "black";
  USERINPUT.style.color = "white";
  USERINPUT.style.fontFamily = "VT323, monospace";
  USERINPUT.style.fontSize = "20px";
}

function updateTopBarText() {
  const bar1 = document.getElementById("bar-1");
  if (bar1) {
    bar1.innerText = `${command.title} | ${command.subtitle}`;
  }
}

const initEventListeners = () => {
  if (HOST) HOST.innerText = command.hostname;
  if (USER) USER.innerText = command.username;
  if (PRE_HOST) PRE_HOST.innerText = command.hostname;
  if (PRE_USER) PRE_USER.innerText = command.username;

  window.addEventListener('load', () => {
    updateTopBarText();
    applyTheme("default");
    writeLines(BANNER);
  });

  if (USERINPUT) {
    USERINPUT.addEventListener('keydown', userInputHandler);
  }
  if (PASSWORD_INPUT) {
    PASSWORD_INPUT.addEventListener('keydown', userInputHandler);
  }

  window.addEventListener('click', () => {
    USERINPUT?.focus();
  });
}

initEventListeners();
