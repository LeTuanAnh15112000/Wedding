'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/rsvp.module.scss';
import { marmelad } from '@/font/fonts';
import { GoArrowLeft } from 'react-icons/go';
import Link from 'next/link';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const RSVP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 'Nhà trai',
    attend: 'Có, tôi sẽ đến',
    message: '',
  });

  const [errorCheck, setErrorCheck] = useState({
    name: '',
    phone: '',
  });

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const groomNameRef = useRef<HTMLSpanElement>(null);
  const brideNameRef = useRef<HTMLSpanElement>(null);
  const heartImageRef = useRef<HTMLImageElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement[]>([]);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const backLinkRef = useRef<HTMLParagraphElement>(null);

  // Add field refs
  const addToFieldsRef = (el: HTMLDivElement | null) => {
    if (el && !fieldsRef.current.includes(el)) {
      fieldsRef.current.push(el);
    }
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([logoRef.current, titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      // Set initial states for name elements
      gsap.set(groomNameRef.current, {
        opacity: 0,
        x: -100
      });

      gsap.set(brideNameRef.current, {
        opacity: 0,
        x: 100
      });

      gsap.set(heartImageRef.current, {
        opacity: 0,
        scale: 0.5
      });

      // Set initial state for entire form
      gsap.set(formRef.current, {
        opacity: 0,
        y: 30
      });

      // Header animations timeline
      const headerTl = gsap.timeline();
      
      headerTl
        .to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.2
        })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.5")
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4");

      // Names animation - heart fades in first, then names slide in from sides
      const namesTl = gsap.timeline({ delay: 1.0 });
      
      namesTl
        .to(heartImageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)"
        })
        .to(groomNameRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.2")
        .to(brideNameRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6");

      // Form fade in animation
      gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.8
      });

      // Logo hover animation (keeping only logo hover)
      if (logoRef.current) {
        const logo = logoRef.current;
        logo.addEventListener('mouseenter', () => {
          gsap.to(logo, {
            scale: 1.1,
            rotation: 5,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        logo.addEventListener('mouseleave', () => {
          gsap.to(logo, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorCheck(prev => ({
      ...prev,
      [e.target.name]: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let hasError = false;
    const newErrors = { name: '', phone: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
      hasError = true;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
      hasError = true;
    }
    setErrorCheck(newErrors);
    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await response.json();
      setFormData({
        name: '',
        phone: '',
        guests: 'Nhà trai',
        attend: 'Có, tôi sẽ đến',
        message: '',
      });
      setErrorCheck({ name: '', phone: '' });
      setIsLoading(false);
      router.push("/?success=true");
    } catch {
      toast.error("Xảy ra lỗi trong quá trình xác nhận");
      setIsLoading(false);
    }
  };

  return (
    <>
      {
        isLoading &&
        <div className="loader">
          <div className="loader_inner">
            <div className="loader_square"></div>
            <div className="loader_square"></div>
            <div className="loader_square"></div>
            <div className="loader_square"></div>
            <div className="loader_square"></div>
            <div className="loader_square"></div>
            <div className="loader_square"></div>
          </div>
        </div>
      }
      <div ref={containerRef} className={styles.invite}>
        <div ref={headerRef} className={styles.invite_block}>
          <div ref={logoRef} className={styles.invite_logo}>
            <Image
              fill
              src="/invite/img-invite.jpg"
              alt="Discover our journey from chance encounter to true love."
            />
          </div>
          <h2 ref={titleRef} className={`${styles.invite_title} ${marmelad.className}`}>XÁC NHẬN THAM DỰ</h2>
          <p ref={subtitleRef} className={`${styles.invite_subtitle} ${marmelad.className}`}>Đám cưới của</p>
          <h1 ref={nameRef} className={styles.invite_name}>
            <span ref={groomNameRef}>Tuấn Anh</span><Image ref={heartImageRef} height={50} width={50} src="/invite/heart.gif" alt="Discover our journey from chance encounter to true love." /><span ref={brideNameRef}>Phạm Kiều</span>
          </h1>
        </div>
        <div ref={formRef} className={`${styles.invite_form} ${marmelad.className}`}>
          <form onSubmit={handleSubmit}>
            <div ref={addToFieldsRef} className={styles.invite_field}>
              <label>Họ và tên <span>(*)</span></label>
              {errorCheck.name && <span className={styles.invite_error}>{errorCheck.name}</span>}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={marmelad.className}
                placeholder="Nhập họ và tên ..."
              />
            </div>
            <div ref={addToFieldsRef} className={styles.invite_field}>
              <label>Số điện thoại <span>(*)</span></label>
              {errorCheck.phone && <span className={styles.invite_error}>{errorCheck.phone}</span>}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={marmelad.className}
                placeholder="Nhập số điện thoại ..."
              />
            </div>
            <div ref={addToFieldsRef} className={`${styles.invite_field} ${styles.invite_field_select}`}>
              <label>Chọn sự kiện tham dự</label>
              <div className={styles.invite_field_radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="guests"
                    value="Nhà trai"
                    checked={formData.guests === 'Nhà trai'}
                    onChange={handleChange}
                  />
                  <span className={styles.invite_field_checkmark}></span>
                  Nhà trai
                </label>
                <label>
                  <input
                    type="radio"
                    name="guests"
                    value="Nhà gái"
                    checked={formData.guests === 'Nhà gái'}
                    onChange={handleChange}
                  />
                  <span className={styles.invite_field_checkmark}></span>
                  Nhà gái
                </label>
              </div>
            </div>
            <div ref={addToFieldsRef} className={`${styles.invite_field} ${styles.invite_field_select}`}>
              <label>Xác nhận tham dự</label>
              <div className={styles.invite_field_radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="attend"
                    value="Có, tôi sẽ đến"
                    checked={formData.attend === 'Có, tôi sẽ đến'}
                    onChange={handleChange}
                  />
                  <span className={styles.invite_field_checkmark}></span>
                  Có, tôi sẽ đến
                </label>
                <label>
                  <input
                    type="radio"
                    name="attend"
                    value="Xin lỗi, tôi bận mất rồi"
                    checked={formData.attend === 'Xin lỗi, tôi bận mất rồi'}
                    onChange={handleChange}
                  />
                  <span className={styles.invite_field_checkmark}></span>
                  Xin lỗi, tôi bận mất rồi
                </label>
              </div>
            </div>
            <div ref={addToFieldsRef} className={styles.invite_field}>
              <label>Gửi lời nhắn</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`${styles.invite_textarea} ${marmelad.className}`}
                placeholder="Gửi lời nhắn đến cô dâu chú rể ..."
              />
            </div>
            <button ref={submitButtonRef} type="submit" className={`${styles.invite_submitButton} ${marmelad.className}`}>Xác nhận</button>
          </form>
          <p ref={backLinkRef} className={`${styles.invite_back} ${marmelad.className}`}>
            <Link href="/">
              <GoArrowLeft className={styles.invite_back_icon} /> Về Website đám cưới
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RSVP;