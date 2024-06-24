"use client";

import { HederaChainId } from "@hashgraph/hedera-wallet-connect";

export default function ClientComponent() {
  return (
    <>
      <h1>{HederaChainId.Mainnet}</h1>
    </>
  );
}
