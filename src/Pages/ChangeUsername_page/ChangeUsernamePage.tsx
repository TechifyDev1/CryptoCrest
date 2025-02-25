import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";
import { auth, db } from "../../Firebase/firebase-init";
import "./Changeusername.css"
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ChangeUsernamePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value as string);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentusername = auth.currentUser?.displayName;
    const toastId = toast.loading('Changing username, please wait...');
    
    try {
        if (!currentusername) throw new Error("You are not authenticated, please login");

        const userRef = doc(db, "users", currentusername);
        const currencyRef = doc(db, "currencies", currentusername);

        // Get existing user data
        const userSnap = await getDoc(userRef);
        const currencySnap = await getDoc(currencyRef);

        if (!userSnap.exists() || !currencySnap.exists()) {
            throw new Error("User or currency document does not exist");
        }

        const userData = userSnap.data();
        const currencyData = currencySnap.data();

        // Create new documents with new username as ID
        const newUserRef = doc(db, "users", username.toLowerCase());
        const newCurrencyRef = doc(db, "currencies", username.toLowerCase());

        await setDoc(newUserRef, userData);
        await setDoc(newCurrencyRef, currencyData);

        // Delete old documents
        await deleteDoc(userRef);
        await deleteDoc(currencyRef);

        const user = auth.currentUser;
        if (!user) throw new Error("You are not authenticated, please login");
        await updateProfile(user, { displayName: username });

        setUsername('');
        toast.dismiss(toastId);
        toast.success('Username changed successfully');
        navigate('/dashboard');
    } catch (error: any) {
        console.error(error.message);
        toast.error(error.message);
        toast.dismiss(toastId);
    }
};


  return (
    <div className="change-username">
      <h1>Update your username</h1>
      <form onSubmit={handleSubmit} className="change-username-form">
        <label htmlFor="username" style={{width: "100%", textAlign: "left"}}>Username</label>
        <input type="text" value={username} onChange={handleChange} placeholder="Please type in your new username" />
        <button type="submit">Change</button>
      </form>
    </div>
  );
}

export default ChangeUsernamePage;