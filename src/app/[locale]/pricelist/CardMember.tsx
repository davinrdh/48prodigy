import MemberGrid from "./MemberGrid";

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

async function getMembers(): Promise<JKT48Member[]> {
  try {
    const res = await fetch("https://jkt48.com/api/v1/members?lang=id", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        Referer: "https://jkt48.com/",
        Origin: "https://jkt48.com",
        "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120"',
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
    });
    if (!res.ok) throw new Error(`Gagal: ${res.status}`);
    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error("FETCH ERROR DETAIL:", error);
    throw error;
  }
}

const memberPrices: Record<string, MemberPrice> = {
  ABIGAIL_RACHEL: { vc: 150000, twoShot: 300000, mng: 100000 },
  ADELINE_WIJAYA: { vc: 150000, twoShot: 300000, mng: 100000 },
  // ... member lain
};

const defaultPrice: MemberPrice = { vc: 150000, twoShot: 300000, mng: 100000 };

export default async function CardMember() {
  const members = await getMembers();
  return <MemberGrid members={members} prices={memberPrices} defaultPrice={defaultPrice} />;
}