import { Box } from '@mui/material';

import HeaderDesktop from '@components/Layout/Header/Desktop';
import HeaderMobile from '@components/Layout/Header/Mobile';
import spaceSizes from '@theme/spaceSizes';
import useBigDesktopMediaQuery from '@hooks/mediaQuery/useBigDesktopMediaQuery';

const Header = () => {
  const isBigDdesktop = useBigDesktopMediaQuery();

  return (
    <Box
      sx={{
        marginTop: isBigDdesktop ? spaceSizes.md : spaceSizes.sm,
        marginBottom: isBigDdesktop ? spaceSizes.md : spaceSizes.sm,
        marginInline: isBigDdesktop ? spaceSizes.lg : spaceSizes.sm,
        zIndex: 1,
      }}
    >
      {isBigDdesktop ? <HeaderDesktop /> : <HeaderMobile />}
    </Box>
  );
};

export default Header;
