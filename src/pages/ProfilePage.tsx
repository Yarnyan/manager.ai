
import { useState } from 'react'
import Profile from '../module/profile/Profile';
import Modal from '@mui/material/Modal';
import SettingModal from '../components/setting/SettingModal';
import Header from '../module/header/Header';
import { Helmet } from 'react-helmet';
import { generateHeadTags } from 'react-seo-tools/lib/generateHeadTags';
import TelegramModal from '../components/telegram/telegramModal';
export default function ProfilePage() {
  const [setting, settingModal] = useState(false);  
  const [telegram, telegramModal] = useState(false);
  return (

    <div className="flex-1 overflow-x-hidden min-h-screen ml-20 sm:ml-0">
            <Helmet>{generateHeadTags({
        title: 'Manager AI | profile',
        // description: 'Want to learn SEO with React? Look no further!',
      })}</Helmet>
      <div className="flex flex-col justify-between px-4 sm:px-4 pt-6">
        <div className="max-w-7xl self-center w-full flex flex-col">
          <Header />
          <Profile settingModal={() => settingModal(true)} telegramModal={() => telegramModal(true)} />
          <Modal open={setting} onClose={() => settingModal(false)}>
            <SettingModal onCloseSettingModal={() => settingModal(false)} />
          </Modal>
          <Modal open={telegram} onClose={() => telegramModal(false)}>
            <TelegramModal onClosetelegramModal={() => telegramModal(false)} />
          </Modal>
        </div>
      </div>
    </div>
  );
}
