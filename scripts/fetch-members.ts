// scripts/fetch-members.ts
import fs from "fs";
import path from "path";

async function fetchAndSaveMembers() {
  const res = await fetch("https://jkt48.com/api/v1/members?lang=id", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  if (!res.ok) {
    console.error(`Gagal fetch: ${res.status}`);
    process.exit(1);
  }

  const json = await res.json();
  const outputPath = path.join(process.cwd(), "data", "members-cache.json");

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));

  console.log(`✅ Berhasil simpan ${json.data.length} member ke ${outputPath}`);
}

fetchAndSaveMembers();