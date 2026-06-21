# Denizli Radar — Supabase & CMS Kurulumu

Bu rehber, haber sitesini Supabase veritabanına ve `/admin` CMS paneline bağlamak için gereken adımları anlatır.

## 1. Supabase projesi oluşturun

1. [https://supabase.com/dashboard](https://supabase.com/dashboard) adresine gidin
2. **New project** ile proje oluşturun
3. **Project Settings → API** bölümünden şunları kopyalayın:
   - **Project URL**
   - **Publishable key** (anon/public key)

## 2. Ortam değişkenlerini ayarlayın

Proje kökünde `.env.local` oluşturun:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...
```

Vercel deploy için aynı değişkenleri Vercel → Settings → Environment Variables bölümüne ekleyin.

## 3. Veritabanı şemasını uygulayın

**Seçenek A — Supabase SQL Editor (en kolay)**

1. Supabase Dashboard → **SQL Editor**
2. `supabase/migrations/20260321000000_initial_schema.sql` dosyasının tamamını yapıştırın
3. **Run** ile çalıştırın

**Seçenek B — Supabase CLI**

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Bu migration şunları oluşturur:

- `categories`, `articles`, `profiles` tabloları
- RLS politikaları
- `article-covers` storage bucket
- 9 kategori seed verisi

## 4. İlk editör hesabını oluşturun

1. Supabase Dashboard → **Authentication → Users**
2. **Add user** → e-posta + şifre ile kullanıcı oluşturun
3. Kullanıcı otomatik olarak `profiles` tablosuna `editor` rolüyle eklenir

**İlk admin yapmak için** SQL Editor'da:

```sql
update public.profiles
set role = 'admin'
where id = 'KULLANICI-UUID-BURAYA';
```

UUID'yi Authentication → Users listesinden kopyalayın.

## 5. CMS paneline giriş

1. `npm run dev`
2. Tarayıcıda `/admin/login` adresine gidin
3. Oluşturduğunuz e-posta/şifre ile giriş yapın
4. **Yeni Haber** ile içerik ekleyin

## 6. Ana sayfa yerleşimi

Haber formunda **Ana Sayfa Yerleşimi** alanı:

| Değer | Nerede görünür |
|--------|----------------|
| Slider (Top Story) | Ana slider |
| Slider Yan Kutu | Hero sağ 3 kutu |
| Ana Grid | Ana sayfa 3'lü grid |
| Türkiye Öne Çıkan | Türkiye bölümü büyük kart |
| Türkiye Yan Kutular | Türkiye sağ 2×2 kutular |

Durum **Yayında** olmayan haberler sitede görünmez.

## 7. Kapak görseli

- CMS formundan dosya yükleyin (Supabase Storage)
- veya doğrudan görsel URL'si yapıştırın

## Sorun giderme

| Sorun | Çözüm |
|--------|--------|
| CMS giriş yapamıyorum | Auth'ta kullanıcı var mı, `.env.local` doğru mu kontrol edin |
| Haber kaydedilemiyor | `profiles` tablosunda kullanıcınız var mı, rol `editor`/`admin` mi |
| Görseller yüklenmiyor | Storage bucket `article-covers` oluşmuş mu, RLS politikaları uygulandı mı |
| Site boş | Haberlerin durumu **Yayında** olmalı; ana sayfa slotları atanmış olmalı |
