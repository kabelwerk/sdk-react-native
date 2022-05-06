// datetime → DD.MM.YYYY string
const toDateString = function (d) {
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const date = d.getDate().toString().padStart(2, '0');

  return `${date}.${month}.${d.getFullYear()}`;
};

// datetime → HH:MM string
const toTimeString = function (d) {
  return d.toTimeString().substring(0, 5);
};

export { toDateString, toTimeString };
