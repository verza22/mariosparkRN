import React, { Component  }  from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { withTheme, Icon } from 'react-native-paper';
import { connect } from 'react-redux';

import GlobalLoading from './lib/globalLoading';

import CategoriesListScreen from './categories/list'
import ProductListScreen from './products/list'
import ProductFormScreen from './products/add'
import CategoryFormScreen from './categories/add'
import CategoryEditFormScreen from './categories/edit'
import ProductEditFormScreen from './products/edit'
import CustomerListScreen from './customers/list'
import CustomerEditFormScreen from './customers/edit'
import CustomerFormScreen from './customers/add'
import UsersListScreen from './users/list'
import UserEditFormScreen from './users/edit'
import UserFormScreen from './users/add'

import OrdersListScreen from './orders/list'
import OrderShowScreen from './orders/show'
import OrderStep1Screen from './orders/step1'
import OrderStep2Screen from './orders/step2'
import OrderStep3Screen from './orders/step3'

import LoginScreen from './appConfig/login'
import LogoutScreen from './appConfig/logout'

import HotelRoomListScreen from './hotelRooms/list'
import HotelRoomFormScreen from './hotelRooms/add'
import HotelRoomEditFormScreen from './hotelRooms/edit'

import HotelOrderListScreen from './hotelOrders/list'
import HotelOrderFormScreen from './hotelOrders/add'
import HotelOrderEditFormScreen from './hotelOrders/edit'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Abrir Menú" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  getOption(title, display = true){
      return {
        title: title,
        drawerItemStyle: { display: display ? '' : 'none' },
        headerStyle: {
            backgroundColor: this.props.theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
            {
              this.props.offlineMode &&
              <Icon source="cloud-alert" size={24} color="#fff" />
            }
          </View>
        ),
      }
  }

  checkAccess(category){
    switch(category){
      case 'hotelRoom':
      case 'product':
      case 'category':
        return this.props.authUser.type === this.props.userType["ADMIN"];
      case 'customer':
        return this.props.authUser.type === this.props.userType["ADMIN"] || this.props.authUser.type === this.props.userType["CASHIER"];
      case 'user':
        return this.props.authUser.type === this.props.userType["ADMIN"] || this.props.authUser.type === this.props.userType["CASHIER"];
    }
  }

  render(){
    return (
      <NavigationContainer>
        {
          this.props.isAuthenticated ? 
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} options={this.getOption("Home")} />

            <Drawer.Screen name="Orders" component={OrdersListScreen} options={this.getOption("Ordenes")} />
            <Drawer.Screen name="ShowOrder" component={OrderShowScreen} options={this.getOption("Detalle Orden", false)} />
            <Drawer.Screen name="OrderStep1" component={OrderStep1Screen} options={this.getOption("Escoger Productos", false)} />
            <Drawer.Screen name="OrderStep2" component={OrderStep2Screen} options={this.getOption("Checkout", false)} />
            <Drawer.Screen name="OrderStep3" component={OrderStep3Screen} options={this.getOption("Cliente", false)} />

            {
              this.checkAccess('category') && 
              <>
                <Drawer.Screen name="Categorias" component={CategoriesListScreen} options={this.getOption("Categorías")} />
                <Drawer.Screen name="AddCategoria" component={CategoryFormScreen} options={this.getOption("Añadir Categoría", false)} />
                <Drawer.Screen name="EditCategoria" component={CategoryEditFormScreen} options={this.getOption("Editar Categoría", false)} />
              </>
            }

            {
              this.checkAccess('product') && 
              <>
                <Drawer.Screen name="Productos" component={ProductListScreen} options={this.getOption("Productos")} />
                <Drawer.Screen name="AddProducto" component={ProductFormScreen} options={this.getOption("Añadir Producto", false)} />
                <Drawer.Screen name="EditProducto" component={ProductEditFormScreen} options={this.getOption("Editar Producto", false)} />
              </>
            }

            {
              this.checkAccess('customer') && 
              <>
                <Drawer.Screen name="Customers" component={CustomerListScreen} options={this.getOption("Clientes")} />
                <Drawer.Screen name="AddCustomer" component={CustomerFormScreen} options={this.getOption("Añadir Cliente", false)} />
                <Drawer.Screen name="EditCustomer" component={CustomerEditFormScreen} options={this.getOption("Editar Cliente", false)} />
              </>
            }

            {
              this.checkAccess('hotelRoom') && 
              <>
                <Drawer.Screen name="HotelRooms" component={HotelRoomListScreen} options={this.getOption("Habitaciones")} />
                <Drawer.Screen name="AddHotelRoom" component={HotelRoomFormScreen} options={this.getOption("Añadir Habitación", false)} />
                <Drawer.Screen name="EditHotelRoom" component={HotelRoomEditFormScreen} options={this.getOption("Editar Habitación", false)} />
              </>
            }

            {
              this.checkAccess('hotelRoom') && 
              <>
                <Drawer.Screen name="HotelOrders" component={HotelOrderListScreen} options={this.getOption("Hospedaje")} />
                <Drawer.Screen name="AddHotelOrder" component={HotelOrderFormScreen} options={this.getOption("Añadir Hospedaje", false)} />
                <Drawer.Screen name="EditHotelOrder" component={HotelOrderEditFormScreen} options={this.getOption("Editar Hospedaje", false)} />
              </>
            }
            
            {
              this.checkAccess('user') && 
              <>
                <Drawer.Screen name="Users" component={UsersListScreen} options={this.getOption("Usuarios")} />
                <Drawer.Screen name="EditUser" component={UserEditFormScreen} options={this.getOption("Editar Usuario", false)} />
                <Drawer.Screen name="AddUser" component={UserFormScreen} options={this.getOption("Añadir Usuario", false)} />
              </>
            }

            <Drawer.Screen name="Logout" component={LogoutScreen} options={this.getOption("Salir")} />
          </Drawer.Navigator> :
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={this.getOption("Login")} />
          </Stack.Navigator>
        }
        <GlobalLoading/>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 16,
  },
  headerTitle: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerIcon: {
    marginLeft: 'auto',
  },
});

const mapStateToProps = state => ({
  isAuthenticated: state.appConfigReducer.isAuthenticated,
  authUser: state.appConfigReducer.user,
  userType: state.appConfigReducer.userType,
  offlineMode: state.appConfigReducer.offlineMode
});

export default connect(mapStateToProps, null)(withTheme(App));
