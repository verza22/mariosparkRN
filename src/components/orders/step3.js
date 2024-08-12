import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput, withTheme, FAB, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import moment from 'moment';
import { NetPrinter } from "choiceqr-react-native-thermal-printer";
import { adjustText } from './../lib/util';

import RowVertical from './../lib/rowVertical';
import SearchPicker from './../lib/searchPicker';
import AddModal from './../customers/addModal';

import { AddOrder } from '../../redux/actions/orders';
import { GetCustomers } from '../../redux/actions/customer';
import { GetPrinters } from '../../redux/actions/printers'

class OrderStep3Screen extends Component {
  constructor(props) {
    super(props);

    this.colors = props.theme.colors;

    this.handleBackPressHandler = this.handleBackPressHandler.bind(this);
    this.waiterSelect = this.waiterSelect.bind(this);
    this.customerSelect = this.customerSelect.bind(this);
    this.onPressFab = this.onPressFab.bind(this);
    this.openModal = this.openModal.bind(this);

    this.refAddModal = React.createRef();

    let products = this.props.route.params.products;

    this.state = {
      products: products,
      waiterID: null,
      customer: null,
      tableNumber: null,
      isDefaultCustomer: false
    };
  }

  getTotal(products) {
    let total = 0;
    products.forEach(p => {
      total += p.price * p.quantity;
    });
    return total;
  }

  componentDidUpdate(prevProps) {
    if (this.props.route.params.products !== prevProps.route.params.products) {
      let products = this.props.route.params.products;
      this.setState({
        products: products
      });
    }
  }

  handleBackPressHandler() {
    this.props.navigation.navigate('OrderStep2');
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPressHandler);

    if (this.props.customers.length === 0) {
      this.props.GetCustomers(this.props.defaultStoreID);
    }
    if (this.props.printers.length === 0) {
      this.props.GetPrinters(this.props.defaultStoreID);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressHandler);
  }

  waiterSelect(user) {
    this.setState({ waiterID: user.id });
  }

  customerSelect(customer) {
    if (!this.state.isDefaultCustomer) {
      this.setState({
        customer: {
          id: customer.id,
          dni: customer.dni,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address
        }
      });
    }
  }

  onPressFab() {
    let date = moment().format();
    let total = this.getTotal(this.state.products);

    let order = {
      cashierID: this.props.userAuth.id,
      waiterID: this.state.waiterID,
      chefID: 0,
      total: total,
      date: date,
      paymentMethod: 'Efectivo',
      orderStatus: this.props.orderStatus['PENDIENTE'],
      customer: this.state.customer,
      products: this.state.products,
      tableNumber: Number(this.state.tableNumber)
    };

    this.props.AddOrder({
      ...order,
      storeID: this.props.defaultStoreID,
      callback: () => {
        this.props.navigation.navigate('Orders');

        //print
        this.props.printers.forEach(x=> {
          let ip = x.ip;
          let messageIni = x.messageIni;
          let messageFin = x.messageFin;

          NetPrinter.init().then(() => {
           // this.setState({ printers: [{ host: ip, port: 9100 }] })
            NetPrinter.connectPrinter(ip, 9100)
            .then((printer) => {
             // this.setState({ currentPrinter: printer });
              //48caracteres de ancho
              let message = '';
              
              message += `${messageIni}\n
------------------------------------------------
${adjustText('Descripcion', 25, false)}${adjustText('Cant', 5, true)}${adjustText('P.Uni', 9, true)}${adjustText('P.Tot', 9, true)}
------------------------------------------------`;

this.state.products.forEach(p=> {
  message += adjustText(p.name, 25, false)+adjustText(p.quantity.toString(), 5, true)+adjustText(p.price.toFixed(2), 9, true)+adjustText((p.price*p.quantity).toFixed(2), 9, true);
});

message += `\n
------------------------------------------------
${adjustText('TOTAL:', 36, true)}${adjustText(total.toFixed(2), 12, true)}
------------------------------------------------
\n
------------------------------------------------
CLIENTE: ${adjustText(this.state.customer.name, 39, false)}
CED/RUC: ${adjustText(this.state.customer.dni, 39, false)}
------------------------------------------------
${messageFin}
\n\n`;
              NetPrinter.printText(message);
            });
          });

        });
      }
    });
  }

  toggleDefaultCustomer = () => {
    const { isDefaultCustomer } = this.state;
    this.setState({
      isDefaultCustomer: !isDefaultCustomer,
      customer: !isDefaultCustomer
        ? {
            id: 0,
            dni: '9999999999',
            name: 'CONSUMIDOR FINAL',
            email: 'NA',
            phone: 'NA',
            address: 'NA'
          }
        : null
    });
  };

  openModal(){
    this.refAddModal.current.open();
  }

  render() {
    return (
      <View style={styles.container}>
        <RowVertical name="Escoger Cliente 2">
          <View style={styles.row}>
            <View style={styles.searchpicker}>
              {
                this.state.isDefaultCustomer ?
                <Text>CONSUMIDOR FINAL</Text>
                :
                <SearchPicker
                  text="Buscar"
                  items={this.props.customers}
                  onItemSelect={(customer) => this.customerSelect(customer)}
                />
              }
              
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={this.state.isDefaultCustomer ? 'checked' : 'unchecked'}
                onPress={this.toggleDefaultCustomer}
              />
            </View>
          </View>
        </RowVertical>
        <RowVertical name="Escoger Camarero">
          <SearchPicker
            text="Buscar"
            items={this.props.users}
            onItemSelect={(user) => this.waiterSelect(user)}
          />
        </RowVertical>
        <TextInput
          label="Numero de mesa"
          value={this.state.tableNumber}
          onChangeText={(text) => this.setState({ tableNumber: text })}
          style={styles.input}
          keyboardType="numeric"
        />
        <TouchableOpacity style={[styles.otherButton, { backgroundColor: this.colors.primary }]} onPress={this.openModal}>
          <Text style={styles.otherButtonText}>Nuevo Cliente</Text>
        </TouchableOpacity>
        <AddModal
          innerRef={this.refAddModal}
        />
        <FAB
          style={{ ...styles.fab, backgroundColor: this.colors.primary }}
          icon="check"
          color="white"
          onPress={this.onPressFab}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchpicker:{
    flex: 1
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 30
  },
  input: {
    marginBottom: 20
  },
  otherButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center'
  },
  otherButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

const mapStateToProps = (state) => {
  const userType = state.appConfigReducer.userType;
  return {
    defaultStoreID: state.appConfigReducer.defaultStoreID,
    customers: state.customerReducer.customers,
    userAuth: state.appConfigReducer.user,
    orderStatus: state.appConfigReducer.orderStatus,
    users: state.usersReducer.users.filter((x) => x.type === userType['WAITER']),
    printers: state.printerReducer.printers
  };
};

const mapDispatchToProps = {
  AddOrder,
  GetCustomers,
  GetPrinters
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(OrderStep3Screen));
