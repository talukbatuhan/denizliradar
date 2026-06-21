"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import {
  deleteArticle,
  saveArticle,
  uploadCoverImage,
  type ArticleFormInput,
} from "@/lib/news/queries";

function revalidateSitePaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/gundem");
  revalidatePath("/turkiye");
  revalidatePath("/denizli");
  revalidatePath("/ekonomi");
  revalidatePath("/spor");
  revalidatePath("/egitim");
  revalidatePath("/asayis");
  revalidatePath("/siyaset");
  revalidatePath("/yasam");
  if (slug) revalidatePath(`/haber/${slug}`);
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveArticleAction(input: ArticleFormInput) {
  await requireAdminUser();
  const result = await saveArticle(input);

  if ("error" in result && result.error) {
    return { error: result.error };
  }

  revalidateSitePaths(input.slug);
  revalidatePath("/admin/haberler");
  redirect(`/admin/haberler/${result.id}`);
}

export async function deleteArticleAction(id: string) {
  await requireAdminUser();

  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const result = await deleteArticle(id);

  if ("error" in result && result.error) {
    return { error: result.error };
  }

  revalidateSitePaths(article?.slug);
  revalidatePath("/admin/haberler");
  redirect("/admin/haberler");
}

export async function uploadCoverAction(formData: FormData) {
  await requireAdminUser();
  return uploadCoverImage(formData);
}
