import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { List, Portal, Modal, FAB, withTheme, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { RemoveCustomer, GetCustomers } from '../../redux/actions/customer';

class CustomersListScreen extends Component {
  constructor(props) {
    super(props);
    this.onPressFab = this.onPressFab.bind(this);
    this.colors = props.theme.colors;
    this.state = {
      modalVisible: false,
      customerID: null,
      searchText: ''
    };
  }

  componentDidMount() {
    this.props.GetCustomers(this.props.defaultStoreID);
  }

  handlePress(item) {
    this.props.navigation.navigate('EditCustomer', { item });
  }

  onLongPress(item) {
    this.setState({ modalVisible: true, customerID: item.id });
  }

  handleDelete = () => {
    this.setState({ modalVisible: false, customerID: null });
    this.props.RemoveCustomer(this.state.customerID, () => {
      Alert.alert('Cliente eliminado');
    });
  };

  renderCustomers = ({ item }) => (
    <List.Item
      onPress={() => this.handlePress(item)}
      onLongPress={() => this.onLongPress(item)}
      title={item.name}
      right={() => <Text>{"DNI: " + item.dni}</Text>}
      style={styles.item}
    />
  );

  onPressFab() {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'AddCustomer' }]
    });
  }

  handleSearch = (text) => {
    this.setState({ searchText: text });
  };

  getFilteredCustomers() {
    const { searchText } = this.state;
    const { customers } = this.props;
    if (!searchText) {
      return customers;
    }
    const lowercasedFilter = searchText.toLowerCase();
    return customers.filter(item =>
      item.name.toLowerCase().includes(lowercasedFilter) ||
      item.dni.toLowerCase().includes(lowercasedFilter)
    );
  }

  render() {
    const filteredCustomers = this.getFilteredCustomers();
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
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o DNI"
          value={this.state.searchText}
          onChangeText={this.handleSearch}
        />
        <FlatList
          data={filteredCustomers}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    paddingLeft: 10
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
  }
});

const mapStateToProps = state => ({
  customers: state.customerReducer.customers,
  defaultStoreID: state.appConfigReducer.defaultStoreID
});

const mapDispatchToProps = {
  RemoveCustomer,
  GetCustomers
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CustomersListScreen));