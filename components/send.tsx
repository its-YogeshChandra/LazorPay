import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ArrowRight, Clipboard, Scan, Wallet } from 'lucide-react-native';
import maker from '@lazorkit/wallet-mobile-adapter';
import { WalletActions } from '@lazorkit/wallet-mobile-adapter';
import {
  airdropFactory,
  appendTransactionMessageInstructions,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransactionMessage,
  generateKeyPairSigner,
  getSignatureFromTransaction,
  lamports,
  nonDivisibleSequentialInstructionPlan,
  pipe,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners
} from "@solana/kit";
import { getTransferSolInstruction } from "@solana-program/system";
import { LAMPORTS_PER_SOL, SystemProgram, PublicKey, Keypair, Transaction } from '@solana/web3.js';
import assert from 'assert';
import * as Linking from "expo-linking"
import { sign } from 'crypto';

export function SendWidget() {
  const value = maker.useWallet()
  const [balance, setBalance] = useState(0)
  const [sendValue, setSendValue] = useState(0)
  const [recipientAddress, setRecipientAddress] = useState<string>('')

  //fetch the balance from wallet
  //fetch wallet on every render
  const redirect_url = Linking.createURL("/")


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

  //function to send trnsaction

  const sendTransaction = async () => {
    try {
      //call the lazorkit function 
      const { signAndSendTransaction } = value;
      if (!value.smartWalletPubkey) {
        console.error("pubkey not present ")
        return
      }

      //making publickey out of recipient main address 
      const recipeintmainAddress = new PublicKey(recipientAddress)

      //calling system program for transfer 
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: value.smartWalletPubkey,
        toPubkey: recipeintmainAddress,
        lamports: 1 * LAMPORTS_PER_SOL
      })

      const signature = await signAndSendTransaction({
        instructions: [transferInstruction],
        transactionOptions: {
          feeToken: 'SOL',
          clusterSimulation: 'devnet'
        },
      },
        { redirectUrl: redirect_url },
      )
      console.log("transaction signature : " + signature)
    } catch (error) {
      //handle error if something breaks 
      console.log("error is : ")
      console.error(error)
    }

  }

  return (
    <View>
      <Text className="text-white font-bold text-xl mb-4">Send Crypto</Text>

      {/* Amount Input */}
      <View className="items-center mb-6 py-4">
        <View className="flex-row items-end">
          <Text className="text-slate-500 text-3xl font-bold mb-1 mr-1">$</Text>
          <TextInput
            className="text-white text-5xl font-bold text-center min-w-[50px] p-0"
            placeholder="0"
            placeholderTextColor="#334155"
            keyboardType="numeric"
            value={sendValue.toString()}
            onChangeText={(text) => {
              const numval = parseInt(text)
              setSendValue(isNaN(numval) ? 0 : numval)
            }}
            autoFocus={false}
          />
        </View>
        <Text className="text-slate-500 text-sm mt-2">Available: {balance}</Text>
      </View>

      {/* Address Input */}
      <Text className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Recipient</Text>
      <View className="flex-row items-center bg-slate-950 rounded-2xl border border-slate-800 px-4 py-3 mb-6">
        <TextInput
          className="flex-1 text-white text-base"
          placeholder="Paste address or ENS..."
          placeholderTextColor="#475569"
          value={recipientAddress}
          onChangeText={(text) => setRecipientAddress(text)}
        />
        <View className="flex-row space-x-3 ml-2">
          <TouchableOpacity className="p-1"><Clipboard size={18} color="#94a3b8" /></TouchableOpacity>
          <TouchableOpacity className="p-1"><Scan size={18} color="#94a3b8" /></TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity className="w-full bg-blue-600 h-14 rounded-2xl mt-2 flex-row items-center justify-center space-x-2 active:bg-blue-700"
        onPress={() => { sendTransaction() }}>
        <Text className="text-white font-bold text-lg">Send Now</Text>
        <ArrowRight size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
