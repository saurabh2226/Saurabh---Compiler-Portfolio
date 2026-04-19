import command from '../../config.json' assert {type: 'json'};

const createContact = () : string[] => {
  const contact : string[] = [];

  contact.push("<br>");
  contact.push("<strong>Let's connect</strong>");
  contact.push(`Email      : <a target='_blank' href='mailto:${command.social.email}'>${command.social.email}</a>`);
  contact.push(`GitHub     : <a target='_blank' href='https://github.com/${command.social.github}'>github/${command.social.github}</a>`);
  contact.push(`LinkedIn   : <a target='_blank' href='https://www.linkedin.com/in/${command.social.linkedin}'>linkedin/${command.social.linkedin}</a>`);
  contact.push(`LeetCode   : <a target='_blank' href='https://leetcode.com/u/${command.social.leetcode}/'>leetcode/${command.social.leetcode}</a>`);
  contact.push(`Codeforces : <a target='_blank' href='https://codeforces.com/profile/${command.social.codeforces}'>codeforces/${command.social.codeforces}</a>`);
  contact.push("<br>");

  return contact;
}

export const CONTACT = createContact();
