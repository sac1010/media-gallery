import { Firestore, QuerySnapshot, addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
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

  export const convertMediaData = (mediaArray: { data: { type: string; size: number; }; }[]): { label: string; value: number; }[] => {
    const convertedData: { [key: string]: number; } = mediaArray.reduce((accumulator, item) => {
        const type = item.data.type === 'image' ? 'images' : 'videos';
        accumulator[type] = (accumulator[type] || 0) + (item.data.size || 0);
        return accumulator;
    }, {} as { [key: string]: number; });

    const data = Object.entries(convertedData).map(([label, value]) => ({ label, value }));
    return data;
};

export const deleteMedia = async (mediaId: string) => {
  try {
    // Create a reference to the document to be deleted
    const mediaRef = doc(db, "media", mediaId);

    // Delete the document
    await deleteDoc(mediaRef);

    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};



  