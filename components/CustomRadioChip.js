import * as React from 'react';
import Chip from '@mui/material/Chip';
import TaskAlt from '@mui/icons-material/TaskAlt';
import styles from './CustomRadioChip.module.css';

function ChipWithClick(props) {
  const handleClick = () => {
    props.handleClick(props.value)
  }
  return (
    <Chip
      label={props.label}
      onClick={handleClick}
      variant="outlined"
      key={props.index}
      className={styles.chipOutlined}
    />
  )
}

export default function CustomRadioChip( props) {

  return (
    <>
      {
        props.fields.map((data, index) => {
          if (props.selected === data.value) {
            return (
              <Chip
                label={data.label}
                icon={<TaskAlt style={{ color: '#735BF2' }}/>}
                variant="outlined"
                // color="primary"
                key={index}
                className={styles.chipOutlinedActive}
              />
            )
          } else {
            return (
              <ChipWithClick
                label={data.label}
                value = {data.value}
                handleClick={props.handleClick}
                key={index}
              />
            )
          }
        })
      }
    </>
  );
}