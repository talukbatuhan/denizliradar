import { getBorsaData } from "@/lib/borsa";

export async function GET() {
  try {
    const data = await getBorsaData();
    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=60",
      },
    });
  } catch {
    return Response.json({ error: "Borsa verisi alınamadı" }, { status: 500 });
  }
}
