const categories = [
    { id: 1, name: 'Pizza', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Sushi', image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Indian', image: 'https://via.placeholder.com/50' },
    { id: 4, name: 'Burgers', image: 'https://via.placeholder.com/50' },
    { id: 5, name: 'Pasta', image: 'https://via.placeholder.com/50' },
    { id: 6, name: 'Asian', image: 'https://via.placeholder.com/50' },
    { id: 7, name: 'Seafood', image: 'https://via.placeholder.com/50' },
    { id: 8, name: 'Drinks', image: 'https://via.placeholder.com/50' },
    { id: 9, name: 'Desserts', image: 'https://via.placeholder.com/50' },
    { id: 10, name: 'Wraps', image: 'https://via.placeholder.com/50' },
    // Agrega más categorías según sea necesario
  ];

  const foodItems = [
    { id: 1, name: 'Pizza Margherita', price: 10, categoryId: 1, image: 'https://picsum.photos/200/300?food=1' },
    { id: 2, name: 'Sushi Combo', price: 20, categoryId: 2, image: 'https://picsum.photos/200/300?food=2' },
    { id: 3, name: 'Chicken Tikka Masala', price: 15, categoryId: 3, image: 'https://picsum.photos/200/300?food=3' },
    { id: 4, name: 'Burger and Fries', price: 12, categoryId: 4, image: 'https://picsum.photos/200/300?food=4' },
    { id: 5, name: 'Pasta Carbonara', price: 14, categoryId: 5, image: 'https://picsum.photos/200/300?food=5' },
    { id: 6, name: 'Veggie Stir Fry', price: 8, categoryId: 6, image: 'https://picsum.photos/200/300?food=6' },
    { id: 7, name: 'Shrimp Scampi', price: 14, categoryId: 7, image: 'https://picsum.photos/200/300?food=7' },
    { id: 8, name: 'Margarita Cocktail', price: 7, categoryId: 8, image: 'https://picsum.photos/200/300?food=8' },
    { id: 9, name: 'Chocolate Brownie', price: 5, categoryId: 9, image: 'https://picsum.photos/200/300?food=9' },
    { id: 10, name: 'Caesar Wrap', price: 9, categoryId: 10, image: 'https://picsum.photos/200/300?food=10' },
    { id: 11, name: 'Shrimp Scampi', price: 14, categoryId: 7, image: 'https://picsum.photos/200/300?food=7' },
    { id: 12, name: 'Margarita Cocktail', price: 7, categoryId: 8, image: 'https://picsum.photos/200/300?food=8' },
    { id: 13, name: 'Chocolate Brownie', price: 5, categoryId: 9, image: 'https://picsum.photos/200/300?food=9' },
    { id: 14, name: 'Caesar Wrap', price: 9, categoryId: 10, image: 'https://picsum.photos/200/300?food=10' },
    { id: 30, name: 'Ice Cream Sundae', price: 6, categoryId: 9, image: 'https://picsum.photos/200/300?food=30' },
    // ... Agrega más productos con categoryId según sea necesario
  ];
  
import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { List, Toolbar, Appbar } from 'react-native-paper';

const FoodMenuScreen = () => {


  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategoryName = (categoryId) => {
    let i = categories.findIndex(x=> x.id === categoryId)
    return i >= 0 ? categories[i].name : "";
  }

  const renderFoodItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={`Price: $${item.price}`}
      left={() => (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.foodItemImage} />
        </View>
      )}
      right={() => <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>}
      style={styles.item}
    />
  );

  return (
    <View style={styles.container}>
      <Appbar.Header
      style={{
        backgroundColor: '#2196F3', // Cambia el color de fondo del Appbar
      }}
      >
        <Appbar.Content title="Productos" />
      </Appbar.Header>
      <FlatList
        horizontal
        style={{ maxHeight: selectedCategory === null ? 100 : 75 }}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => setSelectedCategory(item.id === selectedCategory ? null : item.id)}
            >
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            </TouchableOpacity>
        )}
        />
      <FlatList
        data={selectedCategory ? foodItems.filter(item => item.categoryId === selectedCategory) : foodItems}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  item: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 8,
  },
  foodItemImage: {
    width: '100%',
    height: '100%',
  },
  categoryButton: {
    padding: 8,
    marginBottom: 15
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  category: {
    fontWeight: 'bold',
  },
});

export default FoodMenuScreen;
