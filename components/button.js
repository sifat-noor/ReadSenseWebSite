import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from './button.module.css';
import { deepPurple } from '@mui/material/colors';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      {/* <Button variant="text">Text</Button> */}
      <Button variant="contained" className={styles.buttonFilled}></Button>
      <Button variant="outlined" className={styles.buttonOutline}></Button>
    </Stack>
  );
}

// sx={{ backgroundColor: '#735BF2', borderRadius: '20px', boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.5)', fontFamily: 'Nunito_Sans, Sans-serif', fontWeight: 'normal', width: '238px',
//         '&:hover': {
//             backgroundColor: deepPurple[500],
//             boxShadow: '0px 0x 10px 2px rgba(0,0,0,0.5)',},
//      }}