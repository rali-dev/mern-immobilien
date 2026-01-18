import { useMediaQuery } from 'react-responsive';

export function useResponsiveButtonSize(){
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isMediumScreen = useMediaQuery({ minWidth: 640, maxWidth: 1023 }); // md

  if (isLargeScreen) return 'xl';
  if (isMediumScreen) return 'xl';
  return 'lg';
}