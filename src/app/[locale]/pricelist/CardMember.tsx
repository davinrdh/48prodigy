// CardMember.tsx
import MemberGrid from "./MemberGrid";
import membersData from "../../../../data/members-cache.json";

interface JKT48Member {
  type: string;
  code: string;
  name: string;
  nickname: string;
  photo: string;
  jkt48_member_id: number;
}

interface MemberPrice {
  vc: number;
  twoShot: number;
  mng: number;
}

const memberPrices: Record<string, MemberPrice> = {
  ABIGAIL_RACHEL: { vc: 150000, twoShot: 300000, mng: 100000 },
  ADELINE_WIJAYA: { vc: 150000, twoShot: 300000, mng: 100000 },
  // ...member lain
};

const defaultPrice: MemberPrice = { vc: 150000, twoShot: 300000, mng: 100000 };

export default async function CardMember() {
  const members: JKT48Member[] = membersData.data ?? [];
  return <MemberGrid members={members} prices={memberPrices} defaultPrice={defaultPrice} />;
}