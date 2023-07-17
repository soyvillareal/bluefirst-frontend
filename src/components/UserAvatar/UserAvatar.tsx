import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';

// import useAppSelector from '@hooks/redux/useAppSelector';
// import { selectUserSession } from '@helpers/endpoints/session/session.selector';

import { IUserAvatarProps } from './UserAvatar.types';
import useAppSelector from '@hooks/redux/useAppSelector';
import { selectUserSession } from '@helpers/features/sessions/sessions.selector';
import env from '@helpers/env';

const UserAvatar = ({
  sx,
  height = 45,
  width = 45,
  onClick,
  ...props
}: IUserAvatarProps) => {
  const user = useAppSelector(selectUserSession);
  console.log(user);

  return user ? (
    <Avatar
      alt={'user.username'}
      data-testid="userMenu"
      src={`${env.BASE_CND_URL}/uploads/${user?.avatar}`}
      {...props}
      sx={{
        cursor: 'pointer',
        height,
        width,
        color: 'primary.light',
        backgroundColor: 'background.default',
        ...sx,
      }}
      onClick={onClick}
    />
  ) : (
    <Button
      sx={{
        borderRadius: 8,
        backgroundColor: 'background.default',
      }}
      onClick={onClick}
    >
      <PersonIcon data-testid="userMenu" />
    </Button>
  );
};

export default UserAvatar;
