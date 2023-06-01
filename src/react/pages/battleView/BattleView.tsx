import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { Box, MenuItem, Select, Stack } from '@mui/material';
import { BattleCard } from '../../components/battleCard/BattleCard';
import {
  LoaderFunction,
  Outlet,
  redirect,
  useNavigate,
  useParams,
} from 'react-router-dom';
import theme from '../../../theme';

const battleViewLoader: LoaderFunction = async ({ params }) => {
  const battleId = params['battleId'];
  const path = `/battle/${battleId}`;
  try {
    await axios.get<{ _id: string }[]>(path);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 404) {
        return redirect('/404');
      }
      console.error(err.response?.data);
    } else {
      console.error(err);
    }
  }
  return null;
};

interface IParams {
  battleId: string;
}

const BattleView = () => {
  const { battleId } = useParams<'battleId'>() as IParams;
  const [sort, setSort] = useState<string>('New');
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`?sort=${sort.toLocaleLowerCase()}`);
  }, [sort, navigate]);
  const handleSortChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSort(event.target.value);
  };
  return (
    <Stack
      alignItems='center'
      sx={{
        width: '100%',
      }}
    >
      <BattleCard battleId={battleId} />
      <Box sx={{ m: 1, width: '100%', alignContent: 'left' }}>
        <Select
          labelId='demo-select-small-label'
          id='demo-select-small'
          value={sort}
          renderValue={(selected) => {
            return `Sort By: ${selected}`;
          }}
          sx={{
            color: theme.palette.primary.main,
            boxShadow: 'none',
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
            fontWeight: 'bold',
          }}
          label='Sort by'
          onChange={handleSortChange}
        >
          <MenuItem value={'New'}>New</MenuItem>
          <MenuItem value={'Top'}>Top</MenuItem>
        </Select>
      </Box>
      <Outlet />
    </Stack>
  );
};

export { BattleView, battleViewLoader };
