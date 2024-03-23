export const tranformDateDay = (dateString) => {
  ///  2024-03-20T15:52:58.843Z  ===>  воскресенье, 20 марта 2024 г.
  const dateObject = new Date(dateString);

  const options = {
    weekday: "long", // Полное название дня недели
    day: "numeric", // День месяца (цифра)
    month: "long", // Полное название месяца
    year: "numeric", // Год (цифра)
  };

  const formattedDate = dateObject.toLocaleDateString("ru-RU", options);

  return formattedDate;
};
