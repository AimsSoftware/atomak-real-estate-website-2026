import Site from '../../../components/Site';
import { notFound } from 'next/navigation';
export function generateStaticParams(){return [{locale:'ar',slug:[]},{locale:'en',slug:[]}]}
export default async function LocalizedPage({params}){
  const {locale,slug=[]}=await params;
  if(!['ar','en'].includes(locale)||slug.length>1|| (slug[0]&&!['about','properties','contact'].includes(slug[0]))) notFound();
  return <Site locale={locale} page={slug[0]||'home'}/>;
}
