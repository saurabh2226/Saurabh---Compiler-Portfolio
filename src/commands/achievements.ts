import command from '../../config.json' assert {type: 'json'};

const createAchievement = () : string[] => {
  const achievements : string[] = [];

  achievements.push("<br>")
  achievements.push("<strong>Achievements</strong>")
  command.achievements.forEach((ele) => {
    const listItem = `- ${ele[0]}: ${ele[1]}`;
    achievements.push(listItem);
  });

  achievements.push("<br>");
  return achievements
}

export const ACHIEVEMENTS = createAchievement()
