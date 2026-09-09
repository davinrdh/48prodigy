// lib/getScheduleImages.ts
import type { ExclusiveType } from "@/types/booking";

interface DriveFile {
  id: string;
  name: string;
}

const folderIdByType: Record<ExclusiveType, string | undefined> = {
  vc: process.env.GOOGLE_DRIVE_FOLDER_VC,
  twoShot: process.env.GOOGLE_DRIVE_FOLDER_TWOSHOT,
  mng: process.env.GOOGLE_DRIVE_FOLDER_MNG,
};

export async function getScheduleImageIds(type: ExclusiveType): Promise<string[]> {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  const folderId = folderIdByType[type];

  // Tambahkan validasi ketat untuk folderId
  if (!apiKey || !folderId || folderId === "undefined") {
    console.error(`Config Drive untuk tipe "${type}" belum lengkap atau folderId bernilai undefined`);
    return [];
  }

  try {
    // Perbaiki format query string Google Drive API
    const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name)&orderBy=name`;

    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Gagal fetch daftar file Drive:", res.status, errorBody);
      return [];
    }

    const data = await res.json();
    const files: DriveFile[] = data.files ?? [];

    return files.map((file) => file.id);
  } catch (error) {
    console.error("Error fetch Drive folder:", error);
    return [];
  }
}

export function getDriveImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}