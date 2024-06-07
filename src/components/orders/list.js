import React, { Component  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert  } from 'react-native';
import { List,  Portal, Modal, FAB, withTheme, Button } from 'react-native-paper';
import { connect } from 'react-redux';

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
      this.props.GetOrders(this.props.token, this.props.defaultStoreID);
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
      />
    );

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
    token: state.appConfigReducer.token,
    defaultStoreID: state.appConfigReducer.defaultStoreID,
    userType: state.appConfigReducer.userType
});

const mapDispatchToProps = {
  GetOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(OrdersListScreen));