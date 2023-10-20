import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import { categories } from '../../data';

import CustomPicker from '../lib/customPicker'

class ProductFormScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        productName: '',
        productPrice: 0,
        productCategory: null,
        productImage: null,
      };
    }
  
    pickImage = () => {
      const options = {
        noData: true,
      };
      launchImageLibrary(options, (response) => {
        if (response.assets && response.assets.length > 0) {
          this.setState({ productImage: response.assets[0].uri });
        }
      });
    };
  
    saveProduct = () => {
      const { productName, productImage } = this.state;
      // Aquí puedes implementar la lógica para guardar la categoría en tu base de datos
      // o realizar alguna acción con los datos ingresados.
      console.log('Category Name:', productName);
      console.log('Category Image:', productImage);
    };
  
    render() {
      const { productName, productPrice, productCategory, productImage } = this.state;
  
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
                items={categories}
                cLabel='name'
                cValue='id'
            />
            <Button mode="outlined" onPress={this.pickImage} style={styles.imageButton}>
              Seleccionar Imagen del producto
            </Button>
            {productImage && <Image source={{ uri: productImage }} style={styles.previewImage} />}
            <Button mode="contained" onPress={this.saveProduct} style={styles.saveButton}>
              Guardar Producto
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

export default ProductFormScreen;
