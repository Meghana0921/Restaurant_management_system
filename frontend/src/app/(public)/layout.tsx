export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </main>
  );
} 