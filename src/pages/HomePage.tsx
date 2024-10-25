import { useState } from 'react'
import Banners from "../module/banners/Banners";
import Header from "../module/header/Header";
import BannersTry from "../module/banners/BannersTry";
import BannerRec from "../module/banners/BannerRec";
import Create from "../module/create/Create";
import Footer from "../module/footer/Footer";
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login';
import Modal from '@mui/material/Modal';
import BuilderModal from '../components/builder/builderModal';
import { Helmet } from "react-helmet";
import { generateHeadTags } from 'react-seo-tools/lib/generateHeadTags';
export default function HomePage() {
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [builderModal, setBuilderModal] = useState(false);
  return (
    <div className="flex-1 overflow-x-hidden min-h-screen ml-20 sm:ml-0">
      <Helmet>{generateHeadTags({
        title: 'Manager AI',
        // description: 'Want to learn SEO with React? Look no further!',
      })}</Helmet>
      <div className="flex flex-col justify-between px-4 sm:px-2 pt-6">
        <div className="max-w-7xl self-center w-full flex flex-col">
          <Header openRegModal={() => setRegModalOpen(true)} openLogModal={() => setLogModalOpen(true)} />
          <Banners openBuilderModal={() => setBuilderModal(true)} />
          {/* <BannersTry />
          <BannerRec /> */}
          <Create />
          <Footer />
          <Modal open={builderModal} onClose={() => setBuilderModal(false)}>
            <BuilderModal onCloseBuilderModal={() => setBuilderModal(false)} />
          </Modal>
          <Modal open={regModalOpen} onClose={() => setRegModalOpen(false)}>
            <Registration onCloseRegModal={() => setRegModalOpen(false)} />
          </Modal>
          <Modal open={logModalOpen} onClose={() => setLogModalOpen(false)}>
            <Login onCloseLogModal={() => setLogModalOpen(false)} />
          </Modal>
        </div>
      </div>
    </div>
  );
}
