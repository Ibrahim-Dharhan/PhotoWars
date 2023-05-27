"use strict"
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Drawer,
  Toolbar
} from '@mui/material';
import { BattleCard } from '../battleCard/BattleCard';
// import { UserContext } from '../../contexts/UserContext';

const RightBar = () => {
  // const { userId } = useContext(UserContext);
  const [battleId, setBattleId] = useState('64544bf83f9238e774994e02');
  const drawerWidth = 240;

  useEffect(() => {
    let shouldUpdate = true;
    const setBattleId = async () => {
      const path = '/battle/random';
      const res = await axios.get(path);
      const randomBattleId = res.data?._id;
      if (shouldUpdate) {
        // setBattleId(randomBattleId);
        console.log('Setting battle id', randomBattleId);
      }
    };

    try {
      setBattleId();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [battleId]);

  return (
    <Drawer
      anchor="right"
      variant="permanent"
      alignSelf="right"
      sx={{
        width: drawerWidth,
        ['& .MuiDrawer-paper']: {
          boxSizing: 'border-box',
          width: drawerWidth
        }
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', padding: '5px' }}>
        {
          battleId !== null &&
          <BattleCard
            battleId={battleId}
            showModal={null}
          />
        }
      </Box>
    </Drawer>
  );
};

export { RightBar };
