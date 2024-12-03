import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Firebase from "../core/firebase";

export function useIsAdmin(userId: string | null) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!userId) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(Firebase.getDBApp(), "users", userId));
        setIsAdmin(userDoc.data()?.isAdmin === true);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAdminStatus();
  }, [userId]);

  return { isAdmin, isLoading };
}
