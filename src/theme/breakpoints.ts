declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    xxs: true;
    sm: true;
    md: true;
    mmd: true;
    lg: true;
    xl: true;
  }
}

const breakPoints = {
  values: {
    xs: 0,
    xxs: 420,
    sm: 600,
    md: 900,
    mmd: 991,
    lg: 1200,
    xl: 1536,
  },
};

export default breakPoints;
