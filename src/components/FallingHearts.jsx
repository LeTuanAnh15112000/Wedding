'use client'
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/falling-hearts.module.scss';

export default function FallingHearts({ intensity = 'medium', enabled = true }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(enabled);

  // Cấu hình intensity - chỉ dùng interval, bỏ maxHearts
  const intensityConfig = {
    light: { interval: 800 },    // Ít trái tim hơn
    medium: { interval: 500 },   // Vừa phải
    heavy: { interval: 300 }     // Nhiều trái tim
  };

  const config = intensityConfig[intensity] || intensityConfig.medium;

  useEffect(() => {
    if (!enabled || !isVisible) return;

    const container = containerRef.current;
    if (!container) return;

    // Tạo trái tim rơi
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = styles.heart;
      
      // Random properties
      const startPosition = Math.random() * window.innerWidth;
      const animationDuration = Math.random() * 6 + 8; // 8-14 giây (rất chậm)
      const heartSize = Math.random() * 30 + 25; // 25-55px (size rất lớn)
      const drift = Math.random() * 100 - 50; // -50 đến 50px drift
      
      // HIỆN TẠI: Test với soft pink
      const heartSymbols = ['♥', '♡'];
      const heartSymbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      
      // Set style cho trái tim
      heart.style.position = 'absolute';
      heart.style.left = `${startPosition}px`;
      heart.style.top = '-50px';
      heart.style.fontSize = `${heartSize}px`;
      heart.style.animationDuration = `${animationDuration}s`;
      heart.style.setProperty('--drift', `${drift}px`);
      heart.textContent = heartSymbol;
      heart.style.zIndex = '1';
      
      // Random màu sắc trái tim
      const colors = [
        '#ff69b4', '#ff1493', '#dc143c', '#ff6b6b', 
        '#ff8a8a', '#ffc0cb', '#ffb6c1', '#ff91a4'
      ];
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(heart);
      
      // Xóa trái tim sau khi animation kết thúc
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, animationDuration * 1000);
    };

    // Tạo trái tim định kỳ - liên tục không giới hạn
    const heartInterval = setInterval(createHeart, config.interval);

    // Tạo một số trái tim ban đầu với delay ngẫu nhiên để tự nhiên hơn
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createHeart();
      }, Math.random() * 1500); // Random delay 0-1.5s
    }

    // Cleanup khi component unmount
    return () => {
      clearInterval(heartInterval);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [enabled, isVisible, intensity, config.interval]);

  // Tạm dừng hiệu ứng khi tab không active (tối ưu performance)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden && enabled);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={containerRef} className={styles.falling_hearts_container}></div>;
}