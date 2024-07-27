import React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';

export const metadata = { title: `Permission | Dashboard | ${config.site.name}` } satisfies Metadata;
export default function page() {
  return (
    <div>
      <h1>Permission</h1>
    </div>
  );
}
