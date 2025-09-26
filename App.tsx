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
  image?: string;
};

export default function App(): JSX.Element {
  const [screen, setScreen] = useState<"login" | "admin" | "customer" | "confirm">("login");
 // Mock initial cars
  const [cars, setCars] = useState<Car[]>([
    {
      id: "1",
      make: "Hyundai",
      model: "Grand i10", 
      costPerDay: 400,
      image: "https://i.pinimg.com/1200x/75/b4/6a/75b46add3f2b8e172018e48e7d647795.jpg",
    },
    {
      id: "2",
      make: "Toyota",
      model: "Corolla Quest",
      costPerDay: 670,
      image: "https://i.pinimg.com/1200x/24/a0/22/24a02226f7441d54f32e86a6680d3d77.jpg",
    },
    {
      id: "3",
      make: "Volkswagen",
      model: "Polo Sedan",
      costPerDay: 650,
      image: "https://i.pinimg.com/736x/2d/f0/c3/2df0c3aa10bb5fcf561da30108984f99.jpg",
    },
    {
      id: "4",
      make: "Volkswagen",
      model: "T-Cross",
      costPerDay: 800,
      image: "https://i.pinimg.com/736x/b1/a9/2a/b1a92a0c58b12d29e73c507a3e26c85b.jpg",
    },
    {
      id: "5",
      make: "Toyota",
      model: "Fortuner",
      costPerDay: 1500,
      image: "https://i.pinimg.com/1200x/78/4f/d8/784fd84c1790416f17d678b925a11278.jpg",
    },
    {
      id: "6",
      make: "BMW",
      model: "3 Series",
      costPerDay: 1900,
      image: "https://i.pinimg.com/736x/c1/72/0e/c1720e26c49d925b5f082f4333f9402f.jpg",
    },
  ]);

  const [confirmedBooking, setConfirmedBooking] = useState<{
    car: Car;
    days: number;
    total: number;
  } | null>(null);

  // Handle login logic
  const handleLogin = (username: string, password: string) => {
    // makes sure its the right username and password for the admin to enter Admin screen
    if (username.trim() === "") {
      alert("Please enter a valid username");
      return;
    }
    if (password.trim() === "") {
      alert("Please enter a valid password");
      return;
    }

    // Simple auth: "admin" with password "111" goes to Admin, others to Customer
    if (username.trim().toLowerCase() === "admin" ) {
      if (password === "111") {
        setScreen("admin");
      } else {
        alert("Invalid password for admin");
      }
    } else {
      setScreen("customer");
    }
  };

  return (
    // SafeAreaView to avoid notches
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
  container: {
    flex: 1,
    backgroundColor: "#c3f0e6ff",
  },

  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "#cfd6f3ff",
  },

Image: {
    width: 100,
    height: 60,
    resizeMode: "cover",
    borderRadius: 4,
  },

  carInfo: {
    flex: 1,
    marginLeft: 12,
  },
  
});
