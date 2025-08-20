'use client'
import { useEffect, Suspense } from 'react';
import Mainvisual from "@/components/Mainvisual";
import About from "@/components/About";
import Invitation from "@/components/Invitation";
import Journey from "@/components/Journey";
import Guestbook from "@/components/Guestbook";
import GiftBox from "@/components/GiftBox";
import Thank from "@/components/Thank";
import Album from "@/components/Album";
import EventWedding from "@/components/EventWedding";
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import AudioControl from "@/components/AudioControl"
import FallingHearts from '@/components/FallingHearts';

function HomeContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  
  useEffect(() => {
    if (success === 'true') {
      if (!toast.isActive('success-toast')) {
        toast.success('Gửi thông tin thành công!', { toastId: 'success-toast' });
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [success]);
  
  return (
    <div id="main-content">
      <Mainvisual />
      <About />
      <Journey />
      <Invitation />
      <Album />
      <EventWedding />
      <Guestbook />
      <GiftBox />
      <Thank />
      <AudioControl />
      <FallingHearts intensity="light" enabled={true} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}