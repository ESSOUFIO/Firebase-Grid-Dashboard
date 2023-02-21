import {
  doc,
  setDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import app from "./firebase/config";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let db = getFirestore(app);
  const [data, setData] = useState();

  async function getCities(db) {
    const citiesCol = collection(db, "cities");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setData(cityList);
    return cityList;
  }

  useEffect(() => {
    getCities(db);
  }, [db]);

  const clickHandler = () => {
    getCities(db);
  };

  const addHandler = async () => {
    await setDoc(doc(db, "cities", "8"), {
      title: "8th title",
      description: "8th description",
    });
    getCities(db);
  };

  return (
    <>
      <Header />
      <h1>Firebase demo</h1>
      <button onClick={clickHandler}>Fetch</button>
      <button onClick={addHandler}>Insert</button>
    </>
  );
}

export default App;
