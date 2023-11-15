import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import utilStyles from '../styles/utils.module.css';
import styles from '../components/button.module.css';
import newusercontext from '../styles/newusercontext.module.css';
import Stack from '@mui/material/Stack';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import Image from 'next/image';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function FeedBackModal(props) {
  const [userInput, setUserInput] = React.useState({});
  const [isAllSet, setIsAllSet] = React.useState(false);
  const [feedbackConfirmVisible, setFeedbackConfirmVisible] = React.useState(false);

  // reset the user input when the modal is closed
  React.useEffect(() => {
    if(props.settingsDiff){
      let defaultUserInput = {};
      for (let [key, value] of Object.entries(props.settingsDiff)) {
        defaultUserInput = {...defaultUserInput, [key]: undefined}
      }
      setUserInput(defaultUserInput);
    }
  },[props.settingsDiff]);

 // check if all the field have been set
  React.useEffect(() => {
    let allSet = isAllUserInputSet();
    setIsAllSet(allSet);
  },[userInput]);

  // show the feedback confirmation
  React.useEffect(() => {
    if(feedbackConfirmVisible){
        const handle = setTimeout(() => {
            props.handleClose(false);
            setFeedbackConfirmVisible(false);
        }, 4000);

        return () => {
            clearTimeout(handle);
        };
    }
  },[feedbackConfirmVisible]);

  const handleUserInput = (value) => {
    setUserInput({...userInput, ...value});
  }

  const isAllUserInputSet = () => {
    let allSet = true;
    for (let [key, value] of Object.entries(userInput)) {
        if(value == undefined){
            allSet = false;
            break;
        }
    }
    return allSet;
  }

  const handleClose = () => {
    // check if all the field have been set
    if(isAllSet){
        setFeedbackConfirmVisible(true); // show the feedback confirmation
        
        let combinedUserInput = {...props.settingsDiff, settingsApplyTime: props.settingsChangeTime};
        for (let [key, value] of Object.entries(userInput)) {
            combinedUserInput = {...combinedUserInput, [key]: {...combinedUserInput[key], reason: value}}
        }

        props.handleSubmit({[props.settingsChangeTime]: combinedUserInput});
        setUserInput({});
    }
  };


  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.isVisible}
      >
        {
            !feedbackConfirmVisible && 
            (<>
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

                <Divider light />
                <DialogContent>
                {/* <DialogContent dividers> */}
                <div className={newusercontext.columnRightLower}>
                    <div className={newusercontext.columnRightLowerLeft} style={{ flex:'.4' }}>
                    <Stack spacing={7} direction="column" className={utilStyles.headingMd}>
                        { props.settingsDiff && ("fontSize" in props.settingsDiff) && <p className={utilStyles.paragraphText}>Font Size</p>}
                        { props.settingsDiff && ("fonts" in props.settingsDiff) && <p className={utilStyles.paragraphText}>Font type</p>}
                        { props.settingsDiff && ("lineSpacing" in props.settingsDiff) && <p className={utilStyles.paragraphText}>Letter spacing</p>}
                        { props.settingsDiff && ("lineHeight" in props.settingsDiff) && <p className={utilStyles.paragraphText}>Letter height</p>}
                        { props.settingsDiff && ("layout" in props.settingsDiff) && <p className={utilStyles.paragraphText}>Layout</p>}
                        { props.settingsDiff && ("align" in props.settingsDiff) && <p className={utilStyles.paragraphText}>Alignment</p>}
                    </Stack>
                    </div>
                    <div className={newusercontext.columnRightLowerRight}>
                    <Stack spacing={3} direction="column">
                        {   props.settingsDiff && ("fontSize" in props.settingsDiff) &&
                            <Stack spacing={2} direction="row" className={utilStyles.paragraphText}>
                                <RowRadioButtonsGroup name="fontSize" handleChange={handleUserInput}/>
                            </Stack>
                        }
                        {   props.settingsDiff && ("fonts" in props.settingsDiff) && 
                            <Stack spacing={2} direction="row" className={utilStyles.paragraphText}> 
                                <RowRadioButtonsGroup name="fonts" handleChange={handleUserInput}/>
                            </Stack>
                        }
                        {   props.settingsDiff && ("lineSpacing" in props.settingsDiff) && 
                            <Stack spacing={2} direction="row" className={utilStyles.paragraphText}> 
                                <RowRadioButtonsGroup name="lineSpacing" handleChange={handleUserInput}/>
                            </Stack>
                        }
                        {   props.settingsDiff && ("lineHeight" in props.settingsDiff) && 
                            <Stack spacing={2} direction="row" className={utilStyles.paragraphText}> 
                                <RowRadioButtonsGroup name="lineHeight" handleChange={handleUserInput}/>
                            </Stack>
                        }
                        {   props.settingsDiff && ("layout" in props.settingsDiff) && 
                            <Stack spacing={2} direction="row" className={utilStyles.paragraphText}> 
                                <RowRadioButtonsGroup name="layout" handleChange={handleUserInput}/>
                            </Stack>
                        }
                        {   props.settingsDiff && ("align" in props.settingsDiff) && 
                            <Stack spacing={2} direction="row" className={utilStyles.paragraphText}> 
                                <RowRadioButtonsGroup name="align" handleChange={handleUserInput}/>
                            </Stack>
                        }
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
                    <Button variant="contained" className={styles.buttonFilled} onClick={handleClose} disabled={!isAllSet}>Done</Button>
                    {/* <Button autoFocus onClick={handleClose}>
                    Save changes
                    </Button> */}
                </DialogActions>
             </>
            )
        }
        {
            feedbackConfirmVisible &&
            (
                <>
                    <DialogTitle 
                        className={utilStyles.headingLg} 
                        sx={{
                            textAlign: 'center', 
                            fontFamily: 'Nunito_Sans, Sans-serif',
                            '& p': {
                            // color: 'red',
                            fontSize: '16px',
                            // fontWeight: 'bold', 
                            margin: '0px'},}} id="customized-dialog-title">
                        Much appreciated!
                        {/* <br/>Let’s get back to reading! */}
                        <p >Let’s get back to reading!</p>
                    </DialogTitle>
                    <Divider light />
                    <DialogContent>
                        <Image
                            src="/images/feedback.png"
                            width={300}
                            height={300}
                            // sizes="100vw"
                            style={{ width: 'auto', height: 'auto' }} // optional
                        /> 
                    </DialogContent>
                </>
            )
        }
      </BootstrapDialog>
    </div>
  );
}