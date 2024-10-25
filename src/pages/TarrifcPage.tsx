import Header from "../module/header/Header";
import { Helmet } from 'react-helmet';
import { generateHeadTags } from 'react-seo-tools/lib/generateHeadTags';
import Tarrifs from "../module/tarrifs/Tarrifs";
export default function TarrifsPage() {

  return (
    <div className="flex-1 overflow-x-hidden min-h-screen sm:ml-0 ml-20">
            <Helmet>{generateHeadTags({
        title: 'Manager AI | manager',
        // description: 'Want to learn SEO with React? Look no further!',
      })}</Helmet>
      <div className="flex flex-col justify-between px-4 sm:px-4 pt-6">
        <div className="max-w-7xl self-center w-full flex flex-col">
          <Header />
          <Tarrifs />
        </div>
      </div>
    </div>
  );
}
