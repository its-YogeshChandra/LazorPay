import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Copy, QrCode } from 'lucide-react-native';

export function ReceiveWidget() {
  return (
    <View className="items-center">
      <Text className="text-white font-bold text-xl mb-6 self-start">Receive Assets</Text>

      {/* QR Code Container */}
      <View className="bg-white p-4 rounded-2xl mb-6 shadow-lg shadow-blue-500/10">
        <View className="w-48 h-48 bg-slate-100 items-center justify-center border-2 border-slate-200 border-dashed rounded-xl">
          {/* Replace this with an actual QRCode component if you have one installed */}
          <QrCode size={100} color="#0f172a" />
        </View>
      </View>

      <Text className="text-slate-500 text-xs mb-2">Your Solana Address</Text>

      {/* Address Copy Box */}
      <TouchableOpacity
        className="w-full flex-row items-center justify-between bg-slate-950 px-4 py-4 rounded-2xl border border-slate-800 active:bg-slate-900 mb-6"
        onPress={() => console.log('Copied to clipboard')}
      >
        <Text className="text-slate-300 font-mono text-sm mr-2" numberOfLines={1} ellipsizeMode="middle">
          7x99eW...3kL2
        </Text>
        <View className="bg-slate-800 p-2 rounded-lg">
          <Copy size={16} color="white" />
        </View>
      </TouchableOpacity>

      <View className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 w-full">
        <Text className="text-amber-500 text-xs text-center leading-5">
          Only send Solana (SOL) to this address. Other assets may be lost.
        </Text>
      </View>
    </View>
  );
}
