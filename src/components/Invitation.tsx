'use client'
import styles from '@/styles/invitation.module.scss';
import Image from 'next/image'
import { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playfairDisplay, marmelad } from '@/font/fonts';
import Heading from '@/components/Heading';
import Countdown from '@/components/Countdown';
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Invitation() {
  const invitationRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLElement | null>(null);
  const figureRef = useRef<HTMLElement | null>(null);
  const inviteRef = useRef<HTMLElement | null>(null);
  const coverRef = useRef<HTMLElement | null>(null);
  
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: backgroundRef.current,
      start: `top 0`,
      end: "bottom bottom",
      endTrigger: invitationRef.current,
      pin: true,
      pinSpacing: false,
    });

    gsap.fromTo(
      figureRef.current,
      {},
      {
        width: '100%', 
        height: '100%',
        borderRadius: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: backgroundRef.current,
          start: 'top top',
          endTrigger: inviteRef.current,
          end: 'top bottom',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      coverRef.current,
      {},
      {
        opacity: '0.8',
        ease: 'none',
        scrollTrigger: {
          trigger: backgroundRef.current,
          start: 'top top',
          endTrigger: inviteRef.current,
          end: 'top bottom',
          scrub: true,
        },
      }
    );    
  }, []);

  const handleConfirmClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('/rsvp', '_self');
  };

  return (
    <section className={styles.invitation} ref={invitationRef}>
      <div className={styles.invitation_background} ref={backgroundRef as React.RefObject<HTMLDivElement>}>
        <figure ref={figureRef}>
          <Image 
            fill
            src="/home/invitation/img-invitation.jpg" 
            alt="" 
          />
          <span className={styles.invitation_cover}  ref={coverRef}></span>
        </figure>
      </div>
      <div className={styles.invitation_shape}></div>
      <div className={styles.invitation_shape}></div>
      <div className={styles.invitation_info} ref={inviteRef as React.RefObject<HTMLDivElement>}>
        <Heading title= "The Big Day!" color='pink'/>
        <div className={styles.invitation_info_box}>
          <div className={`${styles.invitation_info_title} ${marmelad.className}`}>
            <h4>Save<span>THE</span>Date</h4>
          </div>
          <div className={styles.invitation_info_detail}>
            <h5 className={marmelad.className}>Tuấn Anh<span>&</span>Phạm Kiều</h5>
            <p className={`${styles.invitation_info_desc} ${marmelad.className}`}>Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng mình có thêm một niềm hạnh phúc!</p>
            <p className={`btn-primary ${playfairDisplay.className} ${styles.invitation_info_btn}`}>
              <a href="#">
                <span className="h-lines"></span>
                <span className="v-lines"></span>
                <span className="h-lines"></span>
                <span className="v-lines"></span>
                GỬI LỜI CHÚC
              </a>
            </p>
            <p className={`btn-primary ${playfairDisplay.className} btn02`}>
              <a href="#" onClick={handleConfirmClick}>
                <span className="h-lines"></span>
                <span className="v-lines"></span>
                <span className="h-lines"></span>
                <span className="v-lines"></span>
                XÁC NHẬN THAM DỰ
              </a>
            </p>
            <p className={`${styles.invitation_info_date} ${marmelad.className}`}>02 tháng 09 2025</p>
            <Countdown />
          </div>
        </div>
      </div>
    </section>
  );
}
  
