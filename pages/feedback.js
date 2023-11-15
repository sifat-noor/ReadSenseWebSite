import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import utilStyles from '../styles/utils.module.css';
import styles from '../components/button.module.css';
import newusercontext from '../styles/newusercontext.module.css';
import Stack from '@mui/material/Stack';
import CustomRadioChip from '../components/CustomRadioChip';
import RowRadioButtonsGroup from '../components/RowRadioButtonsGroup';
import LoginButton from '../components/login-btn';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [place, setPlace] = React.useState(undefined);
  const [time, setTime] = React.useState(undefined);
  const [brightness, setBrightness] = React.useState(undefined);

  const placeRadioButtonFields = [
    { label: 'A quite place', value: 'quite' },
    { label: 'A chaotic place', value: 'chaotic' },
  ];
  
  const timeRadioButtonFields = [
    { label: 'Morning', value: 'morning' },
    { label: 'Day', value: 'day' },
    { label: 'Evening', value: 'evening' },
    { label: 'Night', value: 'night' },
  ];

  const brightnessRadioButtonFields = [
    { label: 'Low', value: 'low' },
    { label: 'Bright', value: 'bright' },
  ]
  
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <LoginButton />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle 
            className={utilStyles.headingLg} 
            sx={{
                textAlign: 'center', 
                fontFamily: 'Nunito_Sans, Sans-serif',
                '& p': {
                fontSize: '16px',
                margin: '0px'},}} id="customized-dialog-title">
            Hey reader!
            <p >We noticed that you made some changes 
            to the following features, actually. Knowing your choices reasoning is important to us.</p>
        </DialogTitle>
        
        {/* <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton> */}
        <Divider light />
        <DialogContent>
        {/* <DialogContent dividers> */}
        <div className={newusercontext.columnRightLower}>
            <div className={newusercontext.columnRightLowerLeft} style={{ flex:'.4' }}>
              <Stack spacing={7} direction="column" className={utilStyles.headingMd}>
                <p className={utilStyles.paragraphText}>Font Size</p>
                <p className={utilStyles.paragraphText}>Font type</p>
                <p className={utilStyles.paragraphText}>Letter spacing</p>
                <p className={utilStyles.paragraphText}>Letter height</p>
                <p className={utilStyles.paragraphText}>Layout</p>
                <p className={utilStyles.paragraphText}>Alignment</p>
              </Stack>
            </div>
            <div className={newusercontext.columnRightLowerRight}>
              <Stack spacing={3} direction="column">
                <Stack spacing={2} direction="row" className={utilStyles.paragraphText}>
                    <RowRadioButtonsGroup/>
                </Stack>
                <Stack spacing={2} direction="row" className={utilStyles.paragraphText}> 
                    <RowRadioButtonsGroup/>
                </Stack>
                <Stack spacing={2} direction="row" className={utilStyles.paragraphText}> 
                    <RowRadioButtonsGroup/>
                </Stack>
                <Stack spacing={2} direction="row" className={utilStyles.paragraphText}>
                    <RowRadioButtonsGroup/>
                </Stack>
                <Stack spacing={2} direction="row" className={utilStyles.paragraphText}> 
                    <RowRadioButtonsGroup/>
                </Stack>
                <Stack spacing={2} direction="row" className={utilStyles.paragraphText}> 
                    <RowRadioButtonsGroup/>
                </Stack>
              </Stack>
            </div> 
          </div> 
          {/* <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
        </DialogContent>
        <Divider light />
        <DialogActions sx={{backgroundColor:'#F5F5F5'}}>
            <Button variant="contained" className={styles.buttonFilled} onClick={handleClose}>Done</Button>
            {/* <Button autoFocus onClick={handleClose}>
            Save changes
            </Button> */}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}