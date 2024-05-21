import { initializeApp } from 'firebase/app';
import {
  getDatabase, ref as dbRef, set, get,
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

async function getLastId() {
  const modelsRef = dbRef(db, 'models');
  let max = -1;
  const snapshot = await get(modelsRef);
  snapshot.forEach((childSnapshot) => {
    if (Number(childSnapshot.key) > max) {
      max = Number(childSnapshot.key);
    }
  });
  return max;
}
async function addModels(name, description, videoUrl, imageFile) {
  try {
    const userId = Number(await getLastId()) + 1;
    const imageRef = storeageRef(storage, `images/${imageFile.name + userId}`);
    const imageSnapshot = await uploadBytesResumable(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageSnapshot.ref);
    set(dbRef(db, `models/${userId}`), {
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
  FirebaseApp, db, addModels,
};
