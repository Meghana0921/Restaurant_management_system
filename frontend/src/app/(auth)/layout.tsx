'use client';

import Navigation from '@/components/Navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main style={{ marginTop: '64px', padding: '24px' }}>
        {children}
      </main>
    </>
  );
} 