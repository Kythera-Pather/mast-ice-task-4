import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Car } from "../App";

export default function ConfirmationScreen({
  booking,
  onBackToHome,
}: {
  booking: { car: Car; days: number; total: number };
  onBackToHome: () => void;
}) {
  return (
    <View style={styles.screen}>
      <Text style={styles.logoSmall}>Confirmation Receipt</Text>
      <View style={styles.card}>
        <Text style={styles.h2}>{booking.car.make} {booking.car.model}</Text>
        <Text>Days: {booking.days}</Text>
        <Text>Total: R{booking.total}</Text>
        <TouchableOpacity onPress={onBackToHome} style={[styles.button, { marginTop: 16 }]}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20 },
  logoSmall: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  card: { backgroundColor: "white", padding: 16, borderRadius: 10 },
  h2: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  button: { backgroundColor: "#2b7cff", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700" },
});
