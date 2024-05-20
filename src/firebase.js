import { initializeApp } from 'firebase/app';
import {
  getDatabase, ref as dbRef, onValue, set,
} from 'firebase/database';
import {
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  ref as storeageRef,
} from 'firebase/storage';

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

const storage = getStorage(FirebaseApp);
const db = getDatabase(FirebaseApp);

function fetchModels() {
  const modelsRef = dbRef(db, 'vme-ar');
  onValue(modelsRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

async function addModels(userId, name, description, videoUrl, imageFile) {
  try {
    const imageRef = storeageRef(storage, `images/${imageFile.name + userId}`);
    const imageSnapshot = await uploadBytesResumable(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageSnapshot.ref);

    set(dbRef(db, `vme-ar/${userId}`), {
      name,
      description,
      video_link: videoUrl,
      link_image: imageUrl,
    });
  } catch (error) {
    return error;
  }
  return 'OK';
}

export {
  FirebaseApp, db, addModels, fetchModels,
};
