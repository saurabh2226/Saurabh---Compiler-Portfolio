const createExperience = () : string[] => {
  const experience : string[] = [];

  experience.push("<br>");
  experience.push("<strong>Sigmoid (Streamvector Technologies Pvt. Ltd.) - Product Engineering Intern</strong>");
  experience.push("Jan 2026 - Present | Whitefield, Bengaluru");
  experience.push("<ul>");
  experience.push("<li>Completed intensive Full Stack Engineering training covering HTML, CSS, JavaScript (ES6+), React, Redux, building responsive applications with modern frontend architecture and performance optimization.</li>");
  experience.push("<li>Developed scalable backend services using Node.js, Express.js, FastAPI with JWT/OAuth authentication, REST APIs, and worked with PostgreSQL, MongoDB, SQLAlchemy ORM, advanced SQL, indexing, and Big Data fundamentals.</li>");
  experience.push("</ul>");

  experience.push("<strong>Newton School (Incanus Technologies Pvt. Ltd.) - Technical Intern</strong>");
  experience.push("May 2025 - July 2025 | Remote");
  experience.push("<ul>");
  experience.push("<li>Instructed 100+ junior students in Data Structures & Algorithms (C++) and web development (HTML, CSS, JavaScript, React), leading to a 30% average improvement in coding assessment scores.</li>");
  experience.push("<li>Conducted 25+ live sessions and technical doubt-solving hours, delivered code reviews, and guided 10+ student projects, enhancing their hands-on development skills.</li>");
  experience.push("</ul>");

  experience.push("<br>");
  return experience;
}

export const EXPERIENCE = createExperience();