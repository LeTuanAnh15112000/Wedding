'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import style from '@/styles/mainvisual.module.scss';
import { playfairDisplay } from '@/font/fonts';
import Link from 'next/link';
import { useLoading } from '@/contexts/LoadingContext';

gsap.registerPlugin(SplitText);

export default function Mainvisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLParagraphElement>(null);
  const { isLoadingComplete, hasShownBefore } = useLoading();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text for title animation
      const titleSplit = new SplitText(titleRef.current, { type: "words,chars" });
      
      // Set initial states for content elements
      gsap.set(titleSplit.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90
      });

      gsap.set(nameRef.current, {
        opacity: 0,
        scale: 0.5
      });

      gsap.set(dateRef.current, {
        opacity: 0,
        y: 50
      });

      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 30
      });

      // Only start animation when loading is complete
      if (isLoadingComplete) {
        const delay = hasShownBefore ? 0.5 : 0.5; // Same delay as Header
        
        // First: Fade in the container simultaneously with Header
        const containerTl = gsap.timeline({ delay });
        containerTl.to(containerRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out"
        });

        // Second: Content animations start after container fade-in
        const contentDelay = delay + 1.4; // Container fade + small buffer
        const contentTl = gsap.timeline({ delay: contentDelay });
        
        // Title animation - chars appear one by one
        contentTl.to(titleSplit.chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(1.7)"
        })
        // Names scale in with bounce
        .to(nameRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)"
        }, "-=0.5")
        // Date slides up
        .to(dateRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3")
        // Button fades in
        .to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.2");

        // Add floating animation to names
        gsap.to(nameRef.current, {
          y: -10,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: contentDelay + 4
        });

        // Add subtle pulse to button
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 1.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: contentDelay + 5
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isLoadingComplete, hasShownBefore]);

  return (
    <div ref={containerRef} className={`${style.mainvisual}`}>
      <div className="container">
        <h2 ref={titleRef} className={style.mainvisual_title}>Cùng chúng tôi viết nên câu chuyện tình yêu</h2>
        <h3 ref={nameRef} className={style.mainvisual_name}>Tuấn Anh &nbsp; &amp; &nbsp; Phạm kiều</h3>
        <span ref={dateRef} className={style.mainvisual_date}>September 2, 2025</span>
        <p ref={buttonRef} className={`btn-primary ${playfairDisplay.className}`}>
          <Link href='#guestbook' scroll={true}>
            <span className="h-lines"></span>
            <span className="v-lines"></span>
            <span className="h-lines"></span>
            <span className="v-lines"></span>
            GỬI LỜI CHÚC
          </Link>
        </p>
      </div>
    </div>
  );
}