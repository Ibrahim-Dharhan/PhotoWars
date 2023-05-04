import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from 'axios';

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buttonText: 'Ping' };
  }

  clickLearnMore(event) {
    const path = '/test/ping'
    let promise = axios.get(path);
    promise.then((res) => {
      this.setState({ buttonText: res.data});
    }).catch((err) => {
      console.log(err);
    });
  }

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
            a common phrase used in computer programs.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onclick=clickLearnMore>{this.state.buttonText}</Button>
        </CardActions>
      </Card>
    );
  }
}

export default HelloWorld;
