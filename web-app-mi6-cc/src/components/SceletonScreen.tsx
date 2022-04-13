import React from 'react';
// Material ui
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export const SceletonScreen: React.FC = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
        <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={240}
          height={360}
        />
        </CardContent>
    </Grid>
  )
} 