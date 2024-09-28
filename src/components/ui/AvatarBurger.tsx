
import React from 'react'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
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
          sx: { backgroundColor: 'var(--bgElements)' }
        }}
        PaperProps={{
          sx: {
            mt: '30px',
            backgroundColor: 'var(--sideBarColor)',
            color: '#000',
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
        <MenuItem onClick={handleClose}>
          <CiUser fill='var(--textColor)'/>
          <Link to={`/profile`} className='ml-2 text-[var(--textColor)] text-m font-normal'>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IoIosLogOut fill='var(--textColor)'/>
          <button className='ml-2 text-[var(--textColor)] text-m font-normal' onClick={logout}>Logout</button>
        </MenuItem>
      </Menu>
    </div>
  )
}
