import { Box, Button, IconButton, styled } from '@mui/material';
import React, { useMemo, useRef } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import { useTranslation } from 'react-i18next';

interface IUploadImageButtonHandlerProps {
  setImageCallback: (image: string) => void;
  customContainerStyles?: React.CSSProperties;
  type?: 'small' | 'big';
}

const HiddenInput = styled('span')`
  opacity: 0;
  filter: alpha(opacity=0);
  height: 0;
  width: 0;
`;

export const UploadImageButtonHandler = ({
  setImageCallback,
  customContainerStyles,
  type = 'small',
}: IUploadImageButtonHandlerProps) => {
  const { t } = useTranslation();
  const isBigType = useMemo(() => type === 'big', [type]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // OnLoad the reader the result is always an image.
      const reader = new FileReader();
      reader.addEventListener('load', (currentFile) => {
        setImageCallback(String(currentFile.target?.result));
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const clearFile = () => {
    if (inputRef.current && inputRef.current.value !== '') {
      inputRef.current.value = '';
    }
  };

  if (isBigType) {
    return (
      <Button
        startIcon={<UploadIcon />}
        sx={{
          ...customContainerStyles,
        }}
        variant="contained"
        onClick={() => inputRef.current?.click()}
      >
        {t('pages.profile.uploadButton')}
        <HiddenInput>
          <input
            ref={inputRef}
            accept="image/*"
            style={{ width: 0 }}
            type="file"
            onChange={onSelectFile}
            onClick={clearFile}
          />
        </HiddenInput>
      </Button>
    );
  }
  return (
    <Box
      sx={{
        border: '1px solid grey',
        borderRadius: '50%',
        padding: 1,

        ...customContainerStyles,
      }}
    >
      <IconButton
        color="inherit"
        size="small"
        sx={{ background: 'rgba(0, 0, 0, 0.25)' }}
        onClick={() => inputRef.current?.click()}
      >
        <UploadIcon />
        <HiddenInput>
          <input
            ref={inputRef}
            accept="image/*"
            type="file"
            onChange={onSelectFile}
            onClick={clearFile}
          />
        </HiddenInput>
      </IconButton>
    </Box>
  );
};
