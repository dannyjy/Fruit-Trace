import { Slot } from "expo-router";
import { useEffect , useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function RootLayout() {
  const [splach , setSplach] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setSplach(!splach)
    } , 2000)
  } , [])
  return (
      <Slot/>
  );
}
