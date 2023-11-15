import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { deepPurple } from '@mui/material/colors';

export default function BasicTextFields(props) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    props.setCurrentValue(event.target.value);
  }
  
  return (
    <Box
      component="div"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      <TextField id="filled-basic" inputProps={props.inputProps} label="Email address" value={value} onChange={handleChange} variant="filled" sx={{ borderColor: 'green', fontFamily: 'Nunito_Sans, Sans-serif' }}/>
      {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
    </Box>
  );
}