const createExperience = () : string[] => {
  const experience : string[] = [];

  experience.push("<br>");
  experience.push("<strong>Sigmoid (Streamvector Technologies Pvt. Ltd.) - Product Engineering Intern</strong>");
  experience.push("Jan 2026 - Present | Whitefield, Bengaluru");
  experience.push("- Completed intensive full-stack engineering training across HTML, CSS, JavaScript (ES6+), React, and Redux with strong focus on responsive architecture.");
  experience.push("- Developed backend services using Node.js, Express.js, FastAPI, JWT/OAuth auth, REST APIs, PostgreSQL, MongoDB, SQLAlchemy ORM, and SQL performance basics.");
  experience.push("<br>");

  experience.push("<strong>Newton School (Incanus Technologies Pvt. Ltd.) - Technical Intern</strong>");
  experience.push("May 2025 - July 2025 | Remote");
  experience.push("- Instructed 100+ students in DSA (C++) and web development, improving coding assessment performance by around 30%.");
  experience.push("- Conducted 25+ live technical sessions, code reviews, and project mentorship for 10+ student teams.");

  experience.push("<br>");
  return experience;
}

export const EXPERIENCE = createExperience();
