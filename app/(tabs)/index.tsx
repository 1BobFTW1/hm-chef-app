import { View, StyleSheet, Image } from 'react-native';
import { Text } from '@/components/Themed';



export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/chef1.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.welcomeText}>Welcome to the Crazy HM Chef App!</Text>
      <Text style={styles.subText}>
        Save your own favorite recipes, browse tasty meals from around the world, and get inspired to cook something new.
      </Text>
      <Text style={styles.subText}>
        Use the tabs below to start creating, viewing or searching recipes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    borderRadius: 20,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },
});
