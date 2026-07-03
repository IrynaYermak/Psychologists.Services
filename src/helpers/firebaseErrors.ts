export default function getFirebaseError(code: string) {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered";

    case "auth/invalid-email":
      return "Invalid email address";

    case "auth/wrong-password":
      return "Wrong password";

    case "auth/user-not-found":
      return "User not found";

    case "auth/weak-password":
      return "Password is too weak";

    default:
      return "Something went wrong. Try again.";
  }
}
