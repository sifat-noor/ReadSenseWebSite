import * as React from 'react';
import Stack from '@mui/material/Stack';
import utilStyles from '../styles/utils.module.css';
import pickstory from '../styles/pickstory.module.css';
import styles from '../components/button.module.css';
import Button from '@mui/material/Button';
import Image from 'next/image';
import BookCoverImage from '../components/bookCoverImage';
import { ArrowBackIosNewRounded, BackHandRounded } from '@mui/icons-material';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import { useSession } from "next-auth/react";

export default function existingUserPickStory() {
  const [selectBookId, setSelectBookId] = React.useState(undefined);
  const [books, setBooks] = React.useState([]);
  const [continueReading, setContinueReading] = React.useState(false); // true if user has reading history
  const router = useRouter();
  const { data: session } = useSession();

  // fetch all books with reading history
  React.useEffect(() => {
    if (session === undefined) {
      return;
    }
    fetch(process.env.NEXT_PUBLIC_READSENSE_API_URL + '/api/books/GetBooksWithUserReadingHistory', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.accessToken,
      },
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        if (data.length > 0 && data[0].pTagIndex != null) {
          setSelectBookId(data[0].id);
          setContinueReading(true);
        }
      })
      .catch((error) => {
        console.error('Error loading the book:', error);
      });
  }, [session]);

  const handleBackButtonClick = () => {
    router.push('/existingUserContext');
  };

  const handleReadButtonClick = () => {
    if (selectBookId === undefined) {
      alert('Please select a book!');
    } else {
      let selectBook = books.find((book) => book.id === selectBookId);
      router.push({
        pathname: '/readingState',
        query: { bookContent: selectBook.contentUrl, bookId: selectBook.id, pTagIndex: selectBook.pTagIndex },
      });
    }
  }


  const ContinueReading = () => {

    const handleReadANewStory = () => {
      setContinueReading(false);
    }

    const handleContinueReading = () => {
      let selectBook = books[0];
      router.push({
        pathname: '/readingState',
        query: { bookContent: selectBook.contentUrl, bookId: selectBook.id, pTagIndex: selectBook.pTagIndex },
      });
    }

    return (
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
            <Button variant="outlined" className={styles.buttonOutline} onClick={handleReadANewStory} >No, read a new story</Button>
            <Button variant="contained" className={styles.buttonFilled} onClick={handleContinueReading} >Yes, Continue reading!!</Button>
        </Stack>
        </div>
      </div>
    )
  }

  const PickStory = () => {
    return (
      <div className={pickstory.columnLeft}>
        <div className={pickstory.columnLeftUpper}>
          <div className={pickstory.columnRightHeader}>
            <Stack spacing={2} direction="row">
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleBackButtonClick}>
                <ArrowBackIosNewRounded sx={{ color: '#735BF2' }} />
              </IconButton>
              <p style={{ textAlign: 'center', paddingTop: '.5rem', paddingLeft: '0rem' }}>Back</p>
            </Stack>
          </div>
          <section className={utilStyles.headingXl}>
            <p>Pick your story!<br />
              & start reading!</p>
          </section>
          {/* <section className={utilStyles.headingMd} > 
                <p>All you have to do is read a story you like!</p>
            </section>  */}
          <div className={pickstory.columnLeftUpperMiddle1}>
            {
              books.map((book) => {
                return (
                  <BookCoverImage
                    src={book.imageUrl}
                    bookId={book.id}
                    selected={selectBookId === book.id}
                    handleClick={setSelectBookId}
                    key={book.id}
                  />
                )
              })
            }
          </div>
          <p style={{ color: 'gray', textAlign: 'center', fontStyle: 'italic' }}>choose any</p>
        </div>
        <div className={pickstory.columnLeftLower}>
          <Stack alignItems='center' direction="row">
            <Button variant="contained" className={styles.buttonFilled} onClick={handleReadButtonClick}>Let's read!</Button>
          </Stack>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={pickstory.container} >
        {
          continueReading ? <ContinueReading /> : <PickStory />
        }
        <div className={pickstory.columnRight}>
          <div className={pickstory.columnRightInner}>
            {/* <div style={{flex: 1, display: 'flex', flexDirection: 'row', backgroundColor: 'red', justifyContent: 'flex-end', alignItems: "center" }}> */}
            <Image
              src="/images/pickStory.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: 'auto', height: 'auto' }} // optional
            />
          </div>
        </div>
      </div>
    </>
  );
}





