import command from '../../config.json' assert {type: 'json'};

const createNow = () : string[] => {
  const now : string[] = [];

  now.push("<br>");
  now.push("<strong>What I'm focused on right now</strong>");
  command.currentlyLearning.forEach((item) => {
    now.push(`- ${item}`);
  });
  now.push("<br>");

  return now;
}

export const NOW = createNow();
