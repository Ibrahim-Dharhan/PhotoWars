"use strict"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Drawer,
  Toolbar
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { DailyBattleCard } from '../dailyBattleCard/DailyBattleCard';

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
        width: '20%',
        ['& .MuiDrawer-paper']: {
          boxSizing: 'border-box',
          width: '20%'
        }
      }}
    >
      <Toolbar />
      <Box sx={{ padding: '5px' }}>
        {
          battleId && location.pathname === '/' &&
          <DailyBattleCard
            battleId={battleId}
          />
        }
      </Box>
    </Drawer>
  );
};

export { RightBar };
