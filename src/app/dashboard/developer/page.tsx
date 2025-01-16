import React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import DevelopersIndex from '@/components/dashboard/developer';

export default function page() {
  return (
   <DevelopersIndex/>
  );
}
