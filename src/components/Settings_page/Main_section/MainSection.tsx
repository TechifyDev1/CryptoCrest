import { HiLogout } from 'react-icons/hi';
import { HiCamera, HiEnvelope, HiKey, HiPencil } from 'react-icons/hi2';
import { TbToggleLeft } from 'react-icons/tb';
import './Main.css';
import { auth } from '../../../Firebase/firebase-init';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useTheme } from '../../../contexts/ThemeContext';

const MainSection: React.FC = () => {
  const [username, setUsername] = useState<string>('John Doe');
  const navigate = useNavigate();
  const inputElementRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const { theme, toggleTheme } = useTheme();
  const handleThemeChange = () => {
    console.log(theme);
    toggleTheme();
    console.log(theme);
  };
  const handleClick = () => {
    inputElementRef.current?.click();
  }
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    try{
      if (!file) throw new Error('No file selected');
      const url = URL.createObjectURL(file);
      const uploadpreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      setImage(url);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadpreset);
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      setImage(res.data.secure_url);
      const user = auth.currentUser;
      if(user) await updateProfile(user, {photoURL: res.data.secure_url});
      else throw new Error("Unable to update profile");
      toast.success('Profile picture updated successfully');
    } catch(e: any) {
      console.error(e.message);
      toast.error('Error updating profile picture');
    }
  }
  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        toast.success("You've successfully logged out")
        console.log('User Logged out successfully');
      })
      .catch((e) => {
        toast.error("Error logging you out")
        console.error(e);
      });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || 'John Doe');
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="set-main-section">
      <div className="profile-header">
        <div className="img-edit">
          <img
            src={image || auth.currentUser?.photoURL || "https://randomuser.me/api/portraits/lego/5.jpg"}
            alt="profile"
          />
          <input type="file" name="image" id="image" ref={inputElementRef} style={{display: "none"}} onChange={handleFileChange} />
          <button className="edit-img" onClick={handleClick}>
            <HiCamera size={20} style={{ color: 'var(--primary-color)' }} />
          </button>
        </div>
        <div className="username-edit">
          <h1>{username}</h1>
          <button className="edit-username" onClick={() => navigate('/update-username')}>
            <HiPencil size={20} style={{ color: 'var(--primary-color)' }} />
          </button>
        </div>
      </div>
      <div className="main-settings">
        <div
          className="setting"
          onClick={() => navigate('/update-email')}
        >
          <div className="icon-div">
            <HiEnvelope size={20} style={{ color: 'var(--primary-color)' }} />
          </div>
          <p>Edit Email</p>
        </div>
        <div className="setting" onClick={() => navigate('/change-password')}>
          <div className="icon-div">
            <HiKey size={20} style={{ color: 'var(--primary-color)' }} />
          </div>
          <p>Change Password</p>
        </div>
        <div className="setting" onClick={handleThemeChange}>
          <div className="icon-div">
            <TbToggleLeft size={20} style={{ color: 'var(--primary-color)' }} />
          </div>
          <p>Change theme</p>
        </div>
        <div className="setting" onClick={handleLogout}>
          <div className="icon-div">
            <HiLogout size={20} style={{ color: 'var(--primary-color)' }} />
          </div>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
