// src/utils/uploadProfilePicture.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

const uploadProfilePicture = async (file, userId) => {
    if (!file) return null;

    const fileRef = ref(storage, `profilePictures/${userId}/${file.name}`);
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);

    return fileUrl;
};

export default uploadProfilePicture;
