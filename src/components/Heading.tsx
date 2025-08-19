import { marmelad } from '@/font/fonts';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';

interface TitleProp {
  title: string;
  color: 'pink' | 'white';
}
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Heading(props: TitleProp) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    const splitHeading = new SplitText(headingRef.current, { type: "words" });
    gsap.from(splitHeading.words, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);
  const { title, color } = props;
  return (
    <h3 className={`h_title ${marmelad.className} is-${color}`} ref={headingRef}>{title}</h3>
  );
}
  
