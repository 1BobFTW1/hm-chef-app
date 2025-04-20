import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RecipeContext } from '@/components/RecipeContext';

export default function NewRecipeScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { addRecipe } = useContext(RecipeContext);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveRecipe = () => {
    if (!name || !description || !imageUri) return;
    addRecipe({ id: Date.now().toString(), name, description, imageUri });
    setName('');
    setDescription('');
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter recipe name"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Button title="Choose Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <Button title="Save Recipe" onPress={saveRecipe} color="#E7615C" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'white',
  },
  textArea: {   
    height: 80,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
});
