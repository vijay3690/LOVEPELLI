// // SignInWithEmail.js
// import React, { useState } from 'react';
// import { supabase } from './matrimonyform/createprofile/supabaseClient';

// function SignInWithEmail() {
//   const [email, setEmail] = useState('');

//   const handleSignIn = async () => {
//     const { error } = await supabase.auth.signInWithOtp({ email });
//     if (error) alert('Error sending OTP');
//     else alert('Check your email for OTP link');
//   };

//   return (
//     <>
//       <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <button onClick={handleSignIn}>Send OTP</button>
//     </>
//   );
// }

// export default SignInWithEmail;