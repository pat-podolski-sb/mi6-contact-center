import React, { useState } from 'react';
import { Button } from '@mui/material';

export interface Caller {
  callerPhoneNumber: string,
  vanityNumbers: string[],
  dateCreated: string,
  timestampOfDateCreated: number
}

export const RecentUsers: React.FC = () => {
  const [lastFiveCalls, setLastFiveCalls] = useState<Caller[]>([])

  const handleButtonClick = ( event: React.MouseEvent<HTMLButtonElement> ):void => {
    const dataFromAWS = fetch('https://is3olr5b82.execute-api.us-east-1.amazonaws.com/Prod/vanity-numbers')
      .then((res) => { return res.json()})
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
      {lastFiveCalls.map((caller) => (<div>{caller.callerPhoneNumber}</div>))}
    </div>
  )
}