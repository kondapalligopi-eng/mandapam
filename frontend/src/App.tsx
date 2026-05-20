import type { RouteRecord } from 'vite-react-ssg';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Mandapams } from '@/pages/Mandapams';
import { MandapamDetail } from '@/pages/MandapamDetail';
import { Categories } from '@/pages/Categories';
import { ServiceCategory } from '@/pages/ServiceCategory';
import { ListBusiness } from '@/pages/ListBusiness';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { MANDAPAMS } from '@/data/mandapams';
import { SERVICES } from '@/data/services';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, Component: Home },
      { path: 'mandapams', Component: Mandapams },
      {
        path: 'mandapams/:slug',
        Component: MandapamDetail,
        // Pre-render a static page for every mandapam at build time.
        getStaticPaths: () => MANDAPAMS.map((m) => `/mandapams/${m.slug}`),
      },
      { path: 'categories', Component: Categories },
      {
        path: 'services/:category',
        Component: ServiceCategory,
        // Pre-render a static page for every service category at build time.
        getStaticPaths: () => Object.keys(SERVICES).map((slug) => `/services/${slug}`),
      },
      { path: 'list-your-business', Component: ListBusiness },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
    ],
  },
];
