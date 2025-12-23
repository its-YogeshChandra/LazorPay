import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, TextInput, ScrollView } from 'react-native';
import { Bell, User, ArrowDown, ArrowUp, Plus, ArrowUpDown, ChevronDown, Settings } from 'lucide-react-native';
import { LazorKitProvider, useWallet } from '@lazorkit/wallet-mobile-adapter'
import { base58 } from "@scure/base"

export default function Search() {
  const value = useWallet();
  const [balance, setBalance] = useState(0);
  const [mode, setMode] = useState<string>("")

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
    const modes = ["swap", "receive", "buy", "send"]
    for (const data of modes) {
      if (modevalue == data) {
        //set the mode to the data type 
        setMode(modevalue.toString)
      }
    }
  }

  //making object of the function needed 
  const modefunctionobject = {

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



        {/* 4. Swap Widget (The Core Feature) */}
        <View className="bg-slate-900 rounded-3xl p-5  border border-slate-800 mb-20">
          <Text className="text-white font-bold text-xl mb-4">Swap</Text>

          {/* Input: From */}
          <View className="bg-slate-950 rounded-2xl p-4 mb-2 border border-slate-800">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-slate-400 text-xs">From</Text>
              <Text className="text-slate-400 text-xs">Balance: 4.2 ETH</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <TextInput
                className="text-white text-3xl font-bold p-0 w-2/3"
                placeholder="0"
                placeholderTextColor="#475569"
                keyboardType="numeric"
                defaultValue="1.5"
              />
              <View className="bg-slate-800 px-3 py-2 rounded-xl flex-row items-center space-x-2">
                <View className="w-6 h-6 rounded-full bg-blue-500 mr-2" />
                <Text className="text-white font-bold">ETH</Text>
                <ChevronDown size={16} color="#94a3b8" />
              </View>
            </View>
          </View>

          {/* Swap Divider Icon */}
          <View className="items-center -my-3 z-10">
            <TouchableOpacity
              className="bg-slate-800 p-2 rounded-xl border-4 border-slate-900"
              activeOpacity={0.8}
            >
              <ArrowDown size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Input: To */}
          <View className="bg-slate-950 rounded-2xl p-4 mt-2 border border-slate-800">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-slate-400 text-xs">To</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <TextInput
                className="text-white text-3xl font-bold p-0 w-2/3"
                placeholder="0"
                placeholderTextColor="#475569"
                keyboardType="numeric"
                defaultValue="2,840.5"
                editable={false}
              />
              <View className="bg-slate-800 px-3 py-2 rounded-xl flex-row items-center space-x-2">
                <View className="w-6 h-6 rounded-full bg-indigo-500 mr-2" />
                <Text className="text-white font-bold">USDC</Text>
                <ChevronDown size={16} color="#94a3b8" />
              </View>
            </View>
          </View>

          {/* Review Button */}
          <TouchableOpacity className="w-full bg-blue-600 h-14 rounded-2xl mt-6 items-center justify-center active:bg-blue-700">
            <Text className="text-white font-bold text-lg">Review Swap</Text>
          </TouchableOpacity>

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
