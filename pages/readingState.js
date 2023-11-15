import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import HTMLViewer from '../components/htmlBookViewer';
import { useRouter } from 'next/router';
import { getFontSize, getFonts, getLineHeight, getLineSpacing, getAlign, getLayout, getLastStableSettings, setLastStableSettings, setBookId, setReadSettingsEventId } from  "../redux/readerSlice";
import{useSelector, useDispatch}from  "react-redux";
import { useEffect, useState } from 'react';
import FeedBackModal from '../components/FeedBackModal';
import { useSession } from "next-auth/react";

export default function ReadingState(props) {
  const router = useRouter();
  const { bookContent, bookId, pTagIndex } = router.query;
  const fontSize = useSelector(getFontSize);
  const fonts = useSelector(getFonts);
  const lineHeight = useSelector(getLineHeight);
  const lineSpacing = useSelector(getLineSpacing);
  const align = useSelector(getAlign);
  const layout = useSelector(getLayout);
  const lastStableSettings = useSelector(getLastStableSettings);
  const  dispatch = useDispatch();
  const [getFeedBack, setFeedBack] = useState(false);
  const [settingsDiff, setSettingsDiff] = useState({});
  const [settingsApplyTime, setSettingsApplyTime] = useState(new Date().toUTCString()); // time when settings were applied
  const [userInput, setUserInput] = useState({});
  const { data: session } = useSession();


  // set the book id in the redux store
  useEffect(() => {
    dispatch(setBookId(Number(bookId)));
  }, [bookId]);

  // track changes in settings and show feedback modal
  useEffect(() => {
    if(lastStableSettings.fontSize != fontSize || lastStableSettings.fonts != fonts || lastStableSettings.lineHeight != lineHeight || lastStableSettings.lineSpacing != lineSpacing || lastStableSettings.align != align){
      const handler = setTimeout(() => {
        // find the settings that are different
        let diff = {};
        if(lastStableSettings.fontSize != fontSize){
          diff.fontSize = { old: lastStableSettings.fontSize, new: fontSize };
        }
        if(lastStableSettings.fonts != fonts){
          diff.fonts = { old: lastStableSettings.fonts, new: fonts };
        }
        if(lastStableSettings.lineHeight != lineHeight){
          diff.lineHeight = { old: lastStableSettings.lineHeight, new: lineHeight };
        }
        if(lastStableSettings.lineSpacing != lineSpacing){
          diff.lineSpacing = { old: lastStableSettings.lineSpacing, new: lineSpacing };
        }
        if(lastStableSettings.align != align){
          diff.align = { old: lastStableSettings.align, new: align };
        }
        if(lastStableSettings.layout != layout){
          diff.layout = { old: lastStableSettings.layout, new: layout };
        }

        setSettingsApplyTime(new Date().toISOString());
        setSettingsDiff(diff);
        setFeedBack(true); // show the feedback modal
        dispatch(setLastStableSettings({...lastStableSettings, fontSize: fontSize, fonts: fonts, lineHeight: lineHeight, lineSpacing: lineSpacing, align: align}));
      }, 5000);
  
      return () => {
        clearTimeout(handler);
      };
    }
  },[fontSize,fonts,lineHeight,lineSpacing,align,layout]);

  // on user input change, submit new userinput(ReadSettings) to backend
  useEffect(() => {
    const submitFeedback = async () => {
      let res = undefined;
      try {
        res = await fetch(process.env.NEXT_PUBLIC_READSENSE_API_URL+'/api/ReadSettings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + session.accessToken,
          },
          body: JSON.stringify( Object.keys(userInput).map(key => userInput[key]) ),
        });
      } catch (error) {
        console.error('An unexpected error happened occurred:', error);
      }
      
      if (res?.status === 200) {
        setUserInput({});
        res.json().then((data) => {
          dispatch(setReadSettingsEventId(data.id));
        })
      }
    }


    if(Object.keys(userInput).length > 0){
      submitFeedback().catch(console.error);
    }
  },[userInput]);

  const handleUserInput = (value) => {
    setUserInput({...userInput, ...value});
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.bookText}>
        <div>
          <HTMLViewer src={bookContent} pTagIndex={pTagIndex} />
        </div>
      </section>
      <FeedBackModal isVisible={getFeedBack} handleClose={setFeedBack} settingsDiff={settingsDiff} settingsChangeTime={settingsApplyTime} handleSubmit={handleUserInput} />
    </Layout>
  );
}