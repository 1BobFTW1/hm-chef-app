import { useState, useContext } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import RecipeCard from '@/components/RecipeCard';
import { RecipeContext } from '@/components/RecipeContext';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Recipe[]>([]);
  const { likeRecipe } = useContext(RecipeContext);

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
        onSubmitEditing={search}
        returnKeyType="search"
      />

      <FlatList
        style={styles.recipeCard}
        contentContainerStyle={styles.listContent}
        data={results}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <RecipeCard
            title={item.strMeal}
            description={item.strCategory}
            imageUri={item.strMealThumb}
            expandableImage
            showLikeButton
            onLike={() => likeRecipe(item)}
          />
        )}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={search}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipeCard: {
    padding: 16,
  },
  listContent: {
    paddingBottom: 80,
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
    marginBottom: 16,
    backgroundColor: 'white',
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
