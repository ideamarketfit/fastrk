import { ReactNode } from 'react';
import { HreflangTags } from '@/components/hreflang-tags';

export default function ToolLayout({
  children,
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  return (
    <html lang="en">
      <head>
        <HreflangTags />
      </head>
      <body>{children}</body>
    </html>
  );
}