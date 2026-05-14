import type { RouteRecord } from 'vite-react-ssg';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Mandapams } from '@/pages/Mandapams';
import { MandapamDetail } from '@/pages/MandapamDetail';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, Component: Home },
      { path: 'mandapams', Component: Mandapams },
      { path: 'mandapams/:slug', Component: MandapamDetail },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
    ],
  },
];
