export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen border border-red-400 p-4">{children}</main>
  );
}
