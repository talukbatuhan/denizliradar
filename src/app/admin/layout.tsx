export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-shell min-h-screen bg-[#0c1524] text-white">{children}</div>
  );
}
