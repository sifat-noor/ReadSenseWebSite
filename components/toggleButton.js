import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonNotEmpty(props) {
  const [alignment, setAlignment] = React.useState(props.defaultValue);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      props.handleChange(newAlignment);
    }
  };

  return (
    <Stack direction="row" spacing={4}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        {props.children}
        
      </ToggleButtonGroup>

      {/* <ToggleButtonGroup
        value={devices}
        onChange={handleDevices}
        aria-label="device"
      >
        <ToggleButton value="laptop" aria-label="laptop">
          <LaptopIcon />
        </ToggleButton>
        <ToggleButton value="tv" aria-label="tv">
          <TvIcon />
        </ToggleButton>
        <ToggleButton value="phone" aria-label="phone">
          <PhoneAndroidIcon />
        </ToggleButton>
      </ToggleButtonGroup> */}
    </Stack>
  );
}
