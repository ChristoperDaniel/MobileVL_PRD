import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, 
        headerTitle: "EduLab",
        headerStyle: {
          backgroundColor: "#D1C4E9", 
        },
        headerTitleStyle: {
          color: "#5C63D8", 
          fontSize: 20, 
          fontWeight: "900",
        },
      }}
    />
  );
}
