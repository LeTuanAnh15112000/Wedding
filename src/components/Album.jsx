'use client'
import Heading from "./Heading";
import styles from '@/styles/album.module.scss';
import Image from 'next/image';
import {SlideshowLightbox} from 'lightbox.js-react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function Album() {
    const images = [
        {
            src: '/album/img-album01.jpg',
            alt: 'Album ảnh cưới Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025',
        },
        {
            src: '/album/img-album02.jpg',
            alt: 'Album ảnh cưới Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025',
        },
        {
            src: '/album/img-album03.jpg',
            alt: 'Blue lake surrounded by mountains',
        },
        {
            src: '/album/img-album04.jpg',
            alt: 'Album ảnh cưới Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025',
        },
        {
            src: '/album/img-album05.jpg',
            alt: 'Album ảnh cưới Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025',
        },
        {
            src: '/album/img-album06.jpg',
            alt: 'Blue lake surrounded by mountains',
        },
        {
            src: '/album/img-album07.jpg',
            alt: 'Album ảnh cưới Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025',
        },
        {
            src: '/album/img-album08.jpg',
            alt: 'Album ảnh cưới Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025',
        },
        {
            src: '/album/img-album09.jpg',
            alt: 'Album ảnh cưới Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025',
        },
        {
            src: '/album/img-album10.jpg',
            alt: 'Album ảnh cưới Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025',
        },
        {
            src: '/album/img-album11.jpg',
            alt: 'Album ảnh cưới Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025',
        },
        {
            src: '/album/img-album12.jpg',
            alt: 'Album ảnh cưới Lê Tuấn Anh và Phạm Thị Kiều trong lễ cưới 01&02/09/2025',
        },
    ]

  useGSAP(() => {
    const items = gsap.utils.toArray(`.${styles.album_item}`);
    // Tạo timeline để animate tuần tự từng ảnh
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.album_list}`,
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });

    // Animate từng ảnh với stagger 0.4s
    tl.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.3, // Mỗi ảnh xuất hiện sau ảnh trước 0.4s
    });
  }, []);

  return (
    <section className={styles.album}>
        <div className="container">
            <Heading title="Album Hình Cưới" color='pink' />
            <SlideshowLightbox className={styles.album_list} lightboxIdentifier="lightbox1" framework="next" images={images}>
                {images.map((image, index) => (
                    <div className={styles.album_item} key={index}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={0} height={0} sizes="100vw"
                            data-lightboxjs="lightbox1"
                            quality={80}
                        />
                    </div>
                ))}
            </SlideshowLightbox>
        </div>
    </section>
  );
}