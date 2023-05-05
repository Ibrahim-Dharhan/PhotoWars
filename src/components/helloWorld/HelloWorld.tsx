import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const HelloWorld = () => {
  const [buttonText, setButtonText] = useState('Ping');

  const clickLearnMore = async () => {
    const path = '/test/ping';
    try {
      const res = await axios.get(path);
      setButtonText(res.data);
    } catch (err) {
      console.error('Failed to get path', err);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Phrase of the Day
        </Typography>
        <Typography variant="h5" component="div">
          Hello World!
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          greeting
        </Typography>
        <Typography variant="body2">
          a common phrase used in computer programs.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => clickLearnMore()}>{buttonText}</Button>
      </CardActions>
    </Card>
  );
};

export { HelloWorld };
