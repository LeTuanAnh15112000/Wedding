import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC01-uSw6t4MIf5w0v7.bvPrmbL",
  authDomain: "wedding-invitation-b477e.firebaseapp.com",
  databaseURL: "https://wedding-invitation-b477e-default-rtdb.firebaseio.com",
  projectId: "wedding-invitation-b477e",
  storageBucket: "wedding-invitation-b477e.appspot.com",
  messagingSenderId: "27386758383",
  appId: "1:27386758383:web:9ec224a0d2ab9981b8a8",
  measurementId: "G-EHKG0BLVC"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Hàm kiểm tra kết nối
const testConnection = () => {
  const testRef = ref(database, 'test_connection');
  console.log('testRef:', testRef);
  set(testRef, { connected: true, timestamp: new Date().toISOString() })
    .then(() => console.log('Kết nối Firebase thành công!'))
    .catch((error) => console.error('Lỗi kết nối Firebase:', error));
};

export { database, ref, push, onValue, testConnection };