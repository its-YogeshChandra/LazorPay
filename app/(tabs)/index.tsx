import React from "react"
import { View, Text, Button } from "react-native"
import { LazorKitProvider, useWallet } from '@lazorkit/wallet-mobile-adapter'


export default function Index() {
  return (
    <LazorKitProvider
      rpcUrl="https://api.devnet.solana.com"
      portalUrl="https://portal.lazor.sh"
      configPaymaster={{
        paymasterUrl: "https://kora.devnet.lazorkit.com"
      }}>
      <View className="flex-1 bg-blue-600">
        <Button
          title="Uranus"
        />
      </View>

    </LazorKitProvider >
  )
}
