
import CreateForm from "../module/createForm/CreateForm";
import Footer from "../module/footer/Footer";
import Header from "../module/header/Header";
import { Helmet } from 'react-helmet';
import { generateHeadTags } from 'react-seo-tools/lib/generateHeadTags';
export default function CreatePage() {


  return (
    <div className="flex-1 overflow-x-hidden min-h-screen ml-20 sm:ml-0">
            <Helmet>{generateHeadTags({
        title: 'Manager AI | create',
        // description: 'Want to learn SEO with React? Look no further!',
      })}</Helmet>
      <div className="flex flex-col justify-between px-4 sm:px-4 pt-6">
        <div className="max-w-7xl self-center w-full flex flex-col">
          <Header />
          <CreateForm />
        </div>
      </div>
    </div>
  );
}
