import { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import RecipeCard from '@/components/RecipeCard';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Recipe[]>([]);

  const search = async () => {
    if (!query) return;

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    setResults(data.meals || []);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for a recipe"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={search} color="#E7615C" />

      <FlatList
        data={results}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <RecipeCard
            title={item.strMeal}
            description={item.strCategory}
            imageUri={item.strMealThumb}
            expandableImage
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
});
