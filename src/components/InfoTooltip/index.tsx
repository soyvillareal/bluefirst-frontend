import { useState } from 'react';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { IInfoTooltipProps } from './InfoTooltip.types';

const InfoTooltip = ({
  children = <InfoIcon />,
  content,
  sx,
  placement = 'top',
}: IInfoTooltipProps) => {
  // It is highly recommended to wrap InfoTooltip when called with flex to put it on the same level as any elements around it

  const [open, setOpen] = useState<boolean>(false);
  const show = () => {
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
  };
  return (
    <Tooltip
      open={open || false}
      placement={placement}
      sx={{ ...sx, cursor: 'pointer' }}
      title={content}
      disableHoverListener
      onClick={() => (open ? hide() : show())}
      onMouseEnter={() => show()}
      onMouseLeave={() => hide()}
    >
      {children}
    </Tooltip>
  );
};

export default InfoTooltip;
