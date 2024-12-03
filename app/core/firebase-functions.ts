import axios from "axios";
import { httpsCallable } from "firebase/functions";
import Firebase from "./firebase";

interface GetNonceArgs {
  address: string;
  blockchain: string;
}

interface GetNonceResponse {
  nonce: string;
  userId: string;
}

interface VerifySignedMessageArgs {
  address: string;
  publicKey: string;
  signature: string;
}

interface VerifySignedMessageResponse {
  token: string;
}

interface GetUserNftsArgs {
  userId: string;
  limit?: number;
  offset?: number;
  includeStaked?: boolean;
}

interface AddSupportedCollectionArgs {
  slug: string;
  blockchain: string;
}

export async function getNonceToSign(
  args: GetNonceArgs,
): Promise<GetNonceResponse> {
  const response = await axios.post(
    `https://getnoncetosign-sbc2p4gjcq-uc.a.run.app`,
    args,
  );
  return response.data;
}

export async function verifySignedMessage(
  args: VerifySignedMessageArgs,
): Promise<VerifySignedMessageResponse> {
  try {
    const response = await axios.post(
      "https://verifysignedmessage-sbc2p4gjcq-uc.a.run.app/",
      // "http://127.0.0.1:5001/stacks-top-trumps/us-central1/verifySignedMessage",
      args,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying signed message:", error);
    throw error;
  }
}

export async function getUserNfts(args: GetUserNftsArgs) {
  const nfts = httpsCallable(Firebase.getFnsApp(), "getUserNfts");
  return await nfts(args);
}

export async function addSupportedCollection(args: AddSupportedCollectionArgs) {
  const addCollection = httpsCallable(
    Firebase.getFnsApp(),
    "addSupportedCollection",
  );
  return await addCollection(args);
}
