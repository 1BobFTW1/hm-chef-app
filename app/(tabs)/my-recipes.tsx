import { View, FlatList, StyleSheet } from 'react-native';
import RecipeCard from '@/components/RecipeCard';

const dummyRecipes = [
  {
    id: '1',
    name: 'Spaghetti Bolognese',
    description: 'A classic Italian dish with tomato and meat sauce.',
    imageUri: 'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg',
  },
  {
    id: '2',
    name: 'Sushi',
    description: 'Delicious fresh sushi rolls with fish and rice.',
    imageUri: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
  },
];

export default function MyRecipesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            title={item.name}
            description={item.description}
            imageUri={item.imageUri}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
