export const SITE_URL = 'https://atomakrealestate.ae';
export const socialProfiles = {
  facebook: 'https://www.facebook.com/atomakrealestate',
  instagram: 'https://www.instagram.com/atomakrealestate/',
  tiktok: 'https://www.tiktok.com/@atomakrealestate',
};
export const commonKeywords = [
  'أتومك','ATOMAK','عقارات أبوظبي','عقارات بابوظبي','عقارات بني ياس','عقارات الرياض أبوظبي',
  'عقارات الشامخة','عقارات الشوامخ','عقارات الوثبة','فلل سكنية','فلل استثمارية',
  'فلل تجارية','شقق فاخرة','شقق للبيع أبوظبي','أراضي استثمارية','اراضي استثمار',
  'إيجار عقارات','ايجار فلل أبوظبي','بيع عقارات','شراء عقارات','إدارة العقارات',
  'عقارات للإيجار','Abu Dhabi real estate','Abu Dhabi properties','Bani Yas real estate',
  'Al Riyadh Abu Dhabi properties','Al Shamkha villas','Al Shawamekh property',
  'Al Wathba real estate','luxury apartments Abu Dhabi','residential villas Abu Dhabi',
  'investment villas UAE','investment land Abu Dhabi','commercial property Abu Dhabi',
  'property rental Abu Dhabi','property sales Abu Dhabi','property management Abu Dhabi',
];
const pages = {
  home: {
    ar: {title:'عقارات أبوظبي وبني ياس | فلل وشقق وتأجير وإدارة عقارات',description:'أتومك للعقارات في أبوظبي وبني ياس والرياض والشامخة والشوامخ والوثبة. استفسر عن الفلل السكنية والاستثمارية، الشقق الفاخرة، الأراضي الاستثمارية، البيع والشراء والتأجير وإدارة العقارات.'},
    en: {title:'Abu Dhabi Real Estate | Villas, Apartments & Property Management',description:'ATOMAK Real Estate offers property rental, sales, purchases and management services in Abu Dhabi, Bani Yas, Al Riyadh, Al Shamkha, Al Shawamekh and Al Wathba.'},
  },
  about: {
    ar: {title:'عن أتومك | شركة تأجير وإدارة عقارات في أبوظبي',description:'تعرّف على شركة أتومك لخدمات تأجير وإدارة العقارات الخاصة في أبوظبي، ورؤيتنا لخدمة الملاك والمستأجرين وبناء علاقات عقارية قائمة على الثقة.'},
    en: {title:'About ATOMAK | Abu Dhabi Real Estate & Property Management',description:'Learn about ATOMAK and our approach to private property rental, tenant support and real estate management services throughout Abu Dhabi.'},
  },
  properties: {
    ar: {title:'الأقسام العقارية | فلل وشقق وأراضٍ استثمارية في أبوظبي',description:'استكشف الأقسام العقارية لدى أتومك: فلل سكنية واستثمارية، شقق فاخرة، أراضٍ استثمارية، مكاتب تجارية، وفرص بيع وشراء وتأجير في أبوظبي.'},
    en: {title:'Property Categories | Villas, Apartments & Investment Land',description:'Explore residential and investment villas, luxury apartments, investment land, commercial offices, and rental or purchase enquiries in Abu Dhabi with ATOMAK.'},
  },
  contact: {
    ar: {title:'التواصل مع أتومك | عقارات أبوظبي والموقع على الخريطة',description:'تواصل مع أتومك للعقارات في أبوظبي عبر الهاتف 0521408877 أو البريد info@atomakrealestate.ae، وتعرف على موقعنا وأوقات التواصل المتاحة.'},
    en: {title:'Contact ATOMAK Real Estate Abu Dhabi | Phone & Directions',description:'Contact ATOMAK Real Estate in Abu Dhabi at +971 52 140 8877 or info@atomakrealestate.ae. View directions and enquire about property services.'},
  },
};
export const sitePages = Object.keys(pages);

export function pageMetadata(locale, page) {
  const info = pages[page][locale], suffix = page==='home'?'':'/'+page;
  const path='/'+locale+suffix;
  const canonical=SITE_URL+path;
  const translations={ar:SITE_URL+'/ar'+suffix,en:SITE_URL+'/en'+suffix,'x-default':SITE_URL+'/ar'+suffix};
  return {
    title: info.title,
    description:info.description,
    keywords:commonKeywords,
    alternates:{canonical, languages:translations},
    openGraph:{
      title:info.title,description:info.description,url:canonical,
      siteName:'ATOMAK Real Estate',type:'website',
      locale:locale==='ar'?'ar_AE':'en_AE',alternateLocale:[locale==='ar'?'en_AE':'ar_AE'],
      images:[{url:SITE_URL+'/images/atomak-logo.webp',width:375,height:330,alt:'ATOMAK Real Estate'}]
    },
    twitter:{card:'summary_large_image',title:info.title,description:info.description,images:[SITE_URL+'/images/atomak-logo.webp']}
  };
}
export function structuredData(locale,page) {
  const suffix=page==='home'?'':'/'+page;
  const url=SITE_URL+'/'+locale+suffix;
  const brand={
    '@context':'https://schema.org',
    '@type':'RealEstateAgent',
    '@id':SITE_URL+'/#company',
    name:locale==='ar'?'أتومك لخدمات تأجير وإدارة العقارات الخاصة':'ATOMAK Private Property Rental & Management Services',
    alternateName:['ATOMAK Real Estate','أتومك للعقارات','اتومك'],
    url:SITE_URL,
    image:SITE_URL+'/images/atomak-logo.webp',
    logo:SITE_URL+'/images/atomak-logo.webp',
    telephone:'+971521408877',
    email:'info@atomakrealestate.ae',
    hasMap:'https://maps.app.goo.gl/LPs7MaBve9KAQQvF9',
    address:{'@type':'PostalAddress',addressLocality:'Abu Dhabi',addressRegion:'Abu Dhabi',addressCountry:'AE'},
    areaServed:['Abu Dhabi','Bani Yas','Al Riyadh, Abu Dhabi','Al Shamkha','Al Shawamekh','Al Wathba'].map(name=>({'@type':'Place',name})),
    availableLanguage:['ar','en'],
    sameAs:Object.values(socialProfiles),
    hasOfferCatalog:{'@type':'OfferCatalog',name:'Real estate services',itemListElement:['Property rental','Property management','Property sales and purchases','Residential villas','Apartments','Investment land','Commercial offices'].map(name=>({'@type':'OfferCatalog',name}))}
  };
  const website={'@context':'https://schema.org','@type':'WebSite','@id':SITE_URL+'/#website',name:'ATOMAK Real Estate',alternateName:'أتومك للعقارات',url:SITE_URL,inLanguage:['ar','en'],publisher:{'@id':brand['@id']}};
  const webpage={'@context':'https://schema.org','@type':'WebPage','@id':url+'#webpage',url,name:pages[page][locale].title,description:pages[page][locale].description,inLanguage:locale,isPartOf:{'@id':website['@id']},about:{'@id':brand['@id']}};
  const breadcrumbs=page==='home'?null:{
    '@context':'https://schema.org','@type':'BreadcrumbList',
    itemListElement:[{'@type':'ListItem',position:1,name:locale==='ar'?'الرئيسية':'Home',item:SITE_URL+'/'+locale},{'@type':'ListItem',position:2,name:pages[page][locale].title,item:url}]
  };
  return [brand,website,webpage,...(breadcrumbs?[breadcrumbs]:[])];
}
