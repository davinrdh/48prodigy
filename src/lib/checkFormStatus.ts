// lib/checkFormStatus.ts

export async function checkFormOpenStatus(formUrl: string): Promise<boolean> {
  try {
    const res = await fetch(formUrl, {
      cache: 'no-store',
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!res.ok) return true;

    if (res.url.includes("/closedform")) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Gagal cek status form:", error);
    return true;
  }
}