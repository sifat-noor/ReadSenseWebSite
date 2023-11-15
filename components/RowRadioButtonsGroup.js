import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup(props) {
  const [value,setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleChange({[props.name]: event.target.value});
  }
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={value}
      >
        <FormControlLabel value="preferred" control={<Radio sx={{ color: '#735BF2' }}/>} label="Preferred" />
        <FormControlLabel value="hard_to_read" control={<Radio sx={{ color: '#735BF2', margin: '0rem' }} />} label="Hard to read" />
        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
        {/* <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        /> */}
      </RadioGroup>
      <p style={{color:'gray', textAlign:'start', fontStyle: 'italic', fontSize:'.8rem', margin: '0px'}}>choose any</p>
    </FormControl>
  );
}