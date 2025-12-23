import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CreditCard, ChevronRight } from 'lucide-react-native';

export function BuyWidget() {
  return (
    <View>
      <Text className="text-white font-bold text-xl mb-4">Buy Crypto</Text>

      {/* Amount Input */}
      <View className="bg-slate-950 rounded-2xl p-6 mb-4 border border-slate-800 items-center">
        <Text className="text-slate-400 text-sm mb-2">You Pay</Text>
        <View className="flex-row items-center">
          <Text className="text-white text-4xl font-bold mr-1">$</Text>
          <TextInput
            className="text-white text-4xl font-bold min-w-[50px] text-center p-0"
            placeholder="100"
            placeholderTextColor="#334155"
            keyboardType="numeric"
          />
        </View>
        <Text className="text-emerald-500 text-xs mt-2 font-medium">Best rate applied</Text>
      </View>

      {/* Payment Method Selector */}
      <Text className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Payment Method</Text>
      <TouchableOpacity className="flex-row items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6 active:bg-slate-900">
        <View className="flex-row items-center">
          <View className="bg-slate-800 p-2 rounded-lg mr-3">
            <CreditCard size={20} color="white" />
          </View>
          <View>
            <Text className="text-white font-bold">Apple Pay</Text>
            <Text className="text-slate-500 text-xs">Fee: $1.50</Text>
          </View>
        </View>
        <ChevronRight size={20} color="#64748b" />
      </TouchableOpacity>

      <TouchableOpacity className="w-full bg-emerald-600 h-14 rounded-2xl mt-2 items-center justify-center active:bg-emerald-700">
        <Text className="text-white font-bold text-lg">Buy SOL</Text>
      </TouchableOpacity>
    </View>
  );
}
