import { City, Province } from "./geography.model.ts";

export function getProviences() {
  // get Iran provience
  return <Province[]>[
    {
      "id": 0,
      "order": 0,
      "name": "آذربایجان شرقی"
    },
    {
      "id": 1,
      "order": 1,
      "name": "آذربایجان غربی"
    },
    {
      "id": 2,
      "order": 2,
      "name": "اردبیل"
    },
    {
      "id": 3,
      "order": 3,
      "name": "اصفهان"
    },
    {
      "id": 4,
      "order": 4,
      "name": "البرز"
    },
    {
      "id": 5,
      "order": 5,
      "name": "ایلام"
    },
    {
      "id": 6,
      "order": 6,
      "name": "بوشهر"
    },
    {
      "id": 7,
      "order": 7,
      "name": "تهران"
    },
    {
      "id": 8,
      "order": 8,
      "name": "چهارمحال و بختیاری"
    },
    {
      "id": 9,
      "order": 9,
      "name": "خراسان جنوبی"
    },
    {
      "id": 10,
      "order": 10,
      "name": "خراسان رضوی"
    },
    {
      "id": 11,
      "order": 11,
      "name": "خراسان شمالی"
    },
    {
      "id": 12,
      "order": 12,
      "name": "خوزستان"
    },
    {
      "id": 13,
      "order": 13,
      "name": "زنجان"
    },
    {
      "id": 14,
      "order": 14,
      "name": "سمنان"
    },
    {
      "id": 15,
      "order": 15,
      "name": "سیستان و بلوچستان"
    },
    {
      "id": 16,
      "order": 16,
      "name": "فارس"
    },
    {
      "id": 17,
      "order": 17,
      "name": "قزوین"
    },
    {
      "id": 18,
      "order": 18,
      "name": "قم"
    },
    {
      "id": 19,
      "order": 19,
      "name": "گلستان"
    },
    {
      "id": 20,
      "order": 20,
      "name": "گیلان"
    },
    {
      "id": 21,
      "order": 21,
      "name": "لرستان"
    },
    {
      "id": 22,
      "order": 22,
      "name": "مازندران"
    },
    {
      "id": 23,
      "order": 23,
      "name": "مرکزی"
    },
    {
      "id": 24,
      "order": 24,
      "name": "هرمزگان"
    },
    {
      "id": 25,
      "order": 25,
      "name": "همدان"
    },
    {
      "id": 26,
      "order": 26,
      "name": "کردستان"
    },
    {
      "id": 27,
      "order": 27,
      "name": "کرمان"
    },
    {
      "id": 28,
      "order": 28,
      "name": "کرمانشاه"
    },
    {
      "id": 29,
      "order": 29,
      "name": "کهگیلویه و بویراحمد"
    },
    {
      "id": 30,
      "order": 30,
      "name": "یزد"
    }
  ];
}

export function getCities() {
  return <City[]>[
    {
      id: 1,
      name: "مشهد",
      provinceId: 10,
      order: 1
    },
    {
      id: 2,
      name: "تربت حیدریه",
      provinceId: 10,
      order: 2
    },
    {
      id: 3,
      name: "سبزوار",
      provinceId: 10,
      order: 3
    },
    {
      id: 4,
      name: "نیشابور",
      provinceId: 10,
      order: 4
    },
    {
      id: 5,
      name: "کاشمر",
      provinceId: 10,
      order: 5
    },
    {
      id: 6,
      name: "گناباد",
      provinceId: 10,
      order: 6
    },
    {
      id: 7,
      name: "فریمان",
      provinceId: 10,
      order: 7
    },
    {
      id: 8,
      name: "خواف",
      provinceId: 10,
      order: 8
    },
    {
      id: 9,
      name: "درگز",
      provinceId: 10,
      order: 9
    },
    {
      id: 10,
      name: "چناران",
      provinceId: 10,
      order: 10
    }
  ];
}

export function getCitiesOfProvince(provinceId: number) {
  return getCities().filter(city => city.provinceId === provinceId);
}