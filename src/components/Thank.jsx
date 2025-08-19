import Image from 'next/image';
import styles from '@/styles/thank.module.scss';

export default function thank() {
  return (
    <div className={styles.thank}>
      <div className="container">
        <figure className={styles.thank_img}>
          <Image 
            width={0}
            height={0}
            sizes='100vw'
            alt='Thank you'
            src={'/thank-you.jpg'}
          />
        </figure>
        <h3 className={styles.thank_name}><span>Tuấn Anh</span>&nbsp;&nbsp;&nbsp;&amp;&nbsp;&nbsp;&nbsp;<span>Phạm Kiều</span></h3>
        <div className={styles.thank_logo}>
          <figure>
            <Image 
              width={0}
              height={0}
              sizes='100vw'
              alt='Thank you'
              src={'/img-thank.jpg'}
            />
          </figure>
        </div>
      </div>
    </div>
  );
}