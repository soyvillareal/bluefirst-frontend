import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageContainer from '@components/Layout/PageContainer';

export default function Home() {
  return (
    <PageContainer id="homePage">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          John Doe c:
        </Typography>
      </Box>
    </PageContainer>
  );
}
