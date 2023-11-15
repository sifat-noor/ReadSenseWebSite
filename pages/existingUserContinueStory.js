import Head from 'next/head';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import BasicButtons from '../components/button';
import pickstory from '../styles/pickstory.module.css';
import styles from '../components/button.module.css';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import BookCoverImage from '../components/bookCoverImage';
import { Icon } from '@mui/material';
import { ArrowBackIosNewRounded, BackHandRounded } from '@mui/icons-material';

export default function exisitngUserContinueStory() {
    return (
      <>
        <div className={pickstory.container} >
          <div className={pickstory.columnLeft}>
            <div className={pickstory.columnLeftUpperFewContent}>
              <div className={pickstory.columnRightHeader}>
                <Stack spacing={2} direction="row"><ArrowBackIosNewRounded sx={{ color: '#735BF2'}}/> <p>Back</p> 
                </Stack>  
              </div>
              <section className={utilStyles.headingXl}> 
              <p>Happy reading!</p>
              </section> 
              <section className={utilStyles.headingMd} > 
                  <p>Do you want to continue where you left with your last reading?</p>
              </section> 
            </div>
            <div className={pickstory.columnLeftUpperMiddleFewContent}>   
            <Stack direction="row" spacing={2} alignItems={'center'}>
                <Button variant="outlined" className={styles.buttonOutline}>No, read a new story</Button>
                <Button variant="contained" className={styles.buttonFilled}>Yes, Continue reading!!</Button>
            </Stack>
            </div>
          </div>
          <div className={pickstory.columnRight}>
            <div className={pickstory.columnRightInner}>
            {/* <div style={{flex: 1, display: 'flex', flexDirection: 'row', backgroundColor: 'red', justifyContent: 'flex-end', alignItems: "center" }}> */}
            <Image
              src="/images/pickStory.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: 'auto', height: 'auto'}} // optional
            /> 
            </div>
          </div>
        </div>
     </>
    );
  }





