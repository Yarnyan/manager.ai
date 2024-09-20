
import { useState } from 'react'
import Profile from '../module/profile/Profile';
import Modal from '@mui/material/Modal';
import SettingModal from '../components/setting/SettingModal';
export default function ProfilePage() {
  const [setting, settingModal] = useState(false);  
  return (

    <div className="flex-1 overflow-x-hidden min-h-screen ml-20 sm:ml-0">
      <div className="flex flex-col justify-between px-4 sm:px-8 pt-6">
        <div className="max-w-7xl self-center w-full flex flex-col">
          <Profile settingModal={() => settingModal(true)} />
          <Modal open={setting} onClose={() => settingModal(false)}>
            <SettingModal onCloseSettingModal={() => settingModal(false)} />
          </Modal>
        </div>
      </div>
    </div>
  );
}
