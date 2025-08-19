import style from '@/styles/footer.module.scss';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className='container'>
        <p className={style.footer_logo}>Tuấn Anh<br/><small>&amp;</small><br/>Phạm Kiều</p>
      </div>  
    </footer>
  );
}
  
