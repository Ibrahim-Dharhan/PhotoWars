import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create");
  };

  return (
    <div>
      <Button onClick={handleClick}>Create war</Button>
    </div>
  );
};

export { Sidebar };