import { Slot, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Slot>
      <Tabs>
        <Tabs.Screen name="index"/>
        <Tabs.Screen name="history" />
        <Tabs.Screen name="Results"/>
        <Tabs.Screen name="Explore"/>
      </Tabs>
    </Slot>
  );
}
