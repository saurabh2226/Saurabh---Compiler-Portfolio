import command from '../../config.json' assert {type: 'json'};

type ProjectEntry = [string, string, string, string?];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildProjectCard = (project: ProjectEntry): string => {
  const [title, description, repoLink, liveLink] = project;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const links = [
    `<a href="${repoLink}" target="_blank" rel="noreferrer">GitHub</a>`,
    liveLink ? `<a href="${liveLink}" target="_blank" rel="noreferrer">Live Demo</a>` : "",
  ].filter(Boolean).join(" <span class='project-separator'>|</span> ");
  const label = liveLink ? "Featured Project" : "Project";

  return `
    <span class="project-card${liveLink ? " project-card--featured" : ""}">
      <span class="project-kicker">${label}</span>
      <span class="project-title">${safeTitle}</span>
      <span class="project-description">${safeDescription}</span>
      <span class="project-links">${links}</span>
    </span>
  `.trim();
};

const createProject = () : string[] => {
  const projects : string[] = [];
  const files = `${command.projects.length} File(s)`;

  projects.push("<br>");
  // Keep the project output compact but structured so it reads like a product portfolio.
  command.projects.forEach((ele) => {
    projects.push(buildProjectCard(ele as ProjectEntry));
  });

  projects.push("<br>");
  projects.push(files);
  projects.push("<br>");
  return projects;
};

export const PROJECTS = createProject()
