import './globals.css';
import {SITE_URL, commonKeywords} from '../lib/seo';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'ATOMAK Real Estate',
  title: {
    default: 'أتومك للعقارات | بيع وتأجير وإدارة العقارات في أبوظبي',
    template: '%s | أتومك ATOMAK',
  },
  description: 'أتومك للخدمات العقارية في أبوظبي، بني ياس، الرياض، الشامخة والشوامخ والوثبة. فلل سكنية، شقق فاخرة، أراضٍ استثمارية، بيع وشراء وتأجير وإدارة العقارات.',
  keywords: commonKeywords,
  category: 'real estate',
  robots: {index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large'}},
  openGraph: {
    type: 'website',
    siteName: 'أتومك | ATOMAK Real Estate',
    url: SITE_URL,
    locale: 'ar_AE',
    alternateLocale: ['en_AE'],
    images: [{url:'/images/atomak-logo.webp',width:375,height:330,alt:'ATOMAK Real Estate logo'}],
  },
  twitter: {card:'summary_large_image',images:['/images/atomak-logo.webp']},
};
export default function RootLayout({children}) {
  return <html lang="ar" suppressHydrationWarning><body>{children}</body></html>;
}
