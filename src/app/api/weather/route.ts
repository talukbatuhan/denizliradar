import { getDenizliWeather } from "@/lib/weather";

export async function GET() {
  try {
    const data = await getDenizliWeather();
    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch {
    return Response.json({ error: "Hava durumu alınamadı" }, { status: 500 });
  }
}
