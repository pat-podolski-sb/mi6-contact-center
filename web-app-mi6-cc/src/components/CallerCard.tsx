import React from 'react';
// Material ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ContactPhone from '@mui/icons-material/ContactPhone';
import ContentCopy from '@mui/icons-material/ContentCopy';
// Types
import { ICaller } from '../models/globals';


export const CallerCard: React.FC<ICaller> = ({
  callerPhoneNumber,
  vanityNumbers,
  dateCreated,
  timestampOfDateCreated
}) => {


  return (
    
      <Grid item key={callerPhoneNumber} xs={12} sm={6} md={4}>
      <Card
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {callerPhoneNumber}
          </Typography>
          <Typography>
            Vanity numbers:
          </Typography>
          <List dense={true}>
          {vanityNumbers.map((vanityNumber: string, index: number) => (
            <ListItem
              key={vanityNumber + index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <ContentCopy />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <ContactPhone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={vanityNumber}
              />
            </ListItem>
          ))
          }
        </List>
        </CardContent>
      </Card>
    </Grid>

  )
} 