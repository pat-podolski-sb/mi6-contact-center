import React from 'react';
import './App.css';
// Material ui
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Components
import { ArchitectureDiagram } from './views/ArchitectureDiagram';
import { RecentUsers } from './views/RecentUsers';
import londonSkyLine from './assets/Original-image-2284x1080.svg';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MI6 Customer Care Center
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <main
      >
        <div
          style={{display: 'flex'}}
        >
          <img style={{ objectFit: 'cover', width: '50%', height: '100vh'}} src={londonSkyLine} className="App-logo-2" alt="logooo" />
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <div
                style={{paddingTop: '40vh'}}
              >
                <Container maxWidth="md">
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    Welcome to MI6 Customer Care center!
                  </Typography>
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    You are able to view&nbsp; <a href='#vanity_numbers'>last 5 calls received</a> &nbsp;by us with vanity number suggestions.
                    Additionally you are able to browse&nbsp;  
                    <a href="#architecture_diagram" >architecture diagram</a> of our solution.
                  </Typography>
                  <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                  >
                  </Stack>
                </Container>
              </div>
            </Box>
        </div>
        <br/>
        <RecentUsers />
        <br/>
        <ArchitectureDiagram />
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Entire infrastructure created by Patryk Podolski (podolski.patryk@gmail.com)
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
    </div>
  );
}

export default App;
