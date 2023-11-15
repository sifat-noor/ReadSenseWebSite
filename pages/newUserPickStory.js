import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import utilStyles from '../styles/utils.module.css';
import pickstory from '../styles/pickstory.module.css';
import styles from '../components/button.module.css';
import Button from '@mui/material/Button';
import Image from 'next/image';
import BookCoverImage from '../components/bookCoverImage';
import { ArrowBackIosNewRounded, BackHandRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export default function newUserPickStory() {
  const [selectBookId, setSelectBookId] = React.useState(undefined);
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push('/existingUserContext');
  };

  const handleReadButtonClick = () => {
    if (selectBookId === undefined) {
      alert('Please select a book!');
    } else {
      // get src from selectBookId
      const selectedBook = availableBooks.find((book) => book.bookId === selectBookId);
      const bookContent = selectedBook ? selectedBook.content : null;
      router.push({
        pathname: '/readingState',
        query: { bookContent: bookContent },
      });
    }
  }


  const availableBooks = [
    { bookId: 1, src: "/images/TheLittlePrince.jpg", content: "/books/TheLittlePrince.html" },
    { bookId: 2, src: "/images/alchemist.jpg", content: "/books/Alchemist.html" },
    { bookId: 3, src: "/images/TheGreatGatsBY.jpg", content: "/books/TheGreatGatsby.html" },
    { bookId: 4, src: "/images/The_Catcher_in_the_Rye.jpg", content: "/books/TheCatcherintheRye.html" },
    { bookId: 5, src: "/images/Totto-Chan.jpg", content: "/books/TottoChan.html" },
    { bookId: 6, src: "/images/1984.jpg", content: "/books/1984.html" },
    { bookId: 7, src: "/images/LittleWomen.jpg", content: "/books/LittleWoman.html" },
    { bookId: 8, src: "/images/GreatExpectations.jpg", content: "/books/GreatExpectations.html" },
    { bookId: 9, src: "/images/OfMiceandMen.jpg", content: "/books/OfMiceandMen.html" },
    { bookId: 10, src: "/images/InterpreterofMaladies.jpg", content: "/books/InterpreterofMaladies.html" },
    { bookId: 11, src: "/images/RobinsonCrusoe.jpg", content: "/books/RobinsonCrusoe.html" },
    { bookId: 12, src: "/images/Gulliverstravel.jpg", content: "/books/GulivarsTravel.html" },
  ]

  return (
    <>
      <div className={pickstory.container} >
        <div className={pickstory.columnLeft}>
          <div className={pickstory.columnLeftUpper}>
            <div className={pickstory.columnRightHeader}>
              <Stack spacing={2} direction="row">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}  onClick={handleBackButtonClick}>
                  <ArrowBackIosNewRounded sx={{ color: '#735BF2' }} />
                </IconButton>
                <p style={{ textAlign: 'center', paddingTop: '.5rem', paddingLeft: '0rem' }}>Back</p>
              </Stack>
            </div>
            <section className={utilStyles.headingXl}>
              <p>Great!<br />
                Pick your story & start reading!</p>
            </section>
            <section className={utilStyles.headingMd} >
              <p>All you have to do is read a story you like!</p>
            </section>
            <div className={pickstory.columnLeftUpperMiddle1}>
              {
                availableBooks.map((book) => {
                  return (
                    <BookCoverImage
                      src={book.src}
                      bookId={book.bookId}
                      selected={selectBookId === book.bookId}
                      handleClick={setSelectBookId}
                      key={book.bookId}
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





{/* <Stack spacing={2} direction="column" className={utilStyles.headingMd}> */ }
{/* <div className={pickstory.columnLeftUpperMiddle1}> */ }
{/* <Stack spacing={4} direction="row" justifyContent='center' wrap='wrap' sx={{ maxWidth: '50%' }} className={utilStyles.headingMd}> */ }
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     /> 
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     />
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     />
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     /> 
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     /> 
//     <BookCoverImage
//         src="/images/Book_sample1.png"
//     />
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     /> 
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     />
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     />
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     /> 
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     /> 
//     <BookCoverImage
//         src="/images/Book_sample1.png"
//     />
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     /> 
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     />
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     />
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     /> 
//     <BookCoverImage 
//         src="/images/Book_sample1.png"
//     /> 
//     <BookCoverImage
//         src="/images/Book_sample1.png"
//     />
// </div>
{/* </Stack> */ }
{/* <div className={pickstory.columnLeftLowerMiddle2}> */ }
{/* <Stack spacing={4} direction="row" justifyContent='center' className={utilStyles.headingMd}> */ }
{/* <BookCoverImage 
        src="/images/Book_sample1.png"
    />
    <BookCoverImage 
        src="/images/Book_sample1.png"
    />  */}
{/* </div> */ }
{/* </Stack> */ }
{/* <p style={{color:'gray', textAlign:'center', fontStyle: 'italic'}}>choose any</p> */ }
{/* </Stack> */ }