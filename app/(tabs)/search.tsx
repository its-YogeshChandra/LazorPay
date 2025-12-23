import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, TextInput, ScrollView } from 'react-native';
import { Bell, User, ArrowDown, ArrowUp, Plus, ArrowUpDown, ChevronDown, Settings } from 'lucide-react-native';
import { LazorKitProvider, useWallet } from '@lazorkit/wallet-mobile-adapter'
import { base58 } from "@scure/base"
import { BuyWidget } from "@/components/buy";
import { SwapWidget } from "@/components/swap";
import { SendWidget } from "@/components/send";
import { ReceiveWidget } from "@/components/receive";

const modefunctioobject = {
  send: SendWidget,
  buy: BuyWidget,
  receive: ReceiveWidget,
  swap: SwapWidget
}

type objkey = keyof typeof modefunctioobject;

export default function Search() {
  const value = useWallet();
  const [balance, setBalance] = useState(0);
  const [mode, setMode] = useState<string>("receive")

  //fetch the wallet balance 
  if (!value.passkeyPubkey || value.passkeyPubkey == null || value.passkeyPubkey == undefined) {
    //send the error 
    console.log("publickey is not present")
  }


  //fetch the balance from wallet
  //fetch wallet on every render 
  useEffect(() => {
    const fetchwalletBalance = async () => {
      //call the connection endpoint of the useWallet
      if (!value.smartWalletPubkey || value.smartWalletPubkey == null) {
        console.error("error while fetching publickey")
      } else {
        try {
          const data = await value.connection.getBalance(value.smartWalletPubkey)
          if (data) {
            const totalbal = data / 1000_000_000
            setBalance(totalbal)
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchwalletBalance()
  }, [])


  // function to set the mode 
  const setModeFunction = (modevalue: String) => {
    // take the argument from the buttons and set the mode 
    const modes: String[] = ["swap", "receive", "buy", "send"]
    //check if mode incloudes the mode value 
    if (modes.includes(modevalue)) {
      setMode(modevalue.toString())
    } else {
      console.error("wrong mode selected")
    }
  }

  //function to render the modes 
  function moderenderhandlerfunction() {
    const modes: String[] = ["swap", "receive", "buy", "send"]
    if (modes.includes(mode)) {
      //fetch the function from the modefunctioobject
      const Widget = modefunctioobject[mode as objkey]
      return (
        < View>
          {< Widget />}
        </View>
      )
    }
  }


  return (
    <SafeAreaView className="flex-1 bg-slate-950 pt-10">
      <StatusBar barStyle="light-content" />

      <ScrollView className="flex-1 px-6 pt-4">

        {/* 1. Header Section */}
        <View className="flex-row justify-between items-center mb-8">
          <TouchableOpacity className="bg-slate-900 p-3 rounded-full border border-slate-800">
            <User size={20} color="#94a3b8" />
          </TouchableOpacity>

          <View className="flex-row items-center space-x-2">
            <Text className="text-slate-200 font-bold text-lg">My Wallet</Text>
            <ChevronDown size={16} color="#64748b" />
          </View>

          <TouchableOpacity className="bg-slate-900 p-3 rounded-full border border-slate-800">
            <Bell size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* 2. Balance Card */}
        <View className="items-center mb-8">
          <Text className="text-slate-400 font-medium text-sm mb-2">Total Balance</Text>
          <Text className="text-white text-5xl font-bold tracking-tighter mb-2">
            {balance}
          </Text>
          <View className="bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <Text className="text-emerald-400 text-sm font-semibold">
              +2.4% ($342.10)
            </Text>
          </View>
        </View>

        {/* 3. Quick Actions Row */}
        <View className="flex-row justify-between px-4 mb-10">
          <QuickActionButton icon={<ArrowUp size={24} color="white" />} label="Send" />
          <QuickActionButton icon={<ArrowDown size={24} color="white" />} label="Receive" />
          <QuickActionButton icon={<Plus size={24} color="white" />} label="Buy" />
          <QuickActionButton icon={<ArrowUpDown size={24} color="white" />} label="Swap" />
        </View>

        {/* render the function according to the modes */}
        <View className="bg-slate-900 rounded-3xl p-5  border border-slate-800 mb-20">
          {moderenderhandlerfunction()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper Component for Action Buttons
function QuickActionButton({ icon, label }: { icon: any, label: string }) {
  return (
    <View className="items-center space-y-2">
      <TouchableOpacity className="w-14 h-14 bg-slate-800 rounded-full items-center justify-center border border-slate-700 active:bg-slate-700">
        {icon}
      </TouchableOpacity>
      <Text className="text-slate-400 text-xs font-medium">{label}</Text>
    </View>
  );
}
