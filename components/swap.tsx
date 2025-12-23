import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ArrowDown, ChevronDown } from 'lucide-react-native';

export function SwapWidget() {
  return (
    <View>
      <Text className="text-white font-bold text-xl mb-4">Swap Assets</Text>

      {/* From Input */}
      <View className="bg-slate-950 rounded-2xl p-4 mb-2 border border-slate-800">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-slate-400 text-xs">From</Text>
          <Text className="text-slate-400 text-xs">Max: 4.2 SOL</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <TextInput
            className="text-white text-2xl font-bold w-2/3 p-0"
            placeholder="0.0"
            placeholderTextColor="#475569"
            keyboardType="numeric"
          />
          <TouchableOpacity className="bg-slate-800 px-3 py-2 rounded-xl flex-row items-center space-x-2">
            <View className="w-5 h-5 rounded-full bg-indigo-500 mr-2" />
            <Text className="text-white font-bold">SOL</Text>
            <ChevronDown size={14} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider / Flipper */}
      <View className="items-center -my-3 z-10">
        <TouchableOpacity className="bg-slate-800 p-2 rounded-xl border-4 border-slate-900 active:bg-slate-700">
          <ArrowDown size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* To Input */}
      <View className="bg-slate-950 rounded-2xl p-4 mt-2 border border-slate-800">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-slate-400 text-xs">To (Estimate)</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <TextInput
            className="text-white text-2xl font-bold w-2/3 p-0"
            placeholder="0.0"
            placeholderTextColor="#475569"
            editable={false}
          />
          <TouchableOpacity className="bg-slate-800 px-3 py-2 rounded-xl flex-row items-center space-x-2">
            <View className="w-5 h-5 rounded-full bg-blue-500 mr-2" />
            <Text className="text-white font-bold">USDC</Text>
            <ChevronDown size={14} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity className="w-full bg-blue-600 h-14 rounded-2xl mt-6 items-center justify-center active:bg-blue-700">
        <Text className="text-white font-bold text-lg">Review Swap</Text>
      </TouchableOpacity>
    </View>
  );
}
