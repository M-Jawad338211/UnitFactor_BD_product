import React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import LeadsIndex from '@/components/dashboard/Leads';
export const metadata = { title: `Leads | Dashboard | ${config.site.name}` } satisfies Metadata;
export default function page() {
  return (
   <LeadsIndex/>
  );
}
