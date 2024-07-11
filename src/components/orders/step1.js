import React, { Component } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
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
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOk = this.handleOk.bind(this);

    this.step2 = false;

    this.state = {
      selectedCategory: null,
      products: [],
      isModalVisible: false,
      newProductName: '',
      newProductPrice: ''
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

  openModal() {
    this.setState({ isModalVisible: true });
  }

  closeModal() {
    this.setState({ isModalVisible: false, newProductName: '', newProductPrice: '' });
  }

  handleOk() {
    this.setState({ products: [...this.state.products, {
      id: 0,
      name: this.state.newProductName,
      description: "",
      price: ""+this.state.newProductPrice,
      categoryId: 0,
      image: ""
    }] });
    this.closeModal();
  }

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
        <TouchableOpacity style={[styles.otherButton, { backgroundColor: this.colors.primary }]}  onPress={this.openModal}>
          <Text style={styles.otherButtonText}>OTRO</Text>
        </TouchableOpacity>
        {
          this.state.products.length > 0 &&
          <FAB
            style={{ ...styles.fab, backgroundColor: this.colors.primary }}
            icon="arrow-right"
            color="white"
            onPress={this.onPressFab}
          />
        }
        <Modal
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={this.closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Otro Producto</Text>
              <TextInput
                placeholder="Nombre"
                value={this.state.newProductName}
                onChangeText={(text) => this.setState({ newProductName: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Precio"
                value={this.state.newProductPrice}
                onChangeText={(text) => this.setState({ newProductPrice: text })}
                keyboardType="numeric"
                style={styles.input}
              />
              <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.okButton, { backgroundColor: this.colors.primary }]} onPress={this.handleOk}>
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={this.closeModal}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  otherButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    margin: 16,
    borderRadius: 30,
    alignItems: 'center'
  },
  otherButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  okButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
