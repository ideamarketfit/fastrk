import { ReactNode } from 'react';

export default function ToolLayout({
  children,
  params: {},  // Remove slug destructuring since it's unused
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
