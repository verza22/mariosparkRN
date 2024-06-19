import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import CustomPicker from '../lib/customPicker'
import { UpdateProduct } from '../../redux/actions/products'

class ProductEditFormScreen extends Component {
    constructor(props) {
      super(props);
      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
      let item = this.props.route.params.item;

      this.state = {
        productID: item.id,
        productName: item.name,
        productDescription: item.description,
        productPrice: ""+item.price,
        productCategory: item.categoryId,
        productImage: item.image,
      };
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.item !== prevProps.route.params.item) {
            let item = this.props.route.params.item;
            this.setState({
                productID: item.id,
                productName: item.name,
                productDescription: item.description,
                productPrice: ""+item.price,
                productCategory: item.categoryId,
                productImage: item.image,
              })
        }
    }
  
    pickImage = () => {
      const options = {
        noData: true,
      };
      launchImageLibrary(options, (response) => {
        if (response.assets && response.assets.length > 0) {
          this.setState({ productImage: response.assets[0] });
        }
      });
    };
  
    saveProduct = () => {
      const { productID, productName, productDescription, productPrice, productCategory, productImage } = this.state;
      this.props.UpdateProduct(this.props.defaultStoreID, productID, productName, productDescription, productPrice, productCategory, productImage, () => {
        this.props.navigation.navigate('Productos');
      });
    };

    handleBackPressHandler(){
      this.props.navigation.navigate('Productos');
      return true;
    }

    componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);
    }

    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
    }
  
    render() {
      const { productName, productDescription, productPrice, productCategory, productImage } = this.state;
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <TextInput
              label="Nombre del producto"
              value={productName}
              onChangeText={(text) => this.setState({ productName: text })}
              style={styles.input}
            />
            <TextInput
              label="Precio del producto"
              keyboardType="numeric"
              value={productPrice}
              onChangeText={(text) => this.setState({ productPrice: text })}
              style={styles.input}
            />
            <CustomPicker
                label="Selecciona una categoria"
                value={productCategory}
                onValueChange={(itemValue) => this.setState({ productCategory: itemValue })}
                items={this.props.categories}
                cLabel='name'
                cValue='id'
            />
            <TextInput
              label="Descripcion"
              value={productDescription}
              onChangeText={(text) => this.setState({ productDescription: text })}
              multiline
              numberOfLines={5} // Ajusta según sea necesario
              style={styles.input}
            />
            <Button mode="outlined" onPress={this.pickImage} style={styles.imageButton}>
              Seleccionar Imagen del producto
            </Button>
            {productImage && <Image source={{ uri: typeof productImage.uri !== "undefined" ? productImage.uri : productImage }} style={styles.previewImage} />}
            <Button mode="contained" onPress={this.saveProduct} style={styles.saveButton}>
            Actualizar Producto
            </Button>
          </ScrollView>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  picker: {
    width: 200,
    height: 50,
  },
  contentContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 20,
  },
  imageButton: {
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  saveButton: {
    marginBottom: 20,
  },
});


const mapStateToProps = state => ({
  categories: state.categoryReducer.categories,
  defaultStoreID: state.appConfigReducer.defaultStoreID
});

const mapDispatchToProps = {
    UpdateProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditFormScreen);
