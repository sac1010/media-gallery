import { Firestore, QuerySnapshot, addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { FileData } from "../components/Upload";
import { User } from "firebase/auth";
import { db } from "../firebase";

 export const fetchMediaByUser = async (userId: string | undefined): Promise<QuerySnapshot> => {
    try {
      // Create a query to fetch documents where 'uploadedBy' field matches the userId
      const mediaRef = collection(db, 'media');
      const q = query(mediaRef, where('uploadedBy', '==', userId), orderBy('__name__', 'asc'));
  
      // Fetch documents from Firestore
      const querySnapshot = await getDocs(q);
      
      return querySnapshot;
    } catch (error) {
      console.error('Error fetching media:', error);
      throw error;
    }
  };

  export const addMedia = async (fileData: FileData, user: User | null | undefined) => {
    try {
      // Ensure user is authenticated
      if (!user) {
        throw new Error("User not authenticated");
      }
  
      // Add data to the 'media' collection
      const mediaRef = collection(db, "media");
      await addDoc(mediaRef, {
        ...fileData,
        uploadedBy: user.uid, 
      });
  
      console.log("Media added successfully");
    } catch (error: any) {
      console.error("Error adding media:", error.message);
    }
  };

  export const convertMediaData = (mediaArray:any) => {
    const convertedData = mediaArray.reduce((accumulator: { [x: string]: any; }, item: { data: { type: string; size: any; }; }) => {
      const type = item.data.type === 'image' ? 'images' : 'videos';
      accumulator[type] = (accumulator[type] || 0) + (item.data.size || 0);
      return accumulator;
    }, {});
  
    const data = Object.entries(convertedData).map(([label, value]) => ({ label, value }));
    return data;
  };

  