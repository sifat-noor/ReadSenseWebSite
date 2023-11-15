import Head from 'next/head';
import  { siteTitle } from '../components/layout';
import BasicTextFields from '../components/textfield';
import landing from '../styles/landing.module.css';
import Button from '@mui/material/Button';
import Image from 'next/image';
import styles from '../components/button.module.css';
import { signIn, getSession } from 'next-auth/react';
import * as React from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {  useDeviceData   } from 'react-device-detect';
import toast from "../components/Toast";
import { useRouter } from "next/router";


export default function Home() {
  const [fpHash, setFpHash] = React.useState(undefined);
  const [components, setComponents] = React.useState({});
  const [deviceData, setDeviceData] = React.useState(undefined);
  const router = useRouter();

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);

  React.useEffect(() => {
    const setBrowserInfo = async () => {
      const fp = await FingerprintJS.load();

      const { visitorId, components } = await fp.get();

      setFpHash(visitorId);
      setComponents(components);
    };

    const setDeviceInfo = async () => {
      const deviceData = useDeviceData()
      delete deviceData.UA;

      setDeviceData(deviceData)
    };
    setBrowserInfo().catch(console.error);
    setDeviceInfo().catch(console.error);
  }, []);

  const handleUsernameChange = (value) => {
    // Do nothing
  }

  const inputProps = {
    required: true,
    type: 'email',
    name: 'username',
  }
  
  const onSubmit = async (event) => {
    event.preventDefault()
    
    const doLogin = async () => {
      const formData = new FormData(event.currentTarget)
      const componentKeys = ["fonts", "languages", "colorDepth", "screenResolution", "timezone", "touchSupport"];
      const deviceInfo = { ...deviceData, fpHash, ...componentKeys.reduce((acc, key) => ({ ...acc, [key]: components[key] }), {})  };
      
      const result = await signIn('credentials', {
        redirect: false,
        username:formData.get('username'),
        password: '',
        fingerPrint: fpHash,
        deviceInfo: JSON.stringify(deviceInfo) ,
        // callbackUrl: '/'
      }).then( (response) => { 
        console.log( response);        
        if (response.error) {
          console.log("response:" + response.error);
          notify("error", "Unexpected error occurred. Please retry again.");
          return;
        }
        if (response.ok) {
          void router.push("/");
        }
      
      } );
    }

    if (fpHash === undefined || components === undefined || deviceData === undefined) {
      setTimeout(doLogin, 1000);
    } else {
      doLogin().catch(console.error);
    }
  }
  return (
    <>
      <Head><title>{siteTitle}</title></Head> 
      <div className={landing.container} >
        <div className={landing.columnLeft}>
          <div className={landing.columnLeftInner}>
          {/* <div style={{flex: 1, display: 'flex', flexDirection: 'row', backgroundColor: 'red', justifyContent: 'flex-end', alignItems: "center" }}> */}
            <Image
              src="/images/readers.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: 'auto', height: 'auto' }} // optional
            /> 
          </div>
        </div>
        <div className={landing.columnRight}>
        
          <div className={landing.columnRightUpper}>
            <Image
              src="/images/logo.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: 'auto', height: 'auto'}} // optional
              />
            <form onSubmit={onSubmit}>
              <BasicTextFields setCurrentValue = {handleUsernameChange} inputProps={inputProps} />    
              <Button type="submit"  variant="contained" sx= {{width: '238px'}} className={styles.buttonFilled}>Remember me</Button> 
            </form>
          </div>

          <div className={landing.columnRightLower}>
              {/* <BasicTextFields setCurrentValue = {handleUsernameChange} />    
              <Button onClick={onSubmit}  variant="contained" sx= {{width: '238px'}} className={styles.buttonFilled}>Remember me</Button>  */}
          </div>
        </div>
      </div>
   </>
  );
}

Home.getInitialProps = async (context) => { 
  const { req, res } = context;

  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  return {
    session: undefined,
  };
}