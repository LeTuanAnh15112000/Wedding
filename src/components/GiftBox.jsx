'use client'
import { useState } from 'react';
import { FaGift } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { BsBank2 } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import Heading from "./Heading";
import styles from '@/styles/giftbox.module.scss';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marmelad, quicksand } from '@/font/fonts';
import Image from 'next/image'

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function GiftBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState('');

  // Thông tin tài khoản ngân hàng
  const bankAccounts = [
    {
      id: 'groom', 
      name: 'Chú rể - Lê Tuấn Anh',
      bank: 'Vietcombank',
      accountNumber: '1017832321',
      qrCode: '/qr/groom-qr.jpg'
    },
     {
      id: 'bride',
      name: 'Cô dâu - Phạm Thị Kiều',
      bank: 'ACB',
      accountNumber: '1671407',
      qrCode: '/qr/bride-qr.jpg'
    }
  ];

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setCopiedAccount('');
  };

  const copyToClipboard = (accountNumber, accountId) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountId);
    setTimeout(() => setCopiedAccount(''), 2000);
  };

  return (
    <>
      <section className={styles.giftbox}>
        <div className="container">
          <Heading title="Hộp mừng cưới" color='pink' />
          <div className={styles.giftbox_content}>
            <p className={`${styles.giftbox_desc} ${marmelad.className}`}>
              Thật vui vì được gặp và đón tiếp các bạn trong một dịp đặc biệt như đám cưới của chúng tôi.
            </p>
            <div className={styles.giftbox_container}>
              <div className={styles.giftbox_wrapper} onClick={openModal}>
                <FaGift className={styles.giftbox_icon} />
                <div className={styles.giftbox_sparkles}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`${styles.modal_overlay} ${isModalOpen ? styles.active : ""}`} onClick={closeModal}>
        <div className={`${styles.modal_content} ${isModalOpen ? styles.active : ""}`} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modal_close} onClick={closeModal}>
            <IoClose />
          </button>
          <h3 className={`${styles.modal_title} ${marmelad.className}`}>Thông tin chuyển khoản</h3>
          <div className={styles.account_container}>
            {bankAccounts.map((account) => (
              <div key={account.id} className={styles.account_card}>
                <div className={styles.account_info}>
                  <div className={`${styles.account_header} ${marmelad.className}`}>
                    <BsBank2 className={styles.bank_icon} />
                    <div>
                      <h4>{account.name}</h4>
                      <p>{account.bank}</p>
                    </div>
                  </div>
                  <div className={styles.account_number}>
                    <span className={marmelad.className}>STK: {account.accountNumber}</span>
                    <button 
                      className={`${styles.copy_btn} ${copiedAccount === account.id ? styles.copied : ''}`}
                      onClick={() => copyToClipboard(account.accountNumber, account.id)}
                    >
                      <MdContentCopy />
                      {copiedAccount === account.id ? 'Đã sao chép!' : 'Sao chép'}
                    </button>
                  </div>
                </div>
                
                <div className={styles.qr_container}>
                  <Image 
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={account.qrCode} 
                    alt={`QR Code ${account.name}`}
                    className={styles.qr_image}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <p className={`${styles.modal_note} ${marmelad.className}`}>Cảm ơn tình cảm và sự hiện diện của các bạn! 💕</p>
        </div>
      </div>
    </>
  );
}