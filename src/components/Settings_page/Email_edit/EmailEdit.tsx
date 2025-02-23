import {
  GoogleAuthProvider,
  reauthenticateWithPopup,
  unlink,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import './email-edit.css';
import { auth } from '../../../Firebase/firebase-init';
import { ChangeEvent } from 'react';
import { toast } from 'sonner';
const EmailEdit: React.FC<{ toggleEmailEdit: boolean }> = ({
  toggleEmailEdit,
}) => {
  const handleChangeEmail = async (
    e: ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const loader = toast.loading('Updating....');
    const formData = new FormData(e.target);
    const oldEmail = formData.get('oldEmail') as string;
    const newEmail = formData.get('newEmail') as string;

    try {
      const user = auth.currentUser; // Directly get current user
      if (!user) throw new Error('You have no account here');
      if (user.email !== oldEmail) throw new Error('Invalid previous email');

      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === 'google.com'
      );

      if (isGoogle) {
        toast.warning("You signed up with Google, so we'll reauthenticate you");

        const googleProvider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, googleProvider);

        // Ask for a new password and validate it
        const newpassword = prompt('Please input your new password');
        if (!newpassword || newpassword.length < 6)
          throw new Error('Please input a valid password');

        // Set password before unlinking Google
        await updatePassword(user, newpassword);

        // Unlink Google
        await unlink(user, 'google.com');
      }

      // Finally, update email
      await updateEmail(user, newEmail);

      toast.dismiss(loader);
      toast.success('Email updated successfully');
    } catch (e: any) {
      toast.dismiss(loader); // Dismiss the loading toast even on error
      toast.error(e.message);
      console.log(e);
    }
  };

  return (
    <div
      className="email-edit-container"
      style={{ transform: toggleEmailEdit ? '' : 'translateY(100%)' }}
    >
      <form className="email-edit-form" onSubmit={handleChangeEmail}>
        <input
          type="email"
          name="oldEmail"
          id="old-email"
          placeholder="Enter your old email"
          required
        />
        <input
          type="email"
          name="newEmail"
          id="new-email"
          placeholder="Enter your new email"
          required
        />
        <button type="submit" className="update-btn">
          Update!
        </button>
      </form>
    </div>
  );
};

export default EmailEdit;
