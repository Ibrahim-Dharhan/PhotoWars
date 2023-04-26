import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class HelloWorld extends React.Component {
  render() {
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
            common phrase used in computer programs.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }
}

export default HelloWorld;
