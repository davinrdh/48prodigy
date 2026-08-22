// types/booking.ts
export interface JKT48Member {
  type: string;
  code: string;
  name: string;
  nickname: string;
  photo: string;
  jkt48_member_id: number;
}

export type ExclusiveType = "vc" | "twoShot" | "mng";

export interface MemberOrderItem {
  memberCode: string;
  sesi: string;
  jumlahTiket: number;
}

export interface ExclusiveBookingForm {
  items: MemberOrderItem[];
  email: string;
  password: string;
  noWa: string;
}

export interface JKT48ConcertForm {
  kategoriKursi: string;
  jumlahTiket: number;
  namaLengkap: string;
  email: string;
  noHp: string;
}
export interface GeneralConcertForm {
  namaEvent: string;
  namaLengkap: string;
  email: string;
  noHp: string;
  noKtp: string;
}

export interface CartItem {
  id: string; // untuk key React & keperluan hapus item
  member: JKT48Member;
  tanggal: string;
  sesi: string;
  jumlahTiket: number;
}

export const maxSameMemberByType: Record<ExclusiveType, number> = {
  vc: 5,
  mng: 2,
  twoShot: 1,
};

export const maxTiketByType: Record<ExclusiveType, number> = {
  vc: 5,
  mng: 20,
  twoShot: 1,
};
