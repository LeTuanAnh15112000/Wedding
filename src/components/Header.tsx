'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import style from '@/styles/header.module.scss';
import { FaHeart } from "react-icons/fa";
import { useLoading } from '@/contexts/LoadingContext';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const groomNameRef = useRef<HTMLSpanElement>(null);
  const brideNameRef = useRef<HTMLSpanElement>(null);
  const heartRef = useRef<HTMLSpanElement>(null);
  const { isLoadingComplete, hasShownBefore } = useLoading();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([groomNameRef.current, brideNameRef.current, heartRef.current], {
        opacity: 0
      });

      gsap.set(groomNameRef.current, {
        x: -100
      });

      gsap.set(brideNameRef.current, {
        x: 100
      });

      gsap.set(heartRef.current, {
        scale: 0.3
      });

      // Only start animation when loading is complete
      if (isLoadingComplete) {
        const delay = hasShownBefore ? 0.5 : 0.5; // Shorter delay if loading was skipped
        
        // Animation timeline - heart fades in first, then names slide in
        const tl = gsap.timeline({ delay });
        
        tl.to(heartRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        })
        .to(groomNameRef.current, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out"
        }, "-=0.3")
        .to(brideNameRef.current, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out"
        }, "-=0.7");
      }

    }, headerRef);

    return () => ctx.revert();
  }, [isLoadingComplete, hasShownBefore]);

  return (
    <header ref={headerRef} className={style.header}>
      <h1>
        <span ref={groomNameRef}>Tuấn Anh</span> 
        <span ref={heartRef} className={style.header_icon}><FaHeart /></span> 
        <span ref={brideNameRef}>Phạm Kiều</span>
      </h1>
    </header>
  );
}
