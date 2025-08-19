
import styles from '@/styles/eventWedding.module.scss';
import Heading from '@/components/Heading';
import Image from 'next/image';
import { marmelad, philosopher, quicksand, dancingScript } from '@/font/fonts';
import { FaHeart } from "react-icons/fa6";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function EventWedding() {
  useGSAP(() => {
    const items = gsap.utils.toArray(`.${styles.eventWedding_item}`);
    if (items[0]) {
      gsap.from(items[0], {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: items[0],
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
    if (items[1]) {
      gsap.from(items[1], {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: items[1],
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);
  return (
    <section className={styles.eventWedding}> 
      <div className="container">
        <Heading title="Thiệp Mời" color='pink' />
        <p className={`${styles.eventWedding_desc} ${marmelad.className}`}>Hãy cùng chúng tôi tận hưởng một ngày tràn ngập tình yêu, tiếng cười và những kỷ niệm khó quên khi chúng tôi tổ chức lễ cưới. Chúng tôi rất mong được chia sẻ khoảnh khắc đặc biệt này với bạn!</p>
        <div className={`${styles.eventWedding_box} ${marmelad.className}`}>
          <div className={styles.eventWedding_item}>
            <h4 className={styles.eventWedding_heading}>Thiệp cưới nhà trai</h4>
            <div className={styles.eventWedding_card}>
              <div className={styles.eventWedding_family}>
                <div className={styles.eventWedding_family_item}>
                  <div className={`${styles.eventWedding_family_title} ${philosopher.className}`}>Nhà Trai</div>
                  <div className={`${styles.eventWedding_family_name} ${quicksand.className}`}>Bố: Lê Thanh Hùng<br/>Mẹ: Võ Thị Nhiển</div>
                  <div className={`${styles.eventWedding_family_address} ${quicksand.className}`}>Ấp Mỹ Thành, Xã Định Mỹ, H.Thoại Sơn - An Giang</div>
                </div>
                <div className={styles.eventWedding_family_item}>
                  <div className={`${styles.eventWedding_family_title} ${philosopher.className}`}>Nhà Gái</div>
                  <div className={`${styles.eventWedding_family_name} ${quicksand.className}`}>Bố: Phạm Văn Bùi<br/>Mẹ: Lê Thị Huỳnh Nga</div>
                  <div className={`${styles.eventWedding_family_address} ${quicksand.className}`}>Ấp Trung Phú 3, Xã Vĩnh Phú, H.Thoại Sơn - An Giang</div>
                </div>
              </div>
              <h4 className={`${styles.eventWedding_welcome} ${quicksand.className}`}>TRÂN TRỌNG KÍNH MỜI<span>Bạn + người thương</span></h4>
              <p className={`${styles.eventWedding_txt} ${quicksand.className}`}>TỚI DỰ BỮA CƠM THÂN MẬT VÀ CHUNG VUI<br />CÙNG VỚI GIA ĐÌNH</p>
              <div className={`${styles.eventWedding_name} ${dancingScript.className}`}>
                <h5>Lê Tuấn Anh</h5>
                <p>
                  <span><FaHeart /></span>
                  <span><FaHeart /></span>
                </p>
                <h5>Phạm Thị Kiều</h5>
              </div>
              <p className={`${styles.eventWedding_info1} ${quicksand.className}`}>ĐƯỢC TỔ CHỨC VÀO HỒI<span>10 GIỜ</span></p>
              <div className={styles.eventWedding_info2}>
                <span>THỨ 3</span>
                <span className= {`${dancingScript.className}`}>02</span>
                <span>09-2025</span>
              </div>
              <p className={styles.eventWedding_info3}>Nhầm ngày 11 tháng 7 năm Ất Tỵ</p>
              <p className={styles.eventWedding_info4}>TẠI: TƯ GIA NHÀ TRAI<span>Mỹ Thành - Định Mỹ - Thoại Sơn - An Giang</span></p>
              <p className={`${styles.eventWedding_info5} ${dancingScript.className}`}>Rất hân hạnh được đón tiếp</p>
            </div>
            <div className={styles.eventWedding_btn}>
              <Link href="/rsvp">Xác nhận tham dự</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=10.3336691,105.2891967&dir_action=navigate" target="_blank" rel="noopener noreferrer">Xem bản đồ</a>
            </div>
          </div>
          <div className={styles.eventWedding_item}>
            <h4 className={styles.eventWedding_heading}>Thiệp cưới nhà gái</h4>
            <div className={styles.eventWedding_card}>
              <div className={styles.eventWedding_family}>
                <div className={styles.eventWedding_family_item}>
                  <div className={`${styles.eventWedding_family_title} ${philosopher.className}`}>Nhà Gái</div>
                  <div className={`${styles.eventWedding_family_name} ${quicksand.className}`}>Bố: Phạm Văn Bùi<br/>Mẹ: Lê Thị Huỳnh Nga</div>
                  <div className={`${styles.eventWedding_family_address} ${quicksand.className}`}>Ấp Trung Phú 3, Xã Vĩnh Phú, H.Thoại Sơn - An Giang</div>
                </div>
                <div className={styles.eventWedding_family_item}>
                  <div className={`${styles.eventWedding_family_title} ${philosopher.className}`}>Nhà Trai</div>
                  <div className={`${styles.eventWedding_family_name} ${quicksand.className}`}>Bố: Lê Thanh Hùng<br/>Mẹ: Võ Thị Nhiển</div>
                  <div className={`${styles.eventWedding_family_address} ${quicksand.className}`}>Ấp Mỹ Thành, Xã Định Mỹ, H.Thoại Sơn - An Giang</div>
                </div>
              </div>
              <h4 className={`${styles.eventWedding_welcome} ${quicksand.className}`}>TRÂN TRỌNG KÍNH MỜI<span>Bạn + người thương</span></h4>
              <p className={`${styles.eventWedding_txt} ${quicksand.className}`}>TỚI DỰ BỮA CƠM THÂN MẬT VÀ CHUNG VUI<br />CÙNG VỚI GIA ĐÌNH</p>
              <div className={`${styles.eventWedding_name} ${dancingScript.className}`}>
                <h5>Phạm Thị Kiều</h5>
                <p>
                  <span><FaHeart /></span>
                  <span><FaHeart /></span>
                </p>
                <h5>Lê Tuấn Anh</h5>
              </div>
              <p className={`${styles.eventWedding_info1} ${quicksand.className}`}>ĐƯỢC TỔ CHỨC VÀO HỒI<span>10 GIỜ</span></p>
              <div className={styles.eventWedding_info2}>
                <span>THỨ 2</span>
                <span className= {`${dancingScript.className}`}>01</span>
                <span>09-2025</span>
              </div>
              <p className={styles.eventWedding_info3}>Nhầm ngày 10 tháng 7 năm Ất Tỵ</p>
              <p className={styles.eventWedding_info4}>TẠI: TƯ GIA NHÀ GÁI<span>Trung Phú 3 - Vĩnh Phú - Thoại Sơn - An Giang</span></p>
              <p className={`${styles.eventWedding_info5} ${dancingScript.className}`}>Rất hân hạnh được đón tiếp</p>
            </div>
            <div className={styles.eventWedding_btn}>
              <Link href="/rsvp">Xác nhận tham dự</Link>
              <a href="https://www.google.com/maps/search/?api=1&query=10.3336691,105.2891967&dir_action=navigate" target="_blank" rel="noopener noreferrer">Xem bản đồ</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.eventWedding_cover}>
        <Image
          src="/event-wedding.jpg"
          alt="Wedding Event Cover"
          width={0}
          height={0}
          sizes='100vw'
        />
      </div>
    </section>
  )
}
