import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCzhqHdXfs40Oisn5gfnE7mfDiZ4xjurPQ',
  authDomain: 'ar-baotang.firebaseapp.com',
  projectId: 'ar-baotang',
  storageBucket: 'ar-baotang.appspot.com',
  messagingSenderId: '362272387514',
  appId: '1:362272387514:web:1217f08cbecc1763542d83',
  databaseURL:
    'https://ar-baotang-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const FirebaseApp = initializeApp(firebaseConfig);

const db = getDatabase(FirebaseApp);

function fetchModelsData() {
  const modelsRef = ref(db, 'vme-ar');
  onValue(modelsRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

fetchModelsData();

export default { FirebaseApp, db };
