import command from '../../config.json' assert {type: 'json'};

const createSummary = () : string[] => {
  const summary : string[] = [];
  const totalProjects = command.projects.length;
  const totalAchievements = command.achievements.length;

  summary.push("<br>");
  summary.push("<strong>Quick Snapshot</strong>");
  summary.push(`Projects built      : ${totalProjects}+`);
  summary.push(`Achievements listed : ${totalAchievements}`);
  summary.push(`Competitive profile : LeetCode 600+ solved | Codeforces 450+ solved`);
  summary.push(`Current location    : ${command.location}`);
  summary.push(`Availability        : ${command.availability}`);
  summary.push("<br>");
  summary.push("Use <span class='command'>'projects'</span>, <span class='command'>'experience'</span>, and <span class='command'>'contact'</span> for details.");
  summary.push("<br>");

  return summary;
}

export const SUMMARY = createSummary();
