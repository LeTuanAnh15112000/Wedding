'use client';
import { marmelad, playfairDisplay } from '@/font/fonts';
import Heading from '@/components/Heading';
import styles from '@/styles/guestbook.module.scss';
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";
import { CiFaceSmile } from "react-icons/ci";
import { useState, useRef, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Emoji, init } from 'emoji-mart';
import { database, ref, push, onValue } from '@/lib/firebase/firebase';

export default function Guestbook() {
  const listSuggest = [
    "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
    "Chúc mừng ngày trọng đại tới hai bạn. Hạnh phúc bền lâu và trọn vẹn nhé!",
    "Chúc mừng hạnh phúc hai bạn. Chúc hai bạn bên nhau đầu bạc răng long, sớm có thiên thần nhỏ nhé!",
    "Chúc hai bạn ngày vui hạnh phúc. Hãy yêu thương nhau thật nhiều và sống thật hạnh phúc nha!",
    "Chúc hai bạn sớm có con đàn cháu đống, cửa nhà lúc nào cũng đầm ấm, yên vui nhé!",
    "Thật vui vì cuối cùng ngày này cũng tới với bạn. Tôi thành tâm chúc hai bạn thật nhiều hạnh phúc và sống đời vui vẻ cùng nhau mãi mãi!",
    "Một chương mới đã mở ra với hai bạn rồi. Tôi mong cuộc sống mới của cả hai sẽ tràn ngập hy vọng, hạnh phúc và niềm vui!",
    "Chúc đôi trai tài gái sắc hạnh phúc trọn vẹn, luôn yêu thương nhau thật nhiều!",
    "Chia vui cùng bạn trong ngày trọng đại này. Cầu mong cuộc sống sau này của 2 vợ chồng thật thuận hòa, may mắn, làm ăn phát tài nha.",
    "Tôi mong tình yêu của hai bạn thật bền chặt, gắn bó để xây dựng tổ ấm yên bình, hạnh phúc!",
    "Hai bạn của tôi chắc chắn sẽ có được nhiều hạnh phúc. Mong hai bạn có sức khỏe dồi dào, làm ăn phát đạt và sớm có cháu cho ông bà bồng bế nhé!",
    "Gửi lời chúc mừng chân thành nhất tới bạn của tôi. Chúc hai bạn một cuộc sống thật tuyệt vời, hòa thuận, gắn bó son sắt, thủy chung, hạnh phúc lâu dài.",
    "Nơi nào có yêu thương nơi đó chắc chắn hạnh phúc. Hai bạn đã tìm được nơi đủ đầy yêu thương rồi, hãy cùng nắm tay nhau đi hết cuộc đời nhé!",
    "Khởi đầu một cuộc sống mới, nguyện ước cho bạn của tôi những ngày tháng hạnh phúc phía trước để cùng xây dựng tổ ấm với người bạn đời. Happy ending!",
    "Mình tin rằng đây sẽ là khởi đầu cho những điều tốt đẹp sắp tới trong cuộc sống của hai bạn. Hãy yêu thương và cùng nhau vượt qua mọi khó khăn trong cuộc sống nhé.",
    "Hôn nhân đánh dấu sự kết thúc một câu chuyện tình yêu và bắt đầu một trận đấu vật. Chúc bạn những điều tốt đẹp nhất.",
    "Tôi sẽ nói cho bạn bí mật của một cuộc hôn nhân hạnh phúc. Đó vẫn là … một bí mật cho tất cả! Chúc bạn tất cả những điều tốt đẹp nhất của thời gian phía trước.",
    "Hôn nhân thật đẹp. Cuối cùng bạn đã tìm thấy một người mà bạn bị làm phiền suốt cuộc đời.",
    "Hai trở thành một: Một giường, một điều khiển từ xa, một phòng tắm! Xin chúc mừng đám cưới hai bạn.",
    "Chúc đôi trai tài gái sắc nhà mình hạnh phúc vẹn tròn, cung hỷ cung hỷ!",
    "Chúc mừng anh trai của em đã có người rước nhé. Em mong anh chị có cuộc sống vui vẻ, hạnh phúc phía trước, làm ăn phát tài phát lộc.",
    "Anh chị là một cặp trời sinh, chắc chắn sau này sẽ rất hạnh phúc. Em chúc anh chị sức khỏe dồi dào, làm ăn phát đạt và sớm có thiên thần nhỏ cho vui cửa vui nhà.",
    "Hôm nay là ngày vui của anh chị và cũng là ngày em rất hạnh phúc. Chúc anh chị mãi yêu thương nhau như bây giờ và đạt được mọi ước nguyện trong cuộc sống.",
    "Chúc anh/chị/em trăm năm hạnh phúc, thuận vợ thuận chồng.",
    "Hôm nay chú rể đẹp trai, cô dâu xinh gái. Chúc mừng ngày thành hôn hai bạn tôi!",
    "Chúc mừng đôi bạn trẻ nhé! Mãi yêu thương nhau đến đầu bạc răng long bạn nha!",
    "Thay mặt team (tên nhóm) chúc hai bạn ngày ngày ân ái, bên nhau trọn đời.",
    "Happy wedding! Chúc hai bạn có cuộc sống mới ngập tràn tiếng cười và niềm vui, sớm có thiên thần nhỏ bồng bé!"
  ];

  const [suggest, setSuggest] = useState([]);
  const [isSuggest, setIsSuggest] = useState(false);
  const inputSearch = useRef(null);
  const autoCompleteRef = useRef(null);
  const emojiRef = useRef(null);
  const [suggestData, setSuggestData] = useState({
    name: '',
    suggest: '',
  });
  const [isEmoji, setIsEmoji] = useState(false);
  const textareaRef = useRef(null);  
  const [errorCheck, setErrorCheck] = useState({
    name: '',
    suggest: '',
  });
  init({ data });

  const [wishesList, setWishesList] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target)) {
        setIsSuggest(false);
      }
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setIsEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const wishesRef = ref(database, 'wishes');
    onValue(wishesRef, (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.values(data) : [];
      setWishesList(list);
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIsSuggest = () => {
    setIsSuggest((prev) => {
      const next = !prev;
      if (next) {
        setSuggest(listSuggest);
        if (inputSearch.current) inputSearch.current.value = "";
      }
      return next;
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    const keyword = value.trim().toLowerCase();
    setSuggest(
      keyword
        ? listSuggest.filter((item) => item.toLowerCase().includes(keyword))
        : listSuggest
    );
  };

  const handleGetSearch = (e) => {
    const value = e.currentTarget.innerText;
    setSuggestData({ ...suggestData, suggest: value });
  };

  const handleData = (e) => {
    setSuggestData({ ...suggestData, [e.target.name]: e.target.value });
    setErrorCheck(prev => ({
      ...prev,
      [e.target.name]: ''
    }));
  };
  
  const handleIsEmoji = () => {
    setIsEmoji(!isEmoji);
  };

  const handleAddEmoji = (e) => {
    const cursorPos = textareaRef.current?.selectionStart || 0;
    const before = suggestData.suggest.substring(0, cursorPos);
    const after = suggestData.suggest.substring(cursorPos);
    const updated = before + e.native + after;
    setSuggestData({ ...suggestData, suggest: updated });
    setTimeout(() => {
      if (textareaRef.current) {
        const newPos = cursorPos + e.native.length;
        textareaRef.current.selectionStart = newPos;
        textareaRef.current.selectionEnd = newPos;
        textareaRef.current.focus();
      }
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { name: '', phone: '' };
    if (!suggestData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên.';
      hasError = true;
    } 
    if (!suggestData.suggest.trim()) {
      newErrors.suggest = 'Vui lòng nhập lời chúc.';
      hasError = true;  
    }
    setErrorCheck(newErrors);
    if (hasError) {
      console.log('Dữ liệu không hợp lệ:', newErrors);
      return;
    }

    if (suggestData.name && suggestData.suggest) {
      const newWish = {
        name: suggestData.name,
        wish: suggestData.suggest,
        time: new Date().toLocaleString(),
      };

      push(ref(database, 'wishes'), newWish)
        .then(() => {
          console.log('Dữ liệu đã được lưu:', newWish);
          setSuggestData({ name: '', suggest: '' });
          if (textareaRef.current) textareaRef.current.focus();
        })
        .catch((error) => {
          console.error('Lỗi khi lưu dữ liệu:', error);
        });
    } else {
      console.log('Dữ liệu không hợp lệ:', suggestData);
    }
  };

  return (
    <section className={styles.guestbook} id='guestbook'>
      <div className={styles.guestbook_box}>
        <div className={styles.guestbook_block}>
          <Heading title="Sổ Lưu Bút" color='pink' />
          <div className={`${styles.guestbook_form} ${marmelad.className}`}>
            <form onSubmit={handleSubmit}>
              <div className={styles.guestbook_field}>
                <label>Họ và tên <span>(*)</span></label>
                {errorCheck.name && <span className={styles.guestbook_error}>{errorCheck.name}</span>}
                <input
                  type="text"
                  name="name"
                  value={suggestData.name}
                  onChange={handleData}
                  placeholder="Tên của bạn*"
                />
              </div>
              <div className={styles.guestbook_field}>
                <label>Nhập lời chúc của bạn <span>(*)</span></label>
                {errorCheck.suggest && <span className={styles.guestbook_error}>{errorCheck.suggest}</span>}
                <textarea
                  ref={textareaRef}
                  name="suggest"
                  value={suggestData.suggest}
                  onChange={handleData}
                  placeholder="Nhập lời chúc của bạn*"
                />
                <div className={styles.guestbook_textareaIcons}>
                  <span className={styles.guestbook_suggest} onClick={handleIsSuggest}>
                    {isSuggest ? <LuLightbulbOff /> : <LuLightbulb />}
                  </span>
                  <span className={styles.guestbook_icon} onClick={handleIsEmoji}>
                    <CiFaceSmile />
                  </span>
                  <div className={`${styles.guestbook_autocomplete} ${isSuggest && styles.guestbook_autocomplete_active}`} ref={autoCompleteRef}>
                    <div className={styles.guestbook_autocomplete_search}>
                      <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        onChange={handleSearch}
                        ref={inputSearch}
                      />
                      <span><IoSearchOutline /></span>
                    </div>
                    <ul id="wishSuggestions">
                      {suggest.length === 0 ? (
                        <li className={styles.guestbook_autocomplete_noresults}>
                          Không có kết quả tìm kiếm
                        </li>
                      ) : (
                        suggest.map((suggest, idx) => (
                          <li key={idx} onClick={handleGetSearch}>
                            {suggest}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className={`${styles.guestbook_emoji} ${isEmoji && styles.guestbook_emoji_active}`} ref={emojiRef}>
                    <Picker data={data} onEmojiSelect={handleAddEmoji} />
                  </div>
                </div>
              </div>
              <p className={`btn-primary is-pink ${playfairDisplay.className} ${styles.guestbook_btn}`}>
                <button type="submit">
                  <span className="h-lines"></span>
                  <span className="v-lines"></span>
                  <span className="h-lines"></span>
                  <span className="v-lines"></span>
                  GỬI LỜI CHÚC
                </button>
              </p>
            </form>
          </div>
          <ul className={`${styles.guestbook_list} ${marmelad.className}`}>
            {wishesList.map((wish, idx) => (
              <li className={styles.guestbook_item} key={idx}>
                <p><span className={styles.guestbook_item_name}>{wish.name}</span><span className={styles.guestbook_item_time}>{wish.time}</span></p>
                <p>{wish.wish}</p>
              </li>
            ))}
          </ul>
        </div>
        <span className={styles.guestbook_box_cover}></span>
      </div>
    </section>
  );
}