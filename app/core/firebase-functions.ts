import axios from "axios";

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
