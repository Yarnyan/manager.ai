type Props = {
    width: number
    height: number
    src?: string
}

import Avatar from '@mui/material/Avatar';

export default function AvatarUser({width, height, src}: Props) {
  return (
    <Avatar sx={{ width: width, height: height }} src={src} />
  )
}