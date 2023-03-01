import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "./config";

export const createUserDocument = async (user) => {
  //Get a reference to the Firestore document
  const docRef = doc(db, "users", user.uid);

  //Create user object
  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    adress: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    specialty: "",
    ip: "",
  };

  //write to Cloud Firestore
  // return docRef.set(userProfile);
  // return await db.collection("users").doc(user.id).set(userProfile);
  return await setDoc(docRef, userProfile);
};

export const updateUserDocument = async (data) => {
  const docRef = doc(db, "users", data.uid);
  await updateDoc(docRef, data);
};

export const uploadImage = (userId, file, Progress) => {
  return new Promise((resolve, reject) => {
    // create file reference
    const filePath = `users/${userId}/profile-image`;
    const fileRef = ref(storage, filePath);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(fileRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        Progress(progress);
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default: //default
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          default: // Unknown error occurred, inspect error.serverResponse
        }
        reject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

export const getUploadedFile = (userId) => {
  const filePath = `users/${userId}/profile-image`;
  const fileRef = ref(storage, filePath);
  return new Promise((resolve, reject) => {
    getDownloadURL(fileRef)
      .then((downloadURL) => {
        resolve(downloadURL);
      })
      .catch(() => {
        reject(null);
      });
  });
};
