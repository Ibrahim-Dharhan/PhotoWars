import * as React from 'react';
// import { RightBar } from '../../components/rightBar/RightBar';
// import { SideBar } from '../../components/sideBar/SideBar';
import { TabBar } from '../../components/tabBar/TabBar';
import { TopBar } from '../../components/topBar/TopBar';
import { Outlet } from 'react-router-dom';
import { Stack, Toolbar } from '@mui/material';

const Home = () => {
  return (
  <Stack spacing={2} m={4}>
    <TopBar />
    <Stack direction="row" justifyContent="space-around" spacing={4}>
      {/* <SideBar /> */}
      <Stack>
        <Toolbar />
        <TabBar />
        <Outlet />
      </Stack>
      {/* <RightBar /> */}
    </Stack>
  </Stack>
  );
};

export { Home };
