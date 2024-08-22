import React, { Component  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert  } from 'react-native';
import { List,  Portal, Modal, FAB, withTheme, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { NetPrinter } from "choiceqr-react-native-thermal-printer";
import { adjustText } from './../lib/util';

import { GetOrders } from '../../redux/actions/orders'

class OrdersListScreen extends Component {
    constructor(props) {
      super(props);
      this.onPressFab = this.onPressFab.bind(this);
      this.colors = props.theme.colors;
      this.state = {
        userID: null
      };
    }

    componentDidMount(){
      this.props.GetOrders(this.props.defaultStoreID);
    }

    handlePress(item){
      this.props.navigation.navigate('ShowOrder', { item });
    };

    onLongPress(item){
    //   this.setState({ modalVisible: true, userID: item.id });
    };
  
    renderOrder = ({ item }) => (
      <List.Item
        onPress={() => this.handlePress(item)}
        onLongPress={() => this.onLongPress(item)}
        title={"Venta "+item.id}
        style={styles.item}
        right={() => <View style={{ flexDirection: 'row', alignItems: 'center', padding: 0, margin: 0 }}>
          <IconButton
              icon="printer"
              size={20}
              style={{ padding: 0, margin: 0 }}
              onPress={() => this.printer(item)}
          />
        </View>}
      />
    );

    printer(item){
      //print
      this.props.printers.forEach(x=> {
        let ip = x.ip;
        let messageIni = x.messageIni;
        let messageFin = x.messageFin;
        if(x.isPrincipal){
          NetPrinter.init().then(() => {
          // this.setState({ printers: [{ host: ip, port: 9100 }] })
            NetPrinter.connectPrinter(ip, 9100)
            .then((printer) => {
            // this.setState({ currentPrinter: printer });
              //48caracteres de ancho
              let message = '';
              
              message += `${messageIni}\n
<C>ORDEN #${item.id}</C>
------------------------------------------------
${adjustText('Descripcion', 25, false)}${adjustText('Cant', 5, true)}${adjustText('P.Uni', 9, true)}${adjustText('P.Tot', 9, true)}
------------------------------------------------`;

item.products.forEach(p=> {
message += adjustText(p.name, 25, false)+adjustText(p.quantity.toString(), 5, true)+adjustText(p.price.toFixed(2), 9, true)+adjustText((p.price*p.quantity).toFixed(2), 9, true);
});

message += `\n
------------------------------------------------
${adjustText('TOTAL:', 36, true)}${adjustText(item.total.toFixed(2), 12, true)}
------------------------------------------------
\n
------------------------------------------------
CLIENTE: ${adjustText(item.customer.name, 39, false)}
CED/RUC: ${adjustText(item.customer.dni, 39, false)}
------------------------------------------------
${messageFin}
\n\n`;
              NetPrinter.printText(message);
            });
          });
        }
      });
    }

    onPressFab() {
      this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'OrderStep1' }]
    })
    }
  
    render() {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.props.orders}
            renderItem={this.renderOrder}
            keyExtractor={item => item.id.toString()}
          />
          {
            (this.props.authUser.type === this.props.userType["ADMIN"] || this.props.authUser.type === this.props.userType["CASHIER"]) &&
            <FAB
              style={{ ...styles.fab, backgroundColor: this.colors.primary }}
              icon="plus"
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
    orders: state.ordersReducer.orders,
    authUser: state.appConfigReducer.user,
    defaultStoreID: state.appConfigReducer.defaultStoreID,
    userType: state.appConfigReducer.userType,
    printers: state.printerReducer.printers
});

const mapDispatchToProps = {
  GetOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(OrdersListScreen));