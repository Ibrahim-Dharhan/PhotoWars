import * as React from 'react';
import { Box } from '@mui/material';

interface IProps {
  imageUrl: string;
}
const AspectRatio = ({ imageUrl }: IProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </Box>
    </Box>
  );
};

export { AspectRatio };
