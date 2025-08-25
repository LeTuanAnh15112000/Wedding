'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'
import styles from '@/styles/about.module.scss';
import { marmelad, quicksand } from '@/font/fonts';
import { useLoading } from "@/contexts/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const saveDateRef = useRef(null);
  const nameRef = useRef(null);
  const dateRef = useRef(null);
  const descRef = useRef(null);
  const figure1Ref = useRef(null);
  const block1Ref = useRef(null);
  const figure2Ref = useRef(null);
  const block2Ref = useRef(null);
  const { isLoadingComplete, hasShownBefore } = useLoading();

  useEffect(() => {
    if (!hasShownBefore && !isLoadingComplete) {
      // Delay registering ScrollTriggers until loading completes on first visit
      return;
    }
    const ctx = gsap.context(() => {
      // Header section animation
      gsap.to([saveDateRef.current, nameRef.current, dateRef.current, descRef.current], 
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );

      // First about item - figure from left, block from right
      gsap.to(figure1Ref.current,
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: figure1Ref.current,
            start: "top 85%",
            end: "top 15%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.to(block1Ref.current,
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block1Ref.current,
            start: "top 85%",
            end: "top 15%",
            toggleActions: "play none none none"
          }
        }
      );

      // Second about item - figure from right, block from left
      gsap.to(figure2Ref.current,
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: figure2Ref.current,
            start: "top 85%",
            end: "top 15%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.to(block2Ref.current,
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block2Ref.current,
            start: "top 85%",
            end: "top 15%",
            toggleActions: "play none none none"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [hasShownBefore, isLoadingComplete]);
 
  return(
    <section ref={sectionRef} className={styles.about}>
      <div className="container">
        <figure ref={saveDateRef} className={styles.about_save_date}>
          <Image 
            width={0}
            height={0}
            sizes="100vw"
            src="/home/save_date.png" 
            alt="Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025" 
          />
        </figure>
        <h3 ref={nameRef} className={styles.about_name}>Tuấn Anh &nbsp; & &nbsp; Phạm Kiều</h3>
        <p ref={dateRef} className={`${styles.about_date} ${marmelad.className}`}>02-09-2025</p>
        <p ref={descRef} className={`${styles.about_desc} ${marmelad.className}`}>Gặp nhiều người ở thời điểm khác nhau cũng không huy hoàng bằng gặp đúng người đúng thời điểm.</p>
        <div className={styles.about_list}>
          <div className={styles.about_item}>
            <figure ref={figure1Ref}>
              <Image 
                width={0}
                height={0}
                sizes="100vw"
                src="/about/img-about01.jpg" 
                alt="Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025" 
              />
            </figure>
            <div ref={block1Ref} className={styles.about_block}>
              <h4 className={styles.about_tlt}>Tuấn Anh</h4>
              <p className={`${styles.about_txt} ${quicksand.className}`}>Tuấn Anh – chàng trai nhẹ nhàng, giàu tình cảm. Mỗi ngày thức dậy, anh nghĩ về một người. Trước khi đi ngủ, anh cũng nghĩ về một người… Và như thế, ngày hôm đó trở nên thật trọn vẹn. Cảm ơn vì anh đã gặp được em – Phạm Kiều. Anh mong rằng, dù sau này có ra sao, chúng ta vẫn mãi yêu thương nhau, vẫn nắm chặt tay nhau đi đến hết con đường còn lại, em nhé!</p>
            </div>
          </div>
          <div className={styles.about_item}>
            <figure ref={figure2Ref}>
              <Image 
                width={0}
                height={0}
                sizes="100vw"
                src="/about/img-about02.jpg" 
                alt="Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025" 
              />
            </figure>
            <div ref={block2Ref} className={styles.about_block}>
              <h4 className={styles.about_tlt}>Phạm Kiều</h4>
              <p className={`${styles.about_txt} ${quicksand.className}`}>Phạm Kiều – cô gái xinh tươi, luôn tràn đầy niềm vui. Duyên phận là gì? Chính là giữa hàng vạn người, anh gặp được đúng người cần gặp; giữa mênh mông vô tận của thời gian, không sớm một bước, cũng không muộn một giây. Trang gửi lời nhắn: 'Mong rằng cuộc sống sau này sẽ thật dịu dàng với em, để niềm vui và hạnh phúc luôn ở bên em.'</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}