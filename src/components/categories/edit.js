import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import { UpdateCategory } from '../../redux/actions/category'

class CategoryEditFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
      let item = this.props.route.params.item;

      this.state = {
        categoryID: item.id,
        categoryName: item.name,
        categoryImage: item.image,
      };
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.item !== prevProps.route.params.item) {
            let item = this.props.route.params.item;
            this.setState({
                categoryID: item.id,
                categoryName: item.name,
                categoryImage: item.image,
            })
        }
    }

    handleBackPressHandler(){
        this.props.navigation.navigate('Categorias');
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
    }
  
    pickImage = () => {
      const options = {
        noData: true,
      };
      launchImageLibrary(options, (response) => {
        if (response.assets && response.assets.length > 0) {
          this.setState({ categoryImage: response.assets[0] });
        }
      });
    };
  
    saveCategory = () => {
      const { categoryID, categoryName, categoryImage } = this.state;
      this.props.UpdateCategory(this.props.defaultStoreID, categoryID, categoryName, categoryImage, ()=>{
        this.props.navigation.navigate('Categorias');
      });
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
            {categoryImage && <Image source={{ uri: typeof categoryImage.uri !== "undefined" ? categoryImage.uri : categoryImage }} style={styles.previewImage} />}
            <Button mode="contained" onPress={this.saveCategory} style={styles.saveButton}>
              Actualizar Categoría
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

const mapStateToProps = state => ({
  defaultStoreID: state.appConfigReducer.defaultStoreID
});

const mapDispatchToProps = {
  UpdateCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEditFormScreen);
