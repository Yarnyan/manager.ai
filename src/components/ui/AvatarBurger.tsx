
import React from 'react'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { style } from './style/style';
import { FaMoneyBillWave } from "react-icons/fa";
type Props = {
  src?: string
}

export default function AvatarContainer({ src }: Props) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
      <button onClick={handleClick}>
        <Avatar alt="Remy Sharp" src={src} sx={{ width: 40, height: 40 }} />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: {
            backgroundColor: 'var(--bgElements)',
            padding: '0'
          }
        }}
        PaperProps={{
          sx: {
            width: '200px',
            mt: '30px',
            backgroundColor: 'var(--sideBarColor)',
            color: '#000',
            padding: '0'
          }
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ borderBottom: '1px solid #353B40' }}>
          <MenuItem onClick={handleClose} sx={style}>
            <CiUser fill='var(--textColor)' size={24} />
            <Link to={`/profile`} className='ml-2 text-[var(--textColor)] text-x font-medium w-full'>Profile</Link>
          </MenuItem>
        </Box>
        <MenuItem onClick={handleClose} sx={style}>
          <button className='text-[var(--textColor)] text-m font-normal flex w-full' onClick={logout}>
            <IoIosLogOut fill='var(--textColor)' size={24} className='mr-2'/>
            Logout
          </button>
        </MenuItem>
      </Menu>
    </div>
  )
}
