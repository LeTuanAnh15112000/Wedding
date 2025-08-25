'use client'
import { useRef, useEffect } from "react"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import styles from "@/styles/loading.module.scss";
import { poppins, greatVibes } from '@/font/fonts';
import Image from 'next/image'
import { useLoading } from "@/contexts/LoadingContext";

gsap.registerPlugin(useGSAP, SplitText);

export default function Loading() {
  const planeTextRef = useRef(null);
  const { setLoadingComplete, hasShownBefore } = useLoading();

  useEffect(() => {
    // Show body immediately to prevent flash
    gsap.set("body", { opacity: 1 });
    
    if (hasShownBefore) {
      // If loading has been shown before, hide loading and show content immediately
      gsap.set(`.${styles.loading}`, { y: "-100vh" });
      gsap.set("#main-content", { opacity: 1});
      // Ensure scroll is enabled
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      setLoadingComplete(true);
    }
  }, [hasShownBefore, setLoadingComplete]);

  
  useGSAP(() => {
    // Skip animation if loading has been shown before
    if (hasShownBefore) {
      return;
    }

    // Store original overflow values
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    // Disable scroll during loading
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Calculate plane movement
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const xCalculated = vw + 0.55 * vh;
    const yCalculated = vh + 0.55 * vw;

    // Prepare split text for plane caption
    const textEl = planeTextRef.current;
    let split;
    if (textEl) {
      split = new SplitText(textEl, { type: "words" });
      gsap.set(split.words, { y: 60, opacity: 0 });
    }

    // Check if screen width is less than 768px
    const isMobile = window.innerWidth < 769;

    // Create loading animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Restore scroll when loading is complete
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.overflow = originalBodyOverflow;
        gsap.set("#main-content", { opacity: 1});
        document.cookie = "loadingShown=1; path=/; max-age=86400"; // 1 day
        setLoadingComplete(true);
      }
    });

    // Loading animation sequence
    tl.to(`.${styles.loading_cover}`, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut"
    })
    .to(`.${styles.loading_plane}`, {
      y: 0,
      duration: 1.5,
      ease: "power2.inOut"
    })
    .to(`.${styles.loading_plane_img}`, {
      [isMobile ? 'y' : 'x']: isMobile ? "55vh" : "-55vh",
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        if (split) {
          gsap.to(split.words, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
          });
        }
      }
    })
    .to(`.${styles.loading_plane}`, {
      [isMobile ? 'y' : 'x']: isMobile ? -yCalculated : xCalculated,
      duration: 2.5,
      delay: 2,
      ease: "power2.inOut"
    })
    .to(`.${styles.loading_text_inner}`, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    })
    .to(`.${styles.loading}`, {
      [isMobile ? 'opacity' : 'y']: isMobile ? "0" : "-100vh",
      duration: 1.5,
      ease: "power2.inOut",
      delay: 1.5
    });

    // Cleanup function to restore scroll if component unmounts
    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [hasShownBefore]);

  return (
    <div className={styles.loading}>
      <div className={styles.loading_cover}></div>
      <div className={styles.loading_text}>
        <div className={`${styles.loading_text_inner} ${poppins.className}`}>
          <h2>Welcome to<br/><span>MY WEEDING</span></h2>
        </div>
      </div>
      <div className={styles.loading_plane}>
        <span className={styles.loading_plane_img}>
          <Image 
            width={0}
            height={0}
            sizes="100vw"
            src="/plane.png" 
            alt="" 
          />
        </span>
        <div className={`${styles.loading_plane_text} ${greatVibes.className}`}>
          <span ref={planeTextRef}>Let the love take flight</span>
        </div>
      </div>
    </div>
  );
}