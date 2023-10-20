import React, { Component  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { categories } from '../../data';
import { FAB } from 'react-native-paper';
import { withTheme } from 'react-native-paper';

class CategoriesListScreen extends Component {
    constructor(props) {
      super(props);
      this.colors = props.theme.colors;
      this.state = {
        selectedCategory: null,
      };
    }
  
    getCategoryName(categoryId) {
      let i = categories.findIndex(x => x.id === categoryId);
      return i >= 0 ? categories[i].name : "";
    };
  
    renderCategories = ({ item }) => (
      <List.Item
        title={item.name}
        // description={`Price: $${item.price}`}
        left={() => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.foodItemImage} />
          </View>
        )}
        style={styles.item}
      />
    );

    onPressFab = () => {
      this.props.navigation.navigate('AddCategoria');
    };
  
    render() {
      return (
        <View style={styles.container}>
          <FlatList
            data={categories}
            renderItem={this.renderCategories}
            keyExtractor={item => item.id.toString()}
          />
           <FAB
             style={{ ...styles.fab, backgroundColor: this.colors.primary }}
            icon="plus"
            color="white"
            onPress={this.onPressFab}
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 30,
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

export default withTheme(CategoriesListScreen);
