import command from '../../config.json' assert {type: 'json'};

const createAbout = () : string[] => {
  const about : string[] = [];

  about.push("<br>");
  about.push(`<strong>${command.subtitle}</strong>`);
  about.push(command.aboutGreeting);
  about.push(`Location: ${command.location}`);
  about.push(`Status: ${command.availability}`);
  about.push("<br>");
  about.push("<strong>Highlights</strong>");
  command.highlights.forEach((item) => {
    about.push(`- ${item}`);
  });
  about.push("<br>");
  about.push(`<i class='fa-solid fa-envelope'></i> Email: <a target='_blank' href='mailto:${command.social.email}'>${command.social.email}</a>`);
  about.push(`<i class='fa-brands fa-github'></i> GitHub: <a target='_blank' href='https://github.com/${command.social.github}'>github/${command.social.github}</a>`);
  about.push(`<i class='fa-brands fa-linkedin'></i> LinkedIn: <a target='_blank' href='https://www.linkedin.com/in/${command.social.linkedin}'>linkedin/${command.social.linkedin}</a>`);

  about.push("<br>");
  return about
}

export const ABOUT = createAbout();
