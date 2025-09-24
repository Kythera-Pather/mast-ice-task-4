import React, { JSX, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import AdminScreen from "./screens/AdminScreen";
import CustomerScreen from "./screens/CustomerScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";

export type Car = {
  id: string;
  make: string;
  model: string;
  costPerDay: number;
  description?: string;
  imageUri?: string;
};

export default function App(): JSX.Element {
  const [screen, setScreen] = useState<"login" | "admin" | "customer" | "confirm">("login");

  const [cars, setCars] = useState<Car[]>([
    { id: "1", make: "Hyundai", model: "Grand i10", costPerDay: 400 },
    { id: "2", make: "Toyota", model: "Corolla Quest", costPerDay: 670 },
    { id: "3", make: "Volkswagen", model: "Polo Sedan", costPerDay: 650 },
    { id: "4", make: "Volkswagen", model: "T-Cross", costPerDay: 800 },
    { id: "5", make: "Toyota", model: "Fortuner", costPerDay: 1500 },
    { id: "6", make: "BMW", model: "3 Series", costPerDay: 1900 },
  ]);

  const [confirmedBooking, setConfirmedBooking] = useState<{
    car: Car;
    days: number;
    total: number;
  } | null>(null);

  const handleLogin = (username: string) => {
    if (username.trim().toLowerCase() === "admin") {
      setScreen("admin");
    } else {
      setScreen("customer");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {screen === "login" && <LoginScreen onLogin={handleLogin} />}

      {screen === "admin" && (
        <AdminScreen
          cars={cars}
          addCar={(car) => setCars((prev) => [...prev, car])}
          onLogout={() => setScreen("login")}
        />
      )}

      {screen === "customer" && (
        <CustomerScreen
          cars={cars}
          onLogout={() => setScreen("login")}
          onConfirmBooking={(car, days, total) => {
            setConfirmedBooking({ car, days, total });
            setScreen("confirm");
          }}
        />
      )}

      {screen === "confirm" && confirmedBooking && (
        <ConfirmationScreen
          booking={confirmedBooking}
          onBackToHome={() => setScreen("login")}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: "#cfd6f3ff",
   },

  screen:
   { flex: 1,
    backgroundColor: "#cfd6f3ff",
   padding: 20, 
  },

  logoSmall: { 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 12, 
  },

  card: { 
    backgroundColor: "white", 
    padding: 16, 
    borderRadius: 10 
  },
  
  h1: { 
    fontSize: 16, 
    fontWeight: "700", 
    marginBottom: 8 
  },

  input: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 8, 
    padding: 10, 
    marginTop: 8 
  },
  
  button: {
    backgroundColor: "#2b7cff", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 12 
  },
  
  buttonText: { 
    color: "white", 
    fontWeight: "700" 
  },
  
  helperText: { 
    marginTop: 8, 
    color: "#777" 
  },
 
   
});



