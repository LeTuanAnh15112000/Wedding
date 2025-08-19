import { useState, useEffect } from 'react';
import styles from '@/styles/countdown.module.scss';
import { marmelad } from '@/font/fonts';

const Countdown = () => {
  const targetDate = new Date('2025-09-02T00:00:00+07:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`${styles.countdown} ${marmelad.className}`}>
      <div className={styles.timeBox}>
        <span className={styles.time}>{timeLeft.days}</span>
        <span className={styles.label}>Ngày</span>
      </div>
      <div className={styles.timeBox}>
        <span className={styles.time}>{timeLeft.hours}</span>
        <span className={styles.label}>Giờ</span>
      </div>
      <div className={styles.timeBox}>
        <span className={styles.time}>{timeLeft.minutes}</span>
        <span className={styles.label}>Phút</span>
      </div>
      <div className={styles.timeBox}>
        <span className={styles.time}>{timeLeft.seconds}</span>
        <span className={styles.label}>Giây</span>
      </div>
    </div>
  );
};

export default Countdown;