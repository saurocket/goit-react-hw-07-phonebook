import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {MainPage} from "./Components/MainPage";


export const App = ()  => {
  return (
      <>
        <CssBaseline />
        <Container fixed>
          <Typography
              component="div"
              style={{ backgroundColor: '#cfe8fc', minHeight: '100vh' }}
              children={
                <MainPage/>
              }
          />
        </Container>
      </>
  );
}