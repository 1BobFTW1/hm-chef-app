import { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface RecipeCardProps {
  title: string;
  description: string;
  imageUri: string;
  expandableImage?: boolean;
  onLike?: () => void;
  showLikeButton?: boolean;
}

export default function RecipeCard({
  title,
  description,
  imageUri,
  expandableImage = true,
  onLike,
  showLikeButton = false,
}: RecipeCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleToggle = () => {
    if (expandableImage) setModalVisible(true);
  };

  // Handles like button press
  const handleLike = () => {
    setLiked(true);
    onLike?.();
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={handleToggle}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </Pressable>
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {showLikeButton && (
            <TouchableOpacity onPress={handleLike} style={styles.likeButton}>            
              <FontAwesome name={liked ? 'heart' : 'heart-o'} size={20} color="#E7615C" />
            </TouchableOpacity>
          )}
        </View>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>

      {expandableImage && (
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modalOverlay}>
            <Image source={{ uri: imageUri }} style={styles.fullscreenImage} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: '#fdfdfd',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  likeButton: {
    padding: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 30,
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    color: '#333',
  },
});
