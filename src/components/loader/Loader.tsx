import CircularProgress from '@mui/material/CircularProgress';

type Props = {}

export default function Loader({}: Props) {
  return (
    <div className="sm:min-h-[100dvh] flex-1 overflow-x-hidden min-h-screen sm:ml-0 absolute top-0 left-0 bg-[var(--bgElements)] w-full h-full z-[100] flex justify-center items-center sm:h-[100%]">
      <CircularProgress size={60}/>
    </div>
  )
}