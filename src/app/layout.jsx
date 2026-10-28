import './globals.css';
export const metadata = {
  title: 'أتومك | ATOMAK — عقارك أمانتنا',
  description: 'أتومك لخدمات تأجير وإدارة العقارات الخاصة في أبوظبي، بني ياس، الرياض، الشامخة، الشوامخ، والوثبة. ATOMAK Private Property Rental & Management Services.',
  keywords: ['أتومك','ATOMAK','عقارات أبوظبي','تأجير عقارات','إدارة العقارات','Abu Dhabi real estate','Property management'],
  openGraph: { title:'ATOMAK | أتومك', description:'عقارك أمانتنا | Your property, our responsibility', type:'website', locale:'ar_AE' },
};
export default function RootLayout({children}) {return <html suppressHydrationWarning><body>{children}</body></html>}
