import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ArrowRight, Clipboard, Scan } from 'lucide-react-native';

export function SendWidget() {
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
            autoFocus={false}
          />
        </View>
        <Text className="text-slate-500 text-sm mt-2">Available: $14,230.50</Text>
      </View>

      {/* Address Input */}
      <Text className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Recipient</Text>
      <View className="flex-row items-center bg-slate-950 rounded-2xl border border-slate-800 px-4 py-3 mb-6">
        <TextInput
          className="flex-1 text-white text-base"
          placeholder="Paste address or ENS..."
          placeholderTextColor="#475569"
        />
        <View className="flex-row space-x-3 ml-2">
          <TouchableOpacity className="p-1"><Clipboard size={18} color="#94a3b8" /></TouchableOpacity>
          <TouchableOpacity className="p-1"><Scan size={18} color="#94a3b8" /></TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity className="w-full bg-blue-600 h-14 rounded-2xl mt-2 flex-row items-center justify-center space-x-2 active:bg-blue-700">
        <Text className="text-white font-bold text-lg">Send Now</Text>
        <ArrowRight size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
