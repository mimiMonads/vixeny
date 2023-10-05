export default (s) =>
  ` (a =>a !== -1? (l =>  l !== -1 ? s.slice(a+${s.length + 1},l):s.slice(a+${
    s.length + 1
  },s.length))(s.indexOf("&",a)):null)(s.indexOf("${s + "="}")) `;
