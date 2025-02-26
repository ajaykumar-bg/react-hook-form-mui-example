import React from 'react';
import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const AddUserButton = ({ onAddClick }) => {
  return (
    <Button 
      variant="contained" 
      startIcon={<AddIcon />}
      onClick={onAddClick}
    >
      Add User
    </Button>
  );
};

export default AddUserButton;