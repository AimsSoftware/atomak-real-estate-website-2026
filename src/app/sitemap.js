import {SITE_URL,sitePages} from '../lib/seo';

export default function sitemap() {
  return ['ar','en'].flatMap(locale=>sitePages.map(page=>{
    const suffix=page==='home'?'':'/'+page;
    return {
      url: SITE_URL+'/'+locale+suffix,
      changeFrequency: page==='home'?'weekly':'monthly',
      priority: page==='home'?1:page==='properties'?0.9:0.7,
      alternates: {languages:{ar:SITE_URL+'/ar'+suffix,en:SITE_URL+'/en'+suffix}},
    };
  }));
}
