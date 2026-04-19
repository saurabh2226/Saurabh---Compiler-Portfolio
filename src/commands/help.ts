const fullHelpCommands = [
  ["'about'", "Curious about the creator?"],
  ["'summary'", "Quick profile snapshot and highlights"],
  ["'projects'", "Explore featured projects"],
  ["'contributions'", "Display my coding profiles"],
  ["'achievements'", "Discover my achievements"],
  ["'experience'", "View professional experience"],
  ["'education'", "Check educational background"],
  ["'skills'", "See technical skills"],
  ["'positions'", "Positions of responsibility"],
  ["'now'", "Current learning focus"],
  ["'contact'", "All channels to connect"],
  ["'repo'", "Open GitHub repository"],
  ["'history'", "Show recent commands"],
  ["'whoami'", "Show role and identity details"],
  ["'date'", "Show current date and time"],
  ["'theme <name>'", "Switch theme: default, matrix, amber"],
  ["'echo <text>'", "Print custom text to terminal"],
  ["'sudo'", "Gain ultimate power... and responsibility."],
  ["'banner'", "Display the banner"],
  ["'clear'", "Clear the terminal"],
];

const compactHelpGroups = [
  "Profile : <span class='command'>about</span> | <span class='command'>summary</span> | <span class='command'>whoami</span> | <span class='command'>contact</span>",
  "Work    : <span class='command'>projects</span> | <span class='command'>experience</span> | <span class='command'>skills</span> | <span class='command'>contributions</span>",
  "More    : <span class='command'>education</span> | <span class='command'>positions</span> | <span class='command'>achievements</span> | <span class='command'>now</span>",
  "Shell   : <span class='command'>history</span> | <span class='command'>date</span> | <span class='command'>theme &lt;name&gt;</span> | <span class='command'>echo &lt;text&gt;</span>",
  "System  : <span class='command'>repo</span> | <span class='command'>banner</span> | <span class='command'>clear</span> | <span class='command'>sudo</span>",
];

const buildFullHelp = (): string[] => {
  const help: string[] = [];
  help.push("<br>");
  fullHelpCommands.forEach((ele) => {
    const SPACE = "&nbsp;";
    let line = "";
    line += SPACE.repeat(2);
    line += "<span class='command'>";
    line += ele[0];
    line += "</span>";
    line += SPACE.repeat(Math.max(2, 17 - ele[0].length));
    line += ele[1];
    help.push(line);
  });
  help.push("<br>");
  help.push("Use <span class='command'>'help'</span> for compact view.");
  help.push("Press <span class='keys'>[Tab]</span> for auto completion.");
  help.push("Press <span class='keys'>[Esc]</span> to clear the input line.");
  help.push("Press <span class='keys'>[↑][↓]</span> to browse command history.");
  help.push("<br>");
  return help;
};

const buildCompactHelp = (): string[] => {
  const help: string[] = [];
  help.push("<br>");
  help.push("<strong>Commands (Compact View)</strong>");
  compactHelpGroups.forEach((line) => help.push(line));
  help.push("<br>");
  help.push("Use <span class='command'>'help all'</span> to see every command with descriptions.");
  help.push("Press <span class='keys'>[Tab]</span> for auto completion.");
  help.push("Press <span class='keys'>[Esc]</span> to clear the input line.");
  help.push("Press <span class='keys'>[↑][↓]</span> to browse command history.");
  help.push("<br>");
  return help;
};

export const HELP = buildCompactHelp();
export const HELP_ALL = buildFullHelp();
