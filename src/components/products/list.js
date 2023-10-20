
import React, { Component  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { List, Appbar } from 'react-native-paper';
import { categories, products } from '../../data';

class ProductListScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedCategory: null,
      };
    }
  
    getCategoryName(categoryId) {
      let i = categories.findIndex(x => x.id === categoryId);
      return i >= 0 ? categories[i].name : "";
    };
  
    renderFoodItem = ({ item }) => (
      <List.Item
        title={item.name}
        description={`Price: $${item.price}`}
        left={() => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.foodItemImage} />
          </View>
        )}
        right={() => <Text style={styles.category}>{this.getCategoryName(item.categoryId)}</Text>}
        style={styles.item}
      />
    );
  
    render() {
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
            style={{ maxHeight: this.state.selectedCategory === null ? 100 : 75 }}
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => this.setState({ selectedCategory: item.id === this.state.selectedCategory ? null : item.id })}
              >
                <Image source={{ uri: item.image }} style={styles.categoryImage} />
              </TouchableOpacity>
            )}
          />
          <FlatList
            data={this.state.selectedCategory ? products.filter(item => item.categoryId === this.state.selectedCategory) : products}
            renderItem={this.renderFoodItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      );
    }
  }

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

export default ProductListScreen;
