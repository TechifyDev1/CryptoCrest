import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { ChangeEvent, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiLockClosed, HiOutlineUser } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import image from '../../assets/landing_page/login.svg';
import { auth, db } from '../../Firebase/firebase-init';
import './Login.css';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const toastId = toast.loading('Logging you in, please wait');
    try {
      const userRef = doc(db, 'users', username.toLowerCase());
      console.log(username.toLowerCase());
      const usersnap = await getDoc(userRef);
      if (usersnap.exists()) {
        const user = usersnap.data();
        setEmail(user?.email);
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User Logged In');
      } else {
        toast.dismiss(toastId);
        throw new Error('Wrong Username or Password');
      }
      toast.dismiss(toastId);
      toast.success('You have successfully logged in');
    } catch (e: any) {
      console.log(e.message);
      if (e.message === 'Wrong Username or Password') {
        toast.error('Wrong Username or Password');
      } else {
        toast.error('An error occurred, please try again');
      }
    }
  };
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      const username = user?.displayName;
      if (!username) {
        await signOut(auth);
        throw new Error("You're yet to sign up");
      }
      const userRef = doc(db, 'users', username);
      const usersnap = await getDoc(userRef);
      if (!usersnap.exists()) {
        await signOut(auth);
        throw new Error("You're yet to sign up");
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };
  return (
    <div className="login-page">
      <div className="img">
        <img src={image} alt="login image" />
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-nav">
          <div className="signup">
            <Link
              to="/signup"
              style={{ textDecoration: 'none', color: 'var(--text-color)' }}
            >
              {' '}
              SignUp{' '}
            </Link>
          </div>
          <div className="login">Login</div>
        </div>
        <h2 style={{ textAlign: 'center', margin: '1rem' }}>
          Welcome Back! Dive Into Your Crypto Insights
        </h2>
        <div className="form-grp">
          <HiOutlineUser className="icons" />
          <input
            type="text"
            name="username"
            id="username"
            className="username"
            placeholder="Enter your user name"
          />
        </div>
        <div className="form-grp">
          <HiLockClosed className="icons" />
          <input
            type="password"
            name="password"
            id="password"
            className="password"
            placeholder="Enter your password"
          />
        </div>
        <button className="login-btn" type="submit">
          Login
        </button>
        <p style={{marginBottom: "1rem"}}>Damn, I forgot my password <Link style={{textDecoration: "none"}} to="/forgotten-password">Reset</Link></p>
        <div className="alternative">Or Login with</div>
        <button
          className="login-google"
          type="button"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={25} className="google-icon" />
          <h2>oogle</h2>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
