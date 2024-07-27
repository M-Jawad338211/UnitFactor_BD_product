import React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';

export const metadata = { title: `Business Developer | Dashboard | ${config.site.name}` } satisfies Metadata;
export default function page() {
  return (
    <div>
      <h1>Busines Developer</h1>
    </div>
  );
}
