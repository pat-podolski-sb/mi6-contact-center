import React, { useState } from 'react';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

// Components
import { CallerCard } from '../components/CallerCard';
import { SceletonScreen } from '../components/SceletonScreen';
// Types
import { ICaller } from '../models/globals';

export const RecentUsers: React.FC = () => {
  const [lastFiveCalls, setLastFiveCalls] = useState<ICaller[]>([]);
  const [dataLoading, toggleDataLoading ] = useState<boolean>(false);

  const handleButtonClick = ( event: React.MouseEvent<HTMLButtonElement> ):void => {
    toggleDataLoading(true);
    setLastFiveCalls([]);

    const dataFromAWS = fetch('https://is3olr5b82.execute-api.us-east-1.amazonaws.com/Prod/vanity-numbers')
      .then((res) => res.json())
      .then((data)=> {
        setTimeout(() => {
          setLastFiveCalls(data.lastFiveCallers || []);
          toggleDataLoading(false)
        }, 2000);
      })
      .catch((getCallsError: Error) => {
        console.log(getCallsError);
        toggleDataLoading(false)
      });
  }  

  return (
    <div 
      id='vanity_numbers'
      style={{height: '100vh', padding: '20px'}}
    >
      <Button
        onClick={handleButtonClick}
        color="primary"
        variant='contained'
        disabled={dataLoading}
      >
        Get vanity numbers for last 5 calls.
      </Button>
      {dataLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: 'yellow',
              position: 'absolute',
              left: '50%',
              marginTop: '4px',
              marginLeft: '-12px',
            }}
          />
        )}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {lastFiveCalls.map((caller) => (<CallerCard {...caller}/>))}
          {dataLoading   && [1,1,1,1,1].map( (item,index) => (<SceletonScreen key={item + index}/>))}
          </Grid>
      </Container>
    </div>
  )
};

