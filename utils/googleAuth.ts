// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE_URL } from "@/app/constants";

// const iosClientId = "";
// const webClientId = "";

// interface GoogleSignInOptions {
//   onSuccess?: (userData: any) => void;
//   onError?: (error: string) => void;
//   setLoading?: (isLoading: boolean) => void;
// }

// export const configureGoogleSignIn = () => {
//   try {
//     GoogleSignin.configure({
//       iosClientId,
//       webClientId,
//       scopes: ["profile", "email"],
//       offlineAccess: true,
//     });

//     return true;
//   } catch (error) {
//     console.error("[GoogleAuth] Failed to configure Google Sign-In:", error);
//     return false;
//   }
// };

// export const handleGoogleSignIn = async ({
//   onSuccess,
//   onError,
//   setLoading,
// }: GoogleSignInOptions): Promise<boolean> => {
//   if (setLoading) setLoading(true);

//   try {
//     const configSuccess = configureGoogleSignIn();
//     if (!configSuccess) {
//       onError?.("Failed to configure Google Sign-In");
//       return false;
//     }

//     const hasPlayServices = await GoogleSignin.hasPlayServices({
//       showPlayServicesUpdateDialog: true,
//     });

//     try {
//       await GoogleSignin.signOut();
//     } catch (signOutError) {
//       console.error("Failed to sign out:", signOutError);
//     }

//     const user = await GoogleSignin.signIn();
//     const tokens = await GoogleSignin.getTokens();

//     if (user) {
//       try {
//         const response = await fetch(`${API_BASE_URL}/auth/social-login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             provider_name: "google",
//             access_token: tokens.accessToken,
//             device_type: Platform.OS,
//           }),
//         });

//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data.message || "Authentication failed");
//         }

//         const { token, user: userData } = data.data;
//         await AsyncStorage.setItem("token", token);

//         onSuccess?.(userData);
//         return true;
//       } catch (apiError: any) {
//         onError?.(apiError.message || "Authentication failed");
//         return false;
//       }
//     } else {
//       onError?.("Failed to get valid credentials from Google");
//       return false;
//     }
//   } catch (error: any) {
//     onError?.(error.message);
//     return false;
//   } finally {
//     if (setLoading) setLoading(false);
//   }
// };
