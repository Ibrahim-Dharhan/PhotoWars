"use strict"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Drawer,
  Toolbar
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { BattleCard } from '../battleCard/BattleCard';

const RightBar = () => {
  const [battleId, setBattleId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let shouldUpdate = true;
    const getBattleId = async () => {
      const path = '/battle/random';
      const res = await axios.get(path);
      const randomBattleId = res.data?._id;
      if (shouldUpdate) {
        setBattleId(randomBattleId);
      }
    };

    try {
      getBattleId();
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
      sx={{
        width: '15%',
        ['& .MuiDrawer-paper']: {
          boxSizing: 'border-box',
          width: '15%'
        }
      }}
    >
      <Toolbar />
      <Box sx={{ padding: '5px' }}>
        {
          battleId && location.pathname === '/' &&
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
