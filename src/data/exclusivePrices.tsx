// data/exclusivePrices.ts

function toCode(name: string) {
  return name.trim().toUpperCase().replace(/\s+/g, "_");
}

type PriceTuple = [string, number];

// ---- 2 Shot per Team ----
const twoShotLove: PriceTuple[] = [
  ["Michelle Alexandra", 90000],
  ["Hillary Abigail", 90000],
  ["Fiony Alveria", 80000],
  ["Grace Octaviani", 80000],
  ["Aurhel Alana", 70000],
  ["Indah Cahya", 70000],
  ["Aurellia", 60000],
  ["Cathleen Nixie", 60000],
  ["Jazzlyn Trisha", 60000],
  ["Fritzy Rosmerian", 50000],
  ["Cynthia Yaputera", 50000],
  ["Celline Thefani", 50000],
  ["Nayla Suji", 50000],
  ["Alya Amanda", 50000],
  ["Anindya Ramadhani", 50000],
];

const twoShotDream: PriceTuple[] = [
  ["Freya Jayawardana", 100000],
  ["Marsha Lenathea", 100000],
  ["Oline Manuel", 90000],
  ["Adeline Wijaya", 90000],
  ["Gabriela Abigail", 80000],
  ["Greesella Adhalia", 80000],
  ["Gita Sekar Andarini", 70000],
  ["Febriola Sinambela", 60000],
  ["Helisma Putri", 60000],
  ["Jesslyn Elly", 50000],
  ["Nina Tutachia", 50000],
  ["Shabilqis Naila", 50000],
  ["Chelsea Davina", 50000],
  ["Gendis Mayrannisa", 50000],
];

const twoShotPassion: PriceTuple[] = [
  ["Abigail Rachel", 100000],
  ["Angelina Christy", 100000],
  ["Catherina Vallencia", 100000],
  ["Cornelia Vanisa", 70000],
  ["Mutiara Azzahra", 70000],
  ["Jessica Chandra", 70000],
  ["Kathrina Irene", 70000],
  ["Lulu Salsabila", 60000],
  ["Michelle Levia", 50000],
  ["Raisha Syifa", 50000],
  ["Ribka Budiman", 50000],
  ["Victoria Kimberly", 50000],
  ["Dena Natalia", 50000],
  ["Desy Natalia", 50000],
];

// ---- MnG per Team ----
const mngLove: PriceTuple[] = [
  ["Michelle Alexandra", 70000],
  ["Hillary Abigail", 70000],
  ["Aurhel Alana", 60000],
  ["Fiony Alveria", 60000],
  ["Indah Cahya", 60000],
  ["Grace Octaviani", 60000],
  ["Aurellia", 60000],
  ["Cathleen Nixie", 50000],
  ["Celline Thefani", 50000],
  ["Fritzy Rosmerian", 40000],
  ["Cynthia Yaputera", 40000],
  ["Jazzlyn Trisha", 40000],
  ["Nayla Suji", 40000],
  ["Alya Amanda", 40000],
  ["Anindya Ramadhani", 40000],
];

const mngDream: PriceTuple[] = [
  ["Adeline Wijaya", 70000],
  ["Freya Jayawardana", 70000],
  ["Marsha Lenathea", 70000],
  ["Oline Manuel", 70000],
  ["Gabriela Abigail", 60000],
  ["Gita Sekar Andarini", 60000],
  ["Greesella Adhalia", 60000],
  ["Febriola Sinambela", 50000],
  ["Helisma Putri", 50000],
  ["Jesslyn Elly", 40000],
  ["Nina Tutachia", 40000],
  ["Shabilqis Naila", 40000],
  ["Chelsea Davina", 40000],
  ["Gendis Mayrannisa", 40000],
];

const mngPassion: PriceTuple[] = [
  ["Catherina Vallencia", 80000],
  ["Abigail Rachel", 70000],
  ["Angelina Christy", 70000],
  ["Cornelia Vanisa", 60000],
  ["Mutiara Azzahra", 50000],
  ["Jessica Chandra", 50000],
  ["Kathrina Irene", 50000],
  ["Lulu Salsabila", 50000],
  ["Michelle Levia", 40000],
  ["Raisha Syifa", 40000],
  ["Ribka Budiman", 40000],
  ["Victoria Kimberly", 40000],
  ["Dena Natalia", 40000],
  ["Desy Natalia", 40000],
];

// ---- VC (harga flat per tier, lintas team) ----
const vcTier20000 = [
  "Afera Thalia",
  "Alya Amanda",
  "Anindya Ramadhani",
  "Astrella Virgiananda",
  "Aulia Riza",
  "Bong Aprilli",
  "Carissa Dini",
  "Celline Thefani",
  "Christabella Bonita",
  "Cynthia Yaputera",
  "Dena Natalia",
  "Desy Natalia",
  "Fahira Putri",
  "Fatimah Azzahra",
  "Fritzy Rosmerian",
  "Hagia Sopia",
  "Heidi Suyangga",
  "Humaira Ramadhani",
  "Jesslyn Elly",
  "Maxine Faye",
  "Nayla Suji",
  "Putry Jazyta",
  "Raisha Syifa",
  "Ralyne Van Irwan",
  "Ribka Budiman",
  "Shabilqis Naila",
  "Sona Kalyana",
  "Victoria Kimberly",
];

const vcTier30000 = [
  "Aurellia",
  "Cathleen Nixie",
  "Febriola Sinambela",
  "Helisma Putri",
  "Jacqueline Immanuela",
  "Jazzlyn Trisha",
  "Jemima Evodie",
  "Jessica Chandra",
  "Kathrina Irene",
  "Lulu Salsabila",
  "Mikaela Kusjanto",
  "Michelle Levia",
  "Mutiara Azzahra",
  "Nina Tutachia",
];

const vcTier40000 = [
  "Aurhel Alana",
  "Cornelia Vanisa",
  "Fiony Alveria",
  "Gabriela Abigail",
  "Gita Sekar",
  "Grace Octaviani",
  "Greesella Adhalia",
  "Indah Cahya",
  "Nur Intan",
];

const vcTier50000 = [
  "Adeline Wijaya",
  "Abigail Rachel",
  "Angelina Christy",
  "Catherina Vallencia",
  "Freya Jayawardana",
  "Hillary Abigail",
  "Marsha Lenathea",
  "Michelle Alexandra",
  "Oline Manuel",
];

export interface ExclusivePrice {
  vc: number;
  twoShot: number;
  mng: number;
}

const priceMap: Record<string, Partial<ExclusivePrice>> = {};

function setPrice(name: string, key: keyof ExclusivePrice, value: number) {
  const code = toCode(name);
  priceMap[code] = { ...priceMap[code], [key]: value };
}

[...twoShotLove, ...twoShotDream, ...twoShotPassion].forEach(([name, price]) =>
  setPrice(name, "twoShot", price),
);
[...mngLove, ...mngDream, ...mngPassion].forEach(([name, price]) =>
  setPrice(name, "mng", price),
);
vcTier20000.forEach((name) => setPrice(name, "vc", 20000));
vcTier30000.forEach((name) => setPrice(name, "vc", 30000));
vcTier40000.forEach((name) => setPrice(name, "vc", 40000));
vcTier50000.forEach((name) => setPrice(name, "vc", 50000));

// Harga flat untuk member yang tidak ada di daftar manapun (mis. TRAINEE)
const FLAT_PRICE: ExclusivePrice = { vc: 40000, twoShot: 40000, mng: 40000 };

export function getExclusivePrice(code: string): ExclusivePrice {
  const found = priceMap[code];
  return {
    vc: found?.vc ?? FLAT_PRICE.vc,
    twoShot: found?.twoShot ?? FLAT_PRICE.twoShot,
    mng: found?.mng ?? FLAT_PRICE.mng,
  };
}
