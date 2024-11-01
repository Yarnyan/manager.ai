import Chat from '../module/chat/Chat';
import Header from '../module/header/Header';
import { Helmet } from 'react-helmet';
import { generateHeadTags } from 'react-seo-tools/lib/generateHeadTags';
export default function ChatPage() {
    return (
      <div className="flex-1 overflow-x-hidden ml-20 sm:ml-0">
        <Helmet>{generateHeadTags({
          title: 'Manager AI | chat',
          // description: 'Want to learn SEO with React? Look no further!',
        })}</Helmet>
        <div className="flex flex-col justify-between px-4 sm:px-4 pt-6 h-[100dvh]">
          <div className="max-w-7xl self-center w-full flex flex-col h-[100%]">
            <Header />
            <Chat />
          </div>
        </div>
      </div>
    );  
  }
