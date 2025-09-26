import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, ImageBackground } from "react-native";

export default function LoginScreen({ onLogin }: { onLogin: (username: string, password: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const anim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(anim, { toValue: 1, duration: 120, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 0, duration: 120, useNativeDriver: true }),
    ]).start(() => onLogin(username, password));
  };

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.96] });

  return (
    // Image background with overlay
    <ImageBackground
      source={{ uri: "https://i.pinimg.com/1200x/47/67/0a/47670a460ad1a68bb88c3cfc50b51535.jpg" }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.screen}>
          <View style={styles.card}>
            <Text style={styles.logo}>Car Booking Services</Text>
            <Text style={styles.h1}>Welcome to the car booking services</Text>
            <TextInput
            // username input and password input
              placeholder="Username" value={username} onChangeText={setUsername} style={styles.input}
            />
            <TextInput
              placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input}
            />
            <Animated.View style={{ transform: [{ scale }], width: "60%" }}>
              <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
     flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    },

  backgroundImage: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)", 
  },

  logo: { 
    fontSize: 20, 
    fontWeight: "700", 
    textAlign: "center", 
    marginVertical: 12, 
    color: "#333" 
  },

  card: { 
    backgroundColor: "white", 
    marginHorizontal: 12, 
    padding: 16, 
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
   },

  h1: { 
    fontSize: 16, 
    fontWeight: "700", 
    marginBottom: 15,
    textAlign: "center", 
    color: "#333"  
  },

  input: { 
    borderWidth: 1, 
    borderColor: "#105c5cff", 
    borderRadius: 8, 
    padding: 10, 
    marginTop: 8,
   width: 300,
  },

  button: { 
    backgroundColor: "#76a9faff", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 12,
   width: "100%",
  },

  buttonText: { 
    color: "white", 
    fontWeight: "700",
   fontSize: 16, 
   textAlign: "center", 
  },
  
  helperText: { 
    marginTop: 8, 
    color: "#777",
   textAlign: "center", 
  },

});
