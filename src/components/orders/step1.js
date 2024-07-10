import React, { Component } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { List, FAB, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import { GetProducts } from '../../redux/actions/products';

class OrderStep1Screen extends Component {
  constructor(props) {
    super(props);
    this.colors = props.theme.colors;

    this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
    this.onPressFab = this.onPressFab.bind(this);

    this.step2 = false;

    this.state = {
      selectedCategory: null,
      products: []
    };
  }

  handleBackPressHandler() {
    this.props.navigation.navigate('Orders');
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);

    if (this.props.products.length === 0) {
      this.props.GetProducts(this.props.defaultStoreID, 0, true);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
  }

  componentDidUpdate(prevProps) {
    if (this.props.route.params?.clearProduct && this.step2 && this.state.products.length > 0) {
      this.step2 = false;
      this.setState({
        products: []
      })
    }
  }

  getCategoryName(categoryId) {
    let i = this.props.categories.findIndex(x => x.id === categoryId);
    return i >= 0 ? this.props.categories[i].name : "";
  }

  handlePress = (item) => {
    this.setState({ products: [...this.state.products, item] });
  };

  getProductCount = (productId) => {
    return this.state.products.filter(product => product.id === productId).length;
  };

  renderFoodItem = ({ item }) => (
    <List.Item
      onPress={() => this.handlePress(item)}
      title={item.name}
      description={`Price: $${item.price}`}
      left={() => (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.foodItemImage} />
        </View>
      )}
      right={() => {
        let n = this.getProductCount(item.id);
        return <View style={styles.categoryView}>
          <Text style={styles.category}>{this.getCategoryName(item.categoryId)}</Text>
          { n > 0 && 
            <Text style={[styles.productCount, { backgroundColor: this.colors.primary }]}>{n}</Text>
          }
        </View>
      }}
      style={styles.item}
    />
  );

  onPressFab() {
    this.step2 = true;
    this.props.navigation.navigate('OrderStep2', { products: this.state.products });
  };

  render() {
    return (
      <View style={styles.container}>
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
        {
          this.state.products.length > 0 &&
          <FAB
            style={{ ...styles.fab, backgroundColor: this.colors.primary }}
            icon="arrow-right"
            color="white"
            onPress={this.onPressFab}
          />
        }
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
  categoryView:{
    alignItems: 'flex-end',
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
  productCount: {
    color: 'white',
    borderRadius: 23,
    padding: 0,
    textAlign: 'center',
    width: 25,
    height: 25,
    lineHeight: 25, 
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  categories: state.categoryReducer.categories,
  products: state.productsReducer.products,
  defaultStoreID: state.appConfigReducer.defaultStoreID
});

const mapDispatchToProps = {
  GetProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(OrderStep1Screen));
