import React, { useState, useRef } from "react";
import { ImageBackground,View, Text, TextInput, TouchableOpacity, FlatList, Modal, Animated, StyleSheet, Image,} from "react-native";
import { Car } from "../App";

export default function CustomerScreen({
  cars,
  onLogout,
  onConfirmBooking,
}: {
  cars: Car[];
  onLogout: () => void;
  onConfirmBooking: (car: Car, days: number, total: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [days, setDays] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openModal = (car: Car) => {
    setSelectedCar(car);
    setDays("1");
    setModalVisible(true);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  };

  const filtered = cars.filter((c) =>
    `${c.make} ${c.model}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    // image background with overlay
    <ImageBackground
          source={{ uri: "https://i.pinimg.com/1200x/47/67/0a/47670a460ad1a68bb88c3cfc50b51535.jpg" }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <Text style={styles.logoSmall}>Rent a Car</Text>
        <TouchableOpacity onPress={onLogout} style={styles.smallButton}>
          <Text style={styles.smallButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 12 }}>
        <TextInput placeholder="Search for cars" value={query} onChangeText={setQuery} style={styles.input} />
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.carCard}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
              )}
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.carTitle}>{item.make} {item.model}</Text>
                <Text>R{item.costPerDay} / day</Text>
              </View>
              <TouchableOpacity onPress={() => openModal(item)} style={styles.smallActionButton}>
                <Text style={{ color: "white" }}>Select</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Booking modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalCard, { opacity: fadeAnim }]}>
            {selectedCar && (
              <>
                {selectedCar.image && (
                  <Image source={{ uri: selectedCar.image }} style={styles.modalImage} />
                )}
                <Text style={styles.h2}>{selectedCar.make} {selectedCar.model}</Text>
                <Text>R{selectedCar.costPerDay} / day</Text>
                <TextInput
                  placeholder="Number of days"
                  value={days}
                  onChangeText={(t) => setDays(t.replace(/[^0-9]/g, "") || "")}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <Text>Total: R{(Number(days) * selectedCar.costPerDay) || 0}</Text>

                <View style={{ flexDirection: "row", marginTop: 12 }}>
                  <TouchableOpacity
                    onPress={() => {
                      const total = Number(days) * selectedCar.costPerDay;
                      setModalVisible(false);
                      onConfirmBooking(selectedCar, Number(days), total);
                    }}
                    style={[styles.button, { flex: 1, marginRight: 8 }]}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={[styles.button, { flex: 1, backgroundColor: "#ccc" }]}
                  >
                    <Text style={[styles.buttonText, { color: "#333" }]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
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
     marginBottom: 12,
    textAlign: "center",
    },

  smallButton: {
     backgroundColor: "#eee",
     padding: 8, 
     borderRadius: 8,
    },

  smallButtonText: {
     color: "#333",
    fontWeight: "700",
   },

  input: { 
    borderWidth: 1, 
    borderColor: "#cec9c9ff", 
    borderRadius: 8, 
    padding: 10, 
    marginVertical: 8,
    backgroundColor: "white",
    width: "100%",
   },

  carCard: {
    backgroundColor: "white",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
 },
  carTitle: { 
    fontSize: 16, 
    fontWeight: "700",
   },

  smallActionButton: { 
    backgroundColor: "#2b7cff", 
    padding: 8, 
    borderRadius: 8, 
    alignItems: "center",
   },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.35)", 
    justifyContent: "center", 
    alignItems: "center", 
  },

  modalCard: { 
    backgroundColor: "white", 
    padding: 16, 
    borderRadius: 12, 
    width: "80%",
    alignItems: "center",
   },

  h2: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 8, 
    textAlign: "center",
    },
  button: { 
    backgroundColor: "#2b7cff", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 12,
   },

  buttonText: { 
    color: "white", 
    fontWeight: "700",
   }, 

  thumbnail: {
     width: 70, 
     height: 50, 
     borderRadius: 6,
     },
  modalImage: { 
    width: "100%", 
    height: 180, 
    borderRadius: 10, 
    marginBottom: 10, 
  },
});
