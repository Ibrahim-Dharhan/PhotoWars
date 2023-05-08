import React, { useState } from 'react';
import { PhotoCard } from '../PhotoCard';
import Grid from '@mui/material/Grid';

import { Create } from '../create/Create';

const Feed = () => {
  return (
    <Grid>
      <PhotoCard />
      <Create />
    </Grid>
  );
};

export { Feed };
