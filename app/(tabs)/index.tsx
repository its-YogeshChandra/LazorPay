import React, { useEffect } from "react"
import { LazorKitProvider, useWallet } from '@lazorkit/wallet-mobile-adapter'
import { View, Text, Pressable, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Fingerprint, ScanFace, Wallet, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react-native';
import * as Linking from "expo-linking"
import { BuyWidget } from "@/components/buy";
import { SwapWidget } from "@/components/swap";
import { SendWidget } from "@/components/send";
import { ReceiveWidget } from "@/components/receive";
const paymaster_config =
{
  paymasterUrl: "https://kora.devnet.lazorkit.com"
}

const modefunctionobject = {
  send: SendWidget,
  buy: BuyWidget,


}

export default function Index() {
  // check if the user has the wallet  
  const value = useWallet();
  const redirect_url = Linking.createURL("/profile")

  //function to connecting to portal 
  async function connecttoportal() {
    console.log("pass key clicked ")
    await value.connect({
      redirectUrl: redirect_url,
      onSuccess: (wallet) => console.log('Connected', wallet.smartWallet),
      onFail: (error) => console.log('Connection failed', error)
    })
  }

  //const figureland 
  console.log(value.isConnected)
  return (
    <LazorKitProvider
      rpcUrl="https://api.devnet.solana.com"
      portalUrl="https://portal.lazor.sh"
      configPaymaster={paymaster_config}>
      <SafeAreaView className="flex-1 bg-slate-950">
        <StatusBar barStyle="light-content" />

        {/* Main Container */}
        <View className=" w-full mt-36 px-6 pt-4">

          {/* Top Section: Branding & Hero */}
          <View className="mt-10">
            <View className="self-center">
              <View className=" self-start bg-blue-600 p-6 rounded-full border border-blue-800 mb-8">
                <ShieldCheck size={64} color="#8b5cf6" />
              </View>
            </View>

            <Text className="text-white text-4xl font-bold tracking-tighter text-center mb-3">
              Lazor<Text className="text-violet-500">Pay</Text>
            </Text>

            <Text className="text-slate-400 text-lg text-center max-w-xs  mx-8 leading-6 ">
              The most secure way to manage your crypto assets with biometric precision.
            </Text>
          </View>

          {/* Bottom Section: Actions */}
          <View className="w-full space-y-2 mb-8 mt-20">

            {/* Divider Text */}
            <View className="flex-row items-center justify-center mb-6">
              <View className="h-[1px] bg-slate-800 w-16" />
              <Text className="text-slate-500 mx-4 text-xs font-medium uppercase tracking-widest">
                Get Started
              </Text>
              <View className="h-[1px] bg-slate-800 w-16" />
            </View>

            {/* Primary Action: Passkey */}
            <View className="flex-col gap-y-2">
              <TouchableOpacity
                className="w-full bg-white h-14 rounded-2xl flex-row items-center justify-center gap-x-2 space-x-3 active:opacity-90"
                onPress={() => { connecttoportal() }}
              >
                <KeyRound size={24} color="#020617" />
                <Text className="text-slate-950 font-bold text-lg">
                  Create wallet
                </Text>
              </TouchableOpacity>

              {/* Secondary Action: FaceID */}
              {/* <TouchableOpacity */}
              {/*   className="w-full bg-slate-900 h-14 rounded-2xl border border-slate-800 flex-row gap-x-2 items-center justify-center space-x-3 active:bg-slate-800" */}
              {/*   onPress={() => console.log('Login with FaceID')} */}
              {/* > */}
              {/*   <ScanFace size={24} color="#94a3b8" /> */}
              {/*   <Text className="text-slate-200 font-semibold text-lg"> */}
              {/*     Create with FaceID */}
              {/*   </Text> */}
              {/* </TouchableOpacity> */}
              {/**/}
              {/**/}
              {/* <TouchableOpacity */}
              {/*   className="w-full bg-slate-900 h-14 rounded-2xl border border-slate-800 flex-row gap-x-2 items-center justify-center space-x-3 active:bg-slate-800" */}
              {/*   onPress={() => console.log('Login with FaceID')} */}
              {/* > */}
              {/*   <Fingerprint size={24} color="#94a3b8" /> */}
              {/*   <Text className="text-slate-200 font-semibold text-lg"> */}
              {/*     Create with Fingerprint */}
              {/*   </Text> */}
              {/* </TouchableOpacity> */}

            </View>
          </View>
        </View>
      </SafeAreaView>
    </LazorKitProvider >
  )
}
