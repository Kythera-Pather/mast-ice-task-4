import React, { useState } from "react";
import { ImageBackground,View, Text, TextInput, Button, Image, FlatList, StyleSheet, TouchableOpacity,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Car } from "../App";

export default function AdminScreen({
  cars,
  addCar,
  onLogout,
}: {
  cars: Car[];
  addCar: (car: Car) => void;
  onLogout: () => void;
}) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | undefined>();

  // Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Add car to global state
  const handleAddCar = () => {
    if (!make || !model || !cost) return;

    const newCar: Car = {
      id: Date.now().toString(),
      make,
      model,
      costPerDay: parseFloat(cost),
      description,
      image: imageUri,
    };

    addCar(newCar);

    // Clear inputs
    setMake("");
    setModel("");
    setCost("");
    setDescription("");
    setImageUri(undefined);
  };

  return (
    <ImageBackground
          source={{ uri: "https://i.pinimg.com/1200x/47/67/0a/47670a460ad1a68bb88c3cfc50b51535.jpg" }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
    <View style={styles.container}>
      {/* Header with Logout */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <TouchableOpacity onPress={onLogout} style={styles.smallButton}>
          <Text style={styles.smallButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Add a Car</Text>

      <TextInput placeholder="Make" value={make} onChangeText={setMake} style={styles.input} />
      <TextInput placeholder="Model" value={model} onChangeText={setModel} style={styles.input} />
      <TextInput
        placeholder="Cost per Day"
        keyboardType="numeric"
        value={cost}
        onChangeText={setCost}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.multilineInput]}
        multiline
      />

      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

      <View style={styles.addButton}>
        <Button title="Add Car" onPress={handleAddCar} />
      </View>

      <Text style={styles.subtitle}>Current Inventory</Text>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.carItem}>
            {item.image && <Image source={{ uri: item.image }} style={styles.carImage} />}
            <View>
              <Text style={styles.carText}>
                {item.make} {item.model} - R{item.costPerDay}/day
              </Text>
              <Text style={styles.carDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "transparent", 
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

  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#f1a23aff", 
    textAlign: "center", 
    marginBottom: 12,
   },

  subtitle: { 
    fontSize: 23, 
    fontWeight: "600", 
    marginVertical: 12, 
    color: "#083531ff", 
    textAlign: "center", 
    marginTop: 20,
    textDecorationLine: "underline",
   },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  multilineInput: { 
    height: 80, 
    textAlignVertical: "top", 
  },

  previewImage: {
    width: 120,
    height: 90,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
  },

  addButton: {
   marginVertical: 10,
 },

  carItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },

  carImage: { 
    width: 70, 
    height: 50, 
    borderRadius: 6, 
    marginRight: 10, 
  },


  carText: { fontSize: 16, 
    fontWeight: "500", 
    color: "#222", 
    marginBottom: 4, 
  },

  carDescription: { 
    fontSize: 14, 
    color: "#666", 
  },

  smallButton: { 
    backgroundColor: "#eee", 
    padding: 8, 
    borderRadius: 8, 
    alignItems: "center",
   },

  smallButtonText: { 
    color: "#333",
   },
});
