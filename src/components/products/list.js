
import React, { Component  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { List, FAB, withTheme, Portal, Modal, Button } from 'react-native-paper';
import { connect } from 'react-redux';

import { RemoveProduct } from '../../redux/actions'

class ProductListScreen extends Component {
    constructor(props) {
      super(props);
      this.colors = props.theme.colors;
      this.onPressFab = this.onPressFab.bind(this);
      this.state = {
        selectedCategory: null,
        modalVisible: false,
        productID: null
      };
    }
  
    getCategoryName(categoryId) {
      let i = this.props.categories.findIndex(x => x.id === categoryId);
      return i >= 0 ? this.props.categories[i].name : "";
    };

    handlePress = (item) => {
      this.props.navigation.navigate('EditProducto', { item });
    };

    onLongPress(item){
      this.setState({ modalVisible: true, productID: item.id });
    };

    handleDelete = () => {
      this.props.RemoveProduct(this.state.productID);
      this.setState({ modalVisible: false, productID: null });
      Alert.alert('Producto eliminado');
    };
  
    renderFoodItem = ({ item }) => (
      <List.Item
        onPress={() => this.handlePress(item)}
        onLongPress={() => this.onLongPress(item)}
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

    onPressFab()  {
      // this.props.navigation.navigate('AddProducto');
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'AddProducto' }]
  })
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Portal>
            <Modal 
              visible={this.state.modalVisible} 
              onDismiss={() => this.setState({ modalVisible: false })}
              contentContainerStyle={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}
            >
              <View style={{ margin: 20 }}>
                <Text>¿Estás seguro de que deseas eliminar esta categoría?</Text>
                <Button mode="contained" onPress={this.handleDelete} style={{ marginTop: 10 }}>
                  Confirmar Eliminación
                </Button>
              </View>
            </Modal>
          </Portal>
          <FlatList
            horizontal
            style={{ maxHeight: this.state.selectedCategory === null ? 100 : 75 }}
            data={this.props.categories}
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
            data={this.state.selectedCategory ? this.props.products.filter(item => item.categoryId === this.state.selectedCategory) : this.props.products}
            renderItem={this.renderFoodItem}
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

const mapStateToProps = state => ({
  categories: state.categories,
  products: state.products
});

const mapDispatchToProps = {
  RemoveProduct
};


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ProductListScreen));