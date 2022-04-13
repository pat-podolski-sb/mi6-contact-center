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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
// Types
import { ICaller } from '../models/globals';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CallerCard: React.FC<ICaller> = ({
  callerPhoneNumber,
  vanityNumbers
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const clickCopyToClipboardButton =(valueCopied: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(valueCopied);
    setOpen(true);
  }

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
                <IconButton edge="end" aria-label="delete" onClick={clickCopyToClipboardButton(vanityNumber)}>
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
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Vanity number copied to clipboard!
          </Alert>
        </Snackbar>
        </CardContent>
      </Card>
    </Grid>

  )
} 