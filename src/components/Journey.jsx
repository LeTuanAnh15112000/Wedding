'use client'
import Image from 'next/image'
import { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from '@/styles/journey.module.scss';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
export default function Journey() {
  const journeyRef = useRef("");
  const hTtileRef = useRef(null);
  const journeyTitleRef = useRef(null);
  const journeyShapeRef = useRef(null);
  const journeyImageRef = useRef([]);
  const journeyHollowRefs = useRef([]);

  useGSAP(() => {
    journeyImageRef.current.slice(0, 9).forEach((journeyImage, idx) => {
      const hollow = journeyHollowRefs.current[idx];
      if (!journeyImage || !hollow) return;
      
      const getParallaxDistance = () => {
        const isLandscape = window.innerHeight < window.innerWidth;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile && isLandscape) {
          return -300;
        } else if (window.innerWidth <= 490) {
          return -400;
        } else {
          return -520;
        }
      };
      
      gsap.fromTo(
        journeyImage,
        { y: 0 },
        {
          y: getParallaxDistance,
          scrollTrigger: {
            trigger: hollow,
            start: `top top`,
            end: "bottom bottom",
            endTrigger: journeyHollowRefs.current[idx + 1],
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    ScrollTrigger.create({
      trigger: journeyTitleRef.current,
      start: `top 0`,
      end: "bottom bottom",
      endTrigger: journeyRef.current,
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: journeyShapeRef.current,
      start: `top 0`,
      end: "bottom bottom",
      endTrigger: journeyRef.current,
      pin: true,
      pinSpacing: false,
    });

    const split = new SplitText(hTtileRef.current, { type: "lines" });
    gsap.from(split.lines, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: hTtileRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !journeyImageRef.current.includes(el)) {
      journeyImageRef.current.push(el);
    }
  };
  
  return (
    <section className={styles.journey} ref={journeyRef}>
      <div className={styles.journey_title} ref={journeyTitleRef}>
        <h3 ref={hTtileRef}>Discover our journey from chance encounter to true love.</h3>
        <span className={styles.journey_title_cover}></span>
      </div>
      <div className={styles.journey_shape} ref={journeyShapeRef}>
        <div className={styles.journey_block}>
          <div className={styles.journey_card}>
            <span className={styles.journey_outline}></span>
            <span className={`${styles.journey_outline} ${styles.journey_outline_2}`}></span>
            <Image 
              width={109}
              height={109}
              src="/home/flower.webp" 
              alt="Discover our journey from chance encounter to true love." 
              className={styles.journey_flower}
            />
            <div className={styles.journey_overflow}>
              <div className={styles.journey_image} ref={addToRefs}>
                <Image 
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/journey/img-journey01.jpg" 
                  alt="Discover our journey from chance encounter to true love." 
                />
              </div>
              <div className={styles.journey_image} ref={addToRefs}>
                <Image 
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/journey/img-journey02.jpg" 
                  alt="Discover our journey from chance encounter to true love." 
                />
              </div>
              <div className={styles.journey_image} ref={addToRefs}>  
                <Image 
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/journey/img-journey03.jpg" 
                  alt="Discover our journey from chance encounter to true love." 
                />
              </div>
                <div className={styles.journey_image} ref={addToRefs}>
                <Image 
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/journey/img-journey04.jpg" 
                  alt="Discover our journey from chance encounter to true love." 
                />
              </div>
              <div className={styles.journey_image} ref={addToRefs}>
                <Image 
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/journey/img-journey05.jpg" 
                  alt="Discover our journey from chance encounter to true love." 
                />
              </div>
              <div className={styles.journey_image} ref={addToRefs}>  
                <Image 
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/journey/img-journey06.jpg" 
                  alt="Discover our journey from chance encounter to true love." 
                />
              </div>
              <div className={styles.journey_image} ref={addToRefs}>  
                <Image 
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/journey/img-journey07.jpg" 
                  alt="Discover our journey from chance encounter to true love." 
                />
              </div>
              <div className={styles.journey_image} ref={addToRefs}>  
                <Image 
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/journey/img-journey08.jpg" 
                  alt="Discover our journey from chance encounter to true love." 
                />
              </div>
              <div className={styles.journey_image} ref={addToRefs}>  
                <Image 
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/journey/img-journey09.jpg" 
                  alt="Discover our journey from chance encounter to true love." 
                />
              </div>
              <div className={styles.journey_image} ref={addToRefs}>  
                <Image 
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/journey/img-journey10.jpg" 
                  alt="Discover our journey from chance encounter to true love." 
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.journey_shape_hollow} ref={el => { journeyHollowRefs.current[0] = el; }}></div>
        <div className={styles.journey_shape_hollow} ref={el => { journeyHollowRefs.current[1] = el; }}></div>
        <div className={styles.journey_shape_hollow} ref={el => { journeyHollowRefs.current[2] = el; }}></div>
        <div className={styles.journey_shape_hollow} ref={el => { journeyHollowRefs.current[3] = el; }}></div>
        <div className={styles.journey_shape_hollow} ref={el => { journeyHollowRefs.current[4] = el; }}></div>
        <div className={styles.journey_shape_hollow} ref={el => { journeyHollowRefs.current[5] = el; }}></div>
        <div className={styles.journey_shape_hollow} ref={el => { journeyHollowRefs.current[6] = el; }}></div>
        <div className={styles.journey_shape_hollow} ref={el => { journeyHollowRefs.current[7] = el; }}></div>
        <div className={styles.journey_shape_hollow} ref={el => { journeyHollowRefs.current[8] = el; }}></div>
        <div className={styles.journey_shape_hollow} ref={el => { journeyHollowRefs.current[9] = el; }}></div>
      </div>
    </section>
  );
}