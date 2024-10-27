import { ReactNode } from 'react';

export default function LocaleToolLayout({
  children,
  params: { locale, slug },
}: {
  children: ReactNode;
  params: { locale: string; slug: string };
}) {
  return <>{children}</>;
}