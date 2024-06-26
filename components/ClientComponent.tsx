"use client";

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
      console.log("Importing Hedera Wallet Connect module...");

      const {
        DAppConnector,
        HederaJsonRpcMethod,
        HederaSessionEvent,
        HederaChainId,
      } = await import("@hashgraph/hedera-wallet-connect");

      console.log("Configure DAppConnector...");

      const dAppConnector = new DAppConnector(
        dAppMetadata,
        // @ts-ignore
        "testnet",
        projectId,
        Object.values(HederaJsonRpcMethod),
        [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
        [HederaChainId.Testnet]
      );

      console.log("Initialize Hedera Wallet Connect...");

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
