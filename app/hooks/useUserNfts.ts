import { useEffect, useState } from "react";
import { getUserNfts } from "../core/firebase-functions";

export interface UserNft {
  id: string;
  name: string;
  description?: string;
  image?: string;
  collection: string;
  attributes: Record<string, string | number>;
}

export function useUserNfts(userId: string | null) {
  const [nfts, setNfts] = useState<UserNft[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchNfts() {
      if (!userId) {
        setNfts([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getUserNfts({
          userId,
          includeStaked: true,
        });

        setNfts(response.data as UserNft[]);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to fetch NFTs"),
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchNfts();
  }, [userId]);

  return {
    nfts,
    isLoading,
    error,
  };
}
