import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RecipeContext } from '@/components/RecipeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Recipe name"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <FontAwesome name="camera" size={40} color="#DDD" />
            <Text style={styles.imagePlaceholderText}>Tap to select an image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.floatingButton} onPress={saveRecipe}>
        <Text style={styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderColor: '#ccc',
    marginLeft: 16,
    marginRight: 16,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginTop: 16,
    backgroundColor: 'white',
  },
  textArea: {   
    height: 120,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imagePlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  imagePlaceholderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#E7615C',
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
