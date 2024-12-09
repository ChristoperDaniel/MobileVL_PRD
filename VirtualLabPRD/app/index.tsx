// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this screen.</Text>
//     </View>
//   );
// }

import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Index() {
  // const [showHeader, setShowHeader] = useState(false);
  return (
    <ScrollView style={styles.container}>
      {/* Main Section */}
      <View style={styles.main}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Introduction to Engineering And Design</Text>
        <Text style={styles.subtitle}>
          Struggling with this course?{"\n"}Don't worry!
        </Text>
        <Text style={styles.description}>
          <Text style={styles.highlight}>EduLab</Text> is your trusted partner,
          ready to guide you every step of the way
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1C4E9",
    paddingHorizontal: 20,
  },
  main: {
    alignItems: "center",
    marginTop: 90,
    marginBottom: 30,
  },
  image: {
    width: 500,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#5C63D8",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  highlight: {
    color: "#5C63D8",
    fontWeight: "900",
  },
  highlight1: {
    color: "#5C63D8",
    fontWeight: "900",
  },
});
