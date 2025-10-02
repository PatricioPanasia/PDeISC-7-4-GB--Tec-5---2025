import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Button,
  Pressable,
  FlatList,
  SectionList,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Switch,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  RefreshControl,
  StatusBar,
  VirtualizedList,
  InputAccessoryView,
  Platform,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const data = ["Manzana", "Banana", "Naranja"];
  const sections = [
    { title: "Frutas", data: ["Mango", "Uva"] },
    { title: "Verduras", data: ["Lechuga", "Zanahoria"] },
  ];

  const getItem = (_: any, index: number) => ({
    id: index.toString(),
    title: `Item ${index + 1}`,
  });
  const getItemCount = (_: any) => 5;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(false)} tintColor="#fff" />}
        >
          {/* VIEW */}
          <View style={styles.box}>
            <Text style={styles.title}>View</Text>
            <Text style={styles.text}>Contenedor genérico, como un div en web.</Text>
          </View>

          {/* TEXT */}
          <View style={styles.box}>
            <Text style={styles.title}>Text</Text>
            <Text style={styles.text}>Se usa para mostrar texto en pantalla.</Text>
          </View>

          {/* IMAGE */}
          <View style={styles.box}>
            <Text style={styles.title}>Image</Text>
            <Image source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} style={{ width: 50, height: 50 }} />
            <Text style={styles.text}>Muestra imágenes.</Text>
          </View>

          {/* TEXTINPUT */}
          <View style={styles.box}>
            <Text style={styles.title}>TextInput</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe aquí"
              placeholderTextColor="#888"
              value={text}
              onChangeText={setText}
            />
            <Text style={styles.text}>Texto ingresado: {text}</Text>
          </View>

          {/* BUTTON */}
          <View style={styles.box}>
            <Text style={styles.title}>Button</Text>
            <Button title="Presióname" onPress={() => Alert.alert("¡Hola!")} color="#1E88E5" />
          </View>

          {/* PRESSABLE */}
          <View style={styles.box}>
            <Text style={styles.title}>Pressable</Text>
            <Pressable
              onPress={() => Alert.alert("Presionado")}
              style={({ pressed }) => [
                styles.pressable,
                { backgroundColor: pressed ? "#333" : "#444" },
              ]}
            >
              <Text style={styles.text}>Presióname con estilo</Text>
            </Pressable>
          </View>

          {/* TOUCHABLES */}
          <View style={styles.box}>
            <Text style={styles.title}>Touchables</Text>
            <TouchableOpacity style={styles.touchable}>
              <Text style={styles.text}>TouchableOpacity</Text>
            </TouchableOpacity>
            <TouchableHighlight style={styles.touchable} underlayColor="#333" onPress={() => Alert.alert("Highlight")}>
              <Text style={styles.text}>TouchableHighlight</Text>
            </TouchableHighlight>
            <TouchableWithoutFeedback onPress={() => Alert.alert("Sin feedback!")}>
              <View style={styles.touchable}>
                <Text style={styles.text}>TouchableWithoutFeedback</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* FLATLIST */}
          <View style={styles.box}>
            <Text style={styles.title}>FlatList</Text>
            <FlatList data={data} renderItem={({ item }) => <Text style={styles.text}>{item}</Text>} keyExtractor={(item) => item} />
          </View>

          {/* SECTIONLIST */}
          <View style={styles.box}>
            <Text style={styles.title}>SectionList</Text>
            <SectionList
              sections={sections}
              renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
              renderSectionHeader={({ section }) => <Text style={styles.subtitle}>{section.title}</Text>}
              keyExtractor={(item, index) => item + index}
            />
          </View>

          {/* SWITCH */}
          <View style={styles.box}>
            <Text style={styles.title}>Switch</Text>
            <Switch value={isEnabled} onValueChange={setIsEnabled} thumbColor={isEnabled ? "#1E88E5" : "#888"} />
            <Text style={styles.text}>{isEnabled ? "Encendido" : "Apagado"}</Text>
          </View>

          {/* ACTIVITY INDICATOR */}
          <View style={styles.box}>
            <Text style={styles.title}>ActivityIndicator</Text>
            <ActivityIndicator size="large" color="#1E88E5" />
          </View>

          {/* MODAL */}
          <View style={styles.box}>
            <Text style={styles.title}>Modal</Text>
            <Button title="Abrir Modal" onPress={() => setModalVisible(true)} color="#8E24AA" />
            <Modal visible={modalVisible} transparent animationType="slide">
              <View style={styles.modalView}>
                <Text style={styles.text}>Este es un modal</Text>
                <Button title="Cerrar" onPress={() => setModalVisible(false)} color="#FF5252" />
              </View>
            </Modal>
          </View>

          {/* VIRTUALIZEDLIST */}
          <View style={styles.box}>
            <Text style={styles.title}>VirtualizedList</Text>
            <VirtualizedList
              data={[]}
              initialNumToRender={4}
              renderItem={({ item }) => <Text style={styles.text}>{item.title}</Text>}
              keyExtractor={(item) => item.id}
              getItemCount={getItemCount}
              getItem={getItem}
            />
          </View>

          {/* INPUT ACCESSORY VIEW */}
          {Platform.OS === "ios" && (
            <InputAccessoryView>
              <View style={styles.box}>
                <Text style={styles.text}>Soy un InputAccessoryView</Text>
              </View>
            </InputAccessoryView>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  scroll: { padding: 16 },
  box: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 8, color: "#fff" },
  subtitle: { fontWeight: "bold", fontSize: 14, marginVertical: 6, color: "#90CAF9" },
  text: { color: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  pressable: {
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  touchable: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#333",
    alignItems: "center",
    marginVertical: 4,
  },
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
});
