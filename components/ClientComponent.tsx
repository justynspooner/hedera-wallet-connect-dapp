"use client";

import {
  DAppConnector,
  HederaChainId,
  HederaJsonRpcMethod,
  HederaSessionEvent,
} from "@hashgraph/hedera-wallet-connect";

import { useEffect, useState } from "react";

const dAppMetadata = {
  name: "Hedera Wallet Connect",
  url: "https://hedera.com",
  icons: ["https://hedera.com/images/favicon.ico"],
  description: "Hedera Wallet Connect",
};

const projectId = "my-project-id";

export default function ClientComponent() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const setupWalletConnect = async () => {
      console.log("Loading Hedera Wallet Connect...");

      console.log("Initializing Hedera Wallet Connect...");
      const dAppConnector = new DAppConnector(
        dAppMetadata,
        // @ts-ignore
        "testnet",
        projectId,
        Object.values(HederaJsonRpcMethod),
        [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
        [HederaChainId.Testnet]
      );

      console.log("Connecting Hedera Wallet Connect...");

      await dAppConnector.init({ logger: "error" });

      console.log("Hedera Wallet Connect Initialized");

      setIsInitialized(true);
    };

    setupWalletConnect();
  }, []);

  return (
    <>
      <h1>Client Component</h1>
      <p>Is Initialized: {isInitialized ? "Yes" : "No"}</p>
    </>
  );
}
