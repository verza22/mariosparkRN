import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import CustomPicker from '../lib/customPicker'
import {launchImageLibrary} from 'react-native-image-picker';

import { UpdateHotelRoom } from '../../redux/actions/hotelRoom'

class HotelRoomEditFormScreen extends Component {
    constructor(props) {
      super(props);

      this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
      let item = this.props.route.params.item;

      this.state = {
        id: item.id,
        name: item.name,
        capacity: item.capacity.toString(),
        type: item.type,
        priceBabies: item.priceBabies.toString(),
        priceChildren: item.priceChildren.toString(),
        priceAdults: item.priceAdults.toString(),
        image: item.image,
        description: item.description
      };
    }

    componentDidUpdate(prevProps) {
        if (this.props.route.params.item !== prevProps.route.params.item) {
            let item = this.props.route.params.item;
            this.setState({
                id: item.id,
                name: item.name,
                capacity: item.capacity.toString(),
                type: item.type,
                priceBabies: item.priceBabies.toString(),
                priceChildren: item.priceChildren.toString(),
                priceAdults: item.priceAdults.toString(),
                image: item.image,
                description: item.description
            })
        }
    }

    handleBackPressHandler(){
        this.props.navigation.navigate('HotelRooms');
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
    }
  
    save = () => {
      let { id, name, capacity, type, priceBabies, priceChildren, priceAdults, image, description } = this.state;

      description = description && description !== "" ? description : ".";
      console.log(description)

      this.props.UpdateHotelRoom(id, name, Number(capacity), type, this.props.defaultStoreID, parseFloat(priceBabies), parseFloat(priceChildren), parseFloat(priceAdults), image, description, ()=>{
        this.props.navigation.navigate('HotelRooms');
      });
    };

    pickImage = () => {
      const options = {
        noData: true,
      };
      launchImageLibrary(options, (response) => {
        if (response.assets && response.assets.length > 0) {
          this.setState({ image: response.assets[0] });
        }
      });
    };
  
    render() {
      const { name, capacity, type, priceBabies, priceChildren, priceAdults, image, description } = this.state;
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
          <TextInput
              label="Nombre"
              value={name}
              onChangeText={(text) => this.setState({ name: text })}
              style={styles.input}
            />
            <TextInput
              label="Capacidad"
              keyboardType='numeric'
              value={capacity}
              onChangeText={(text) => this.setState({ capacity: text })}
              style={styles.input}
            />
            <CustomPicker
                label="Selecciona un tipo"
                value={type}
                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                items={this.props.hotelRoomTypes}
                cLabel='name'
                cValue='id'
            />
            <TextInput
              label="Precio Bebes"
              keyboardType='numeric'
              value={priceBabies}
              onChangeText={(text) => this.setState({ priceBabies: text })}
              style={styles.input}
            />
            <TextInput
              label="Precio Niños"
              keyboardType='numeric'
              value={priceChildren}
              onChangeText={(text) => this.setState({ priceChildren: text })}
              style={styles.input}
            />
            <TextInput
              label="Precio Adultos"
              keyboardType='numeric'
              value={priceAdults}
              onChangeText={(text) => this.setState({ priceAdults: text })}
              style={styles.input}
            />
            <TextInput
              label="Descripcion"
              value={description}
              onChangeText={(text) => this.setState({ description: text })}
              multiline={true}
              mode="outlined"
              style={styles.textArea}
            />
            <Button mode="outlined" onPress={this.pickImage} style={styles.imageButton}>
              Seleccionar Imagen del producto
            </Button>
            {image && <Image source={{ uri: typeof image.uri !== "undefined" ? image.uri : image }} style={styles.previewImage} />}
            <Button mode="contained" onPress={this.save} style={styles.saveButton}>
              Actualizar Habitación
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
  textArea: {
    height: 120,
    marginBottom: 16,
  },
  imageButton: {
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  }
});

const mapStateToProps = state => ({
    defaultStoreID: state.appConfigReducer.defaultStoreID,
    hotelRoomTypes: state.appConfigReducer.hotelRoomTypes
});

const mapDispatchToProps = {
    UpdateHotelRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelRoomEditFormScreen);
