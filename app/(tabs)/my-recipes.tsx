import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import RecipeCard from '@/components/RecipeCard';
import { RecipeContext } from '@/components/RecipeContext';

export default function MyRecipesScreen() {
  const { recipes } = useContext(RecipeContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
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
