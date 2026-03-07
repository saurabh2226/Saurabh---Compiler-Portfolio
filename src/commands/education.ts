const createEducation = () : string[] => {
  const education : string[] = [];

  education.push("<br>");
  education.push("B.Tech. in Electronics and Instrumentation Engineering");
  education.push("National Institute of Technology, Agartala | CGPA: 7.0 | 2022 - 2026");
  education.push("<br>");
  education.push("Senior Secondary (XII)");
  education.push("JD Public School, Chapra | Percentage: 76% | 2019 - 2021");
  education.push("<br>");
  education.push("Secondary (X)");
  education.push("Chapra Central School, Chapra | Percentage: 87% | 2017 - 2019");
  education.push("<br>");

  return education;
}

export const EDUCATION = createEducation();