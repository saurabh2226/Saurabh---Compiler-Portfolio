const createSkills = () : string[] => {
  const skills : string[] = [];

  skills.push("<br>");
  skills.push("<strong>Programming Languages:</strong> C, C++, Python, JavaScript, TypeScript, SQL");
  skills.push("<strong>Frameworks & Libraries:</strong> React.js, Node.js, Express.js, Next.js");
  skills.push("<strong>Backend, Databases & APIs:</strong> RESTful APIs, JWT Authentication, Postman, MongoDB, MySQL, Socket.io, Firebase");
  skills.push("<strong>CS Fundamentals:</strong> DSA, OOPs, Operating Systems, Database Management Systems, Computer Networks");
  skills.push("<strong>Dev Tools:</strong> Git, GitHub, VS Code, Linux, Docker (basic), Netlify, Vercel, Render");

  skills.push("<br>");
  return skills;
}

export const SKILLS = createSkills();