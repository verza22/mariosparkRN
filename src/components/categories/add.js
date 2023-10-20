import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

class CategoryFormScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        categoryName: '',
        categoryImage: null,
      };
    }
  
    pickImage = () => {
      const options = {
        noData: true,
      };
      launchImageLibrary(options, (response) => {
        if (response.assets && response.assets.length > 0) {
          this.setState({ categoryImage: response.assets[0].uri });
        }
      });
    };
  
    saveCategory = () => {
      const { categoryName, categoryImage } = this.state;
      // Aquí puedes implementar la lógica para guardar la categoría en tu base de datos
      // o realizar alguna acción con los datos ingresados.
      console.log('Category Name:', categoryName);
      console.log('Category Image:', categoryImage);
    };
  
    render() {
      const { categoryName, categoryImage } = this.state;
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <TextInput
              label="Nombre de la Categoría"
              value={categoryName}
              onChangeText={(text) => this.setState({ categoryName: text })}
              style={styles.input}
            />
            <Button mode="outlined" onPress={this.pickImage} style={styles.imageButton}>
              Seleccionar Imagen de la Categoría
            </Button>
            {categoryImage && <Image source={{ uri: categoryImage }} style={styles.previewImage} />}
            <Button mode="contained" onPress={this.saveCategory} style={styles.saveButton}>
              Guardar Categoría
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

export default CategoryFormScreen;
