// components/BookViewer.js
"use client";
import { useEffect, useState, useRef } from 'react';
import { getFontSize, getFonts,  getLineHeight,  getLineSpacing,  getAlign,  getLayout,  } from  "../redux/readerSlice";
import { setScrollEvent, setScrollTrackingData, setBookPTagOffset, sendScrollTrackingData } from  "../redux/readerTrackingSlice";
import{ useSelector, useDispatch }from  "react-redux";

const HTMLViewer = (props) => {
  const [htmlContent, setHTMLContent] = useState('');
  const  fontSize = useSelector(getFontSize);
  const  fonts = useSelector(getFonts);
  const  lineHeight = useSelector(getLineHeight);
  const  lineSpacing = useSelector(getLineSpacing);
  const  alignment = useSelector(getAlign);
  const  layout = useSelector(getLayout);
  const  dispatch = useDispatch();
  const bookViewerRef = useRef();

  // Fetch the HTML content for the selected book
  useEffect(() => {
    if (props.src === undefined) {
      return;
    }

    fetch(props.src)
      .then((response) => response.text())
      .then((data) => {
        setHTMLContent(data);
      })
      .catch((error) => {
        console.error('Error loading the book:', error);
      });

  }, [props.src]);

  // track window scroll position
  useEffect(() => {
    let timer;
    const handleScroll = () => {
      dispatch(setScrollEvent({ scrollY: window.scrollY, time: new Date().getTime() }));

      timer !== undefined && clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(setScrollTrackingData("scrollEnd"));
        dispatch(sendScrollTrackingData({"data":1}))
      }, 100);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timer !== undefined) {
        clearTimeout(timer);
        dispatch(setScrollTrackingData("scrollEnd"));
        dispatch(sendScrollTrackingData({"data":1}) );
      }
    };
  }, []);

  // set the scroll position to the last saved position
  useEffect(() => {
    if(htmlContent !== ''){
      let pTagOffsets = []
      bookViewerRef.current.querySelectorAll('p').forEach((p,index) => {
        pTagOffsets.push(p.offsetTop)
      });
      dispatch(setBookPTagOffset(pTagOffsets));

      if (props.pTagIndex) {
        let lastreadPTag = bookViewerRef.current.querySelectorAll('p')[props.pTagIndex];
        if (lastreadPTag) {
          window.scrollTo(0, lastreadPTag.offsetTop);
        }
        
      }
    }
  },[htmlContent]);

  return (
    <div ref={bookViewerRef}
      style={{
        fontFamily: fonts,
        fontSize: fontSize+'px',
        lineHeight: lineHeight+'px',
        letterSpacing: lineSpacing+'px',
        textAlign: alignment,
        backgroundColor: 'white',
        // margin: '4rem auto',
        marginLeft: '15%',
        marginRight: '10%',
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default HTMLViewer;
