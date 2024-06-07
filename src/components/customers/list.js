import React, { Component  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert  } from 'react-native';
import { List,  Portal, Modal, FAB, withTheme, Button } from 'react-native-paper';
import { connect } from 'react-redux';

import { RemoveCustomer, GetCustomers } from '../../redux/actions/customer'

class CustomersListScreen extends Component {
    constructor(props) {
      super(props);
      this.onPressFab = this.onPressFab.bind(this);
      this.colors = props.theme.colors;
      this.state = {
        modalVisible: false,
        customerID: null
      };
    }

    componentDidMount(){
      this.props.GetCustomers(this.props.token, this.props.defaultStoreID);
    }

    handlePress(item){
      this.props.navigation.navigate('EditCustomer', { item });
    };

    onLongPress(item){
      this.setState({ modalVisible: true, customerID: item.id });
    };

    handleDelete = () => {
      this.props.RemoveCustomer(this.state.customerID);
      this.setState({ modalVisible: false, customerID: null });
      Alert.alert('Cliente eliminado');
    };
  
    renderCustomers = ({ item }) => (
      <List.Item
        onPress={() => this.handlePress(item)}
        onLongPress={() => this.onLongPress(item)}
        title={item.name}
        style={styles.item}
      />
    );

    onPressFab() {
      this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'AddCustomer' }]
    })
    }
  
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
                <Text>¿Estás seguro de que deseas eliminar este cliente?</Text>
                <Button mode="contained" onPress={this.handleDelete} style={{ marginTop: 10 }}>
                  Confirmar Eliminación
                </Button>
              </View>
            </Modal>
          </Portal>
          <FlatList
            data={this.props.customers}
            renderItem={this.renderCustomers}
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
  customers: state.customerReducer.customers,
  token: state.appConfigReducer.token,
  defaultStoreID: state.appConfigReducer.defaultStoreID
});

const mapDispatchToProps = {
    RemoveCustomer,
    GetCustomers
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CustomersListScreen));