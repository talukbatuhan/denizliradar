import { NextResponse } from "next/server";
import {
  fetchPublishedArticles,
  searchPublishedArticles,
} from "@/lib/news/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  const results = query.trim()
    ? await searchPublishedArticles(query)
    : await fetchPublishedArticles({ limit: 6 });

  return NextResponse.json(results);
}
