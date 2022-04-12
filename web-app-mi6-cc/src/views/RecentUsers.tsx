import React, { useState } from 'react';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// Components
import { CallerCard } from '../components/CallerCard';
// Types
import { ICaller } from '../models/globals';

export const RecentUsers: React.FC = () => {
  const [lastFiveCalls, setLastFiveCalls] = useState<ICaller[]>([])

  const handleButtonClick = ( event: React.MouseEvent<HTMLButtonElement> ):void => {
    const dataFromAWS = fetch('https://is3olr5b82.execute-api.us-east-1.amazonaws.com/Prod/vanity-numbers')
      .then((res) => res.json())
      .then((data)=> {
        window.alert(data);
        setLastFiveCalls(data.lastFiveCallers || []);
        console.log(data);
      })
      .catch((getCallsError: Error) => {
        console.log(getCallsError);
      });
      console.log(dataFromAWS);
  } 

  return (
    <div>
      <Button
        onClick={handleButtonClick}
        color="primary"
        variant='contained'
      >
        Get vanity numbers for last 5 calls.
      </Button>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {lastFiveCalls.map((caller) => (<CallerCard {...caller}/>))}
          </Grid>
      </Container>
    </div>
  )
};

