import React from "react";
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Car } from "../App";

export default function ConfirmationScreen({
  booking,
  onBackToHome,
}: {
  booking: { car: Car; days: number; total: number };
  onBackToHome: () => void;
}) {
  return (
    <ImageBackground
          source={{ uri: "https://i.pinimg.com/1200x/47/67/0a/47670a460ad1a68bb88c3cfc50b51535.jpg" }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
    <View style={styles.screen}>
      <Text style={styles.logoSmall}>Confirmation Receipt</Text>
      <View style={styles.card}>
        {booking.car.image && (
          <Image source={{ uri: booking.car.image }} style={styles.carImage} />
        )}
        <Text style={styles.h2}>{booking.car.make} {booking.car.model}</Text>
        <Text>Days: {booking.days}</Text>
        <Text>Total: R{booking.total}</Text>
        <TouchableOpacity onPress={onBackToHome} style={[styles.button, { marginTop: 16 }]}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
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

  headerRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 8, 
  },

  logoSmall: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#ecaa46ff", 
    textAlign: "center", 
    marginBottom: 12, 
  },

  card: { 
    backgroundColor: "white", 
    padding: 16, 
    borderRadius: 10, 
    width: "80%", 
    alignItems: "center", 
  },

  carImage: { 
    width: "100%", 
    height: 180, 
    borderRadius: 10, 
    marginBottom: 10, 
  },

  h2: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 8, 
    textAlign: "center", 
    color: "#333", 
  },

  button: { 
    backgroundColor: "#2b7cff", 
    padding: 12, borderRadius: 8, 
    alignItems: "center",
    width: "100%",
   },

  buttonText: { 
    color: "white", 
    fontWeight: "700",
    fontSize: 16, 
    textAlign: "center", 
  },
});

