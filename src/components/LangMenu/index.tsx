import { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useMobileMediaQuery from '@hooks/mediaQuery/useMobileMediaQuery';
import i18n from '@helpers/i18n';

const LangMenu = () => {
  const { t } = useTranslation();
  const isMobile = useMobileMediaQuery();
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.resolvedLanguage,
  );

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: {
          xs: 60,
          sm: 120,
        },
      }}
      size="small"
    >
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedLanguage}
        onChange={(e) => handleChange(e.target.value as string)}
      >
        {i18n.languages.map((lang) => (
          <MenuItem key={lang} value={lang}>
            {isMobile ? lang.toUpperCase() : t(`component.lang_menu_${lang}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LangMenu;
