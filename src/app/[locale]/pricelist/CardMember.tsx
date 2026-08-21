// CardMember.tsx
import MemberGrid from "./MemberGrid";
// import membersData from "../../../../data/members-cache.json";

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

async function getMembers(): Promise<JKT48Member[]> {
  try {
    console.log("🔍 [FETCH START] Mencoba fetch ke jkt48.com...");

    const res = await fetch("https://jkt48.com/api/v1/members?lang=id", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      signal: AbortSignal.timeout(5000),
    });

    console.log("📡 [STATUS]", res.status, res.statusText);

    const rawText = await res.text();
    console.log("📄 [RAW RESPONSE - 300 char pertama]", rawText.slice(0, 300));

    if (!res.ok) {
      throw new Error(`API gagal: ${res.status}`);
    }

    const json = JSON.parse(rawText);
    console.log(
      "✅ [PARSED] Jumlah data:",
      json.data?.length ?? "field 'data' tidak ada",
    );

    if (!json.data || json.data.length === 0) {
      throw new Error("Data kosong dari API");
    }

    return json.data;
  } catch (error) {
    console.error("❌ [FETCH GAGAL]", error);
    return [];
  }
}

export default async function CardMember() {
  const members = await getMembers();
  return (
    <MemberGrid
      members={members}
      prices={memberPrices}
      defaultPrice={defaultPrice}
    />
  );
}
