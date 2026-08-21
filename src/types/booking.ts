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