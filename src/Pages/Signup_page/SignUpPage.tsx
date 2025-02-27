import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { ChangeEvent } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import image from '../../assets/landing_page/signup.svg';
import { auth, db } from '../../Firebase/firebase-init';
import './SignUp.css';
import { toast } from 'sonner';

const SignUpPage: React.FC = () => {
  const handleSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const toastId = toast.loading('Signing you up, please wait');
    
    try {
      // Check if the username already exists in Firestore (for signup)
      const userRef = doc(db, 'users', username.toLowerCase());
      const currencyRef = doc(db, 'currencies', username.toLowerCase());
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        throw new Error('Username already exists, please choose another one');
      }
  
      // Create the user with Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const userId = user.uid;
  
      // Create user data object
      const userInfo = {
        username,
        email,
        userId,
      };
  
      // Update the display name in Firebase Authentication
      await updateProfile(user, { displayName: username });
  
      // Set the document in Firestore once the user is authenticated
      // This ensures the user is authenticated before the write happens
      await setDoc(userRef, userInfo);
      await setDoc(currencyRef, {});
  
      toast.dismiss(toastId);
      toast.success('You have successfully signed up');
      console.log('User created successfully');
    } catch (e: any) {
      console.error(e.message);
      if (e.message === 'Username already exists, please choose another one') {
        toast.error('Username already exists, please choose another one');
      } else {
        toast.error('Unable to sign you up, please try again');
      }
      toast.dismiss(toastId);
    }
  };
  
  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      if (!user) throw new Error('Unable to sign you up, please try again');
      await updateProfile(user, { displayName: user.email?.split('@')[0] });
      const email = user.email;
      const userId = user.uid;
      const username = email?.split('@')[0] as string;
      const userRef = doc(db, 'users', username?.toLowerCase());
      const userSnap = await getDoc(userRef);
      if (userSnap.exists())
        throw new Error('You already have an account, please login');
      const userInfo = {
        username,
        email,
        userId,
      };
      await setDoc(userRef, userInfo);
      console.log('User created successfully');
    } catch (e: any) {
      if (e.message === 'You already have an account, please login') {
        // Sign out the user if they already have an account
        await auth.signOut();
      }
      console.error(e.message);
    }
  };
  return (
    <div className="sign-up-page">
      <div className="img">
        <img src={image} alt="" />
      </div>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="signup-nav">
          <div className="signup"> Signup </div>
          <div className="signin">
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'var(--text-color)' }}
            >
              {' '}
              Login{' '}
            </Link>
          </div>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Let’s Get Started! Join CryptoCrest Now
        </h2>
        <div className="form-grp">
          <HiOutlineUser className="signup-icon" />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Unique username"
            required
          />
        </div>
        <div className="form-grp">
          <HiOutlineMail className="signup-icon" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            required
          />
        </div>
        <div className="form-grp">
          <HiOutlineLockClosed className="signup-icon" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Strong password"
            required
          />
        </div>
        <button className="signup-btn" type="submit">
          SignUp
        </button>
        <div className="alternative">Or Signup with</div>
        <button
          className="signup-google"
          type="button"
          onClick={handleGoogleSignUp}
        >
          <FcGoogle size={25} className="google-icon" />
          <h2>oogle</h2>
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
