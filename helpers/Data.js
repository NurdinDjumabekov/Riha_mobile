export const dataCategory = [
  {
    codeid: 1,
    name: "Мои заявки",
    link: "Application",
    img: "https://img.freepik.com/free-photo/hand-holding-and-writing-checklist-application-form-document-on-clipboard-on-white-background-3d-illustration_56104-1551.jpg?w=900&t=st=1710666284~exp=1710666884~hmac=35f51750850c07ddee98085c0d060a6b6dfb2c9239b9782656c51a3157ded15c",
    pathApi: "Application",
  },
  {
    codeid: 2,
    name: "Приходы",
    link: "Comming",
    img: "https://img.freepik.com/free-photo/3d-render-of-paper-clipboard-with-green-tick_107791-15840.jpg?t=st=1710666268~exp=1710666868~hmac=cc6f2e56021a30cba97967879fbfd136f530c326ed8440f14d2c5b306459ee0b",
    pathApi: "",
  },
  {
    codeid: 3,
    name: "Остатки",
    link: "Remainder",
    img: "",
    pathApi: "Remainder",
  },
  {
    codeid: 4,
    name: "Реализация",
    link: "Realiz",
    img: "",
    pathApi: "Realiz",
  },
  {
    codeid: 5,
    name: "Деньги",
    link: "Money",
    img: "",
    pathApi: "Money",
  },
  {
    codeid: 6,
    name: "Запросы",
    link: "Request",
    img: "",
    pathApi: "Request",
  },
];

export const listMyApplicationData = [
  {
    codeid: 1,
    who: "Нурдин Джумабеков",
    date: "17.03.2024",
    status: 0,
    list: [
      {
        codeid: 1,
        name: "Сырная колбаса",
        kol: 4.4,
        ves: 10,
        type: "кг",
      },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 20, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 4, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 5, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 6, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 7, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
    ],
  },
  {
    codeid: 2,
    who: "Садирдинов Руслан",
    date: "18.03.2024",
    status: 1,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
  {
    codeid: 3,
    who: "Дубанаева Элнура",
    date: "19.03.2024",
    status: 0,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
  {
    codeid: 4,
    who: "Алиев Баатыр",
    date: "20.03.2024",
    status: 1,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
];

export const listPrihod = [
  {
    codeid: 1,
    who: "Нурдин Джумабеков",
    whom: "Садирдинов Руслан",
    date: "17.03.2024",
    status: 0,
    list: [
      {
        codeid: 1,
        name: "Сырная колбаса",
        kol: 4.4,
        ves: 10,
        type: "кг",
      },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 20, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 4, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 5, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 6, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
      { codeid: 7, name: "Докторская колбаса", kol: 6.1, ves: 5, type: "кг" },
    ],
  },
  {
    codeid: 2,
    who: "Садирдинов Руслан",
    whom: "Нурдин Джумабеков",
    date: "18.03.2024",
    status: 1,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
  {
    codeid: 3,
    who: "Дубанаева Элнура",
    whom: "Садирдинов Руслан",
    date: "19.03.2024",
    status: 0,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
  {
    codeid: 4,
    who: "Алиев Баатыр",
    whom: "Садирдинов Руслан",
    date: "20.03.2024",
    status: 1,
    list: [
      { codeid: 1, name: "Сырная колбаса", kol: 4.4, ves: 10, type: "кг" },
      { codeid: 2, name: "Эстонская колбаса ", kol: 10.5, ves: 10, type: "кг" },
      { codeid: 3, name: "Докторская колбаса", kol: 6.1, ves: 10, type: "кг" },
    ],
  },
];
