import React, { useEffect, useState } from "react";
import {
  auth,
  provider,

} from "../../firebaseConfig.js";
import { signInWithPopup, signInWithRedirect, signOut, User, UserCredential } from "firebase/auth";
import { Button, Pressable, Text, View } from "react-native";

const GoogleAuth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const signInWithGooglePopup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google (popup):", error);
    }
  };

  const signInWithGoogleRedirect = () => {
    signInWithRedirect(auth, provider);
  };

  // Handle sign-in result when using redirect method
  // useEffect(() => {
  //   getRedirectResult(auth)
  //     .then((result: UserCredential | null) => {
  //       // Type `result` explicitly here
  //       if (result) setUser(result.user);
  //     })
  //     .catch((error: any) => {
  //       console.error("Error during Google sign-in (redirect):", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
  //     // Specify `user` type here
  //     setUser(user);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // Sign out the user
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View>
      {/* <Text>Google Sign-In with Firebase</Text> */}
      {user ? (
        <View>
          <Text>Signed in as {user.displayName}</Text>
          <Pressable onPress={signOutUser}>Sign Out</Pressable>
        </View>
      ) : (
        <View>
          <Pressable onPress={signInWithGooglePopup}>
            <Text>Sign in with Google (Popup) </Text>
          </Pressable>
          <Pressable onPress={signInWithGoogleRedirect}>
            <Text> Sign in with Google (Redirect)</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default GoogleAuth;
