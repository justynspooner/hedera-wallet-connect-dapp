"use client";

import {
  DAppConnector,
  HederaChainId,
  HederaJsonRpcMethod,
  HederaSessionEvent,
} from "@hashgraph/hedera-wallet-connect";

import { LedgerId } from "@hashgraph/sdk";
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
      const dAppConnector = new DAppConnector(
        dAppMetadata,
        LedgerId.TESTNET,
        projectId,
        Object.values(HederaJsonRpcMethod),
        [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
        [HederaChainId.Testnet]
      );

      await dAppConnector.init({ logger: "error" });

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
