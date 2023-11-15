import * as React from 'react';
import Image from 'next/image';
import styles from './BookCoverImage.module.css';


export default function BookCoverImage( props) {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const handleClick = () => {
    if (props.selected) {
      props.handleClick(undefined);
      return;
    }
    props.handleClick(props.bookId);
  }


  return (
    <div 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
        {
          props.selected? (
              <Image
                src={props.src}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100px', height: '125px'}} // optional
                className={styles.imageOutlinedActive}  
                onClick={handleClick}
                />
          ) :
          isHovering? (
            <Image
                src= {props.src}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '150px', height: '175px'}} // optional
                className={styles.imageOutlinedHover}
                onClick={handleClick}
            />
          ) : (
            <Image
                src={props.src}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100px', height: '125px'}} // optional
                className={styles.imageoutlined}
                onClick={handleClick}
            />
          )
        }
    </div>
  );
}