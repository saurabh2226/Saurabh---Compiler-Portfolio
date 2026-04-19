import command from '../config.json' assert { type: 'json' };

(() => {
  const root = document.documentElement;
  const style = document.createElement('style');

  root.style.setProperty("--bg", command.colors.background);
  root.style.setProperty("--text", command.colors.foreground);
  root.style.setProperty("--banner", command.colors.banner);
  root.style.setProperty("--border", command.colors.border.color);
  root.style.setProperty("--prompt-default", command.colors.prompt.default);
  root.style.setProperty("--prompt-user", command.colors.prompt.user);
  root.style.setProperty("--prompt-host", command.colors.prompt.host);
  root.style.setProperty("--prompt-input", command.colors.prompt.input);
  root.style.setProperty("--link", command.colors.link.text);
  root.style.setProperty("--link-highlight-bg", command.colors.link.highlightColor);
  root.style.setProperty("--link-highlight-text", command.colors.link.highlightText);
  root.style.setProperty("--command", command.colors.commands.textColor);
  root.style.setProperty("--keys", command.colors.banner);

  if (!command.colors.border.visible) {
    style.textContent = "#bars {display:none;} main {border:none;}";
  }

  document.head.appendChild(style);
  document.title = command.title;
})();
