import Site from '../../../components/Site';
import { notFound } from 'next/navigation';
import {pageMetadata,structuredData} from '../../../lib/seo';

const validPages=['about','properties','contact'];
function parse({locale,slug=[]}) {
  const page=slug[0]||'home';
  if(!['ar','en'].includes(locale)||slug.length>1||(!['home',...validPages].includes(page))) notFound();
  return {locale,page};
}
export function generateStaticParams(){
  return ['ar','en'].flatMap(locale=>[undefined,...validPages].map(p=>({locale,slug:p?[p]:[]})));
}
export async function generateMetadata({params}){
  const {locale,page}=parse(await params);
  return pageMetadata(locale,page);
}
export default async function LocalizedPage({params}){
  const {locale,page}=parse(await params);
  const markup=JSON.stringify(structuredData(locale,page)).replace(/</g,'\\u003c');
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:markup}}/><Site locale={locale} page={page}/></>;
}
