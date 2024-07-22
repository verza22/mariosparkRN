import React, { Component  }  from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import GlobalLoading from './lib/globalLoading';

import CategoriesListScreen from './categories/list'
import CategoryFormScreen from './categories/add'
import CategoryEditFormScreen from './categories/edit'

import ProductListScreen from './products/list'
import ProductFormScreen from './products/add'
import ProductEditFormScreen from './products/edit'

import CustomerListScreen from './customers/list'
import CustomerEditFormScreen from './customers/edit'
import CustomerFormScreen from './customers/add'

import UsersListScreen from './users/list'
import UserEditFormScreen from './users/edit'
import UserFormScreen from './users/add'
import UpdatePasswordFormScreen from './users/updatePassword'

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

import HomeScreen from './home/home'
import AddWidgetFormScreen from './home/addWidget'
import EditWidgetFormScreen from './home/editWidget'

import NavigationMenu from './appConfig/navigationMenu'

const HomeScreenDefault = ({ navigation }) => {
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

  getOption(title, display = true, navigation){
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
          <NavigationMenu title={title} navigation={navigation}/>
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

  render() {
    return (
      <NavigationContainer>
        {this.props.isAuthenticated ? (
          <Drawer.Navigator initialRouteName="Home">

            {
              this.props.authUser.type === this.props.userType["ADMIN"]
              ?
              <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => this.getOption("Home", true, navigation)}
              />
              :
              <Drawer.Screen
                name="Home"
                component={HomeScreenDefault}
                options={({ navigation }) => this.getOption("Home", true, navigation)}
              />
            }
            
  
            <Drawer.Screen
              name="Orders"
              component={OrdersListScreen}
              options={({ navigation }) => this.getOption("Ordenes", true, navigation)}
            />
            <Drawer.Screen
              name="ShowOrder"
              component={OrderShowScreen}
              options={({ navigation }) => this.getOption("Detalle Orden", false, navigation)}
            />
            <Drawer.Screen
              name="OrderStep1"
              component={OrderStep1Screen}
              options={({ navigation }) => this.getOption("Escoger Productos", false, navigation)}
            />
            <Drawer.Screen
              name="OrderStep2"
              component={OrderStep2Screen}
              options={({ navigation }) => this.getOption("Checkout", false, navigation)}
            />
            <Drawer.Screen
              name="OrderStep3"
              component={OrderStep3Screen}
              options={({ navigation }) => this.getOption("Cliente", false, navigation)}
            />
  
            {this.checkAccess('category') && (
              <>
                <Drawer.Screen
                  name="Categorias"
                  component={CategoriesListScreen}
                  options={({ navigation }) => this.getOption("Categorías", true, navigation)}
                />
                <Drawer.Screen
                  name="AddCategoria"
                  component={CategoryFormScreen}
                  options={({ navigation }) => this.getOption("Añadir Categoría", false, navigation)}
                />
                <Drawer.Screen
                  name="EditCategoria"
                  component={CategoryEditFormScreen}
                  options={({ navigation }) => this.getOption("Editar Categoría", false, navigation)}
                />
              </>
            )}
  
            {this.checkAccess('product') && (
              <>
                <Drawer.Screen
                  name="Productos"
                  component={ProductListScreen}
                  options={({ navigation }) => this.getOption("Productos", true, navigation)}
                />
                <Drawer.Screen
                  name="AddProducto"
                  component={ProductFormScreen}
                  options={({ navigation }) => this.getOption("Añadir Producto", false, navigation)}
                />
                <Drawer.Screen
                  name="EditProducto"
                  component={ProductEditFormScreen}
                  options={({ navigation }) => this.getOption("Editar Producto", false, navigation)}
                />
              </>
            )}
  
            {this.checkAccess('customer') && (
              <>
                <Drawer.Screen
                  name="Customers"
                  component={CustomerListScreen}
                  options={({ navigation }) => this.getOption("Clientes", true, navigation)}
                />
                <Drawer.Screen
                  name="AddCustomer"
                  component={CustomerFormScreen}
                  options={({ navigation }) => this.getOption("Añadir Cliente", false, navigation)}
                />
                <Drawer.Screen
                  name="EditCustomer"
                  component={CustomerEditFormScreen}
                  options={({ navigation }) => this.getOption("Editar Cliente", false, navigation)}
                />
              </>
            )}
  
            {this.checkAccess('hotelRoom') && (
              <>
                <Drawer.Screen
                  name="HotelRooms"
                  component={HotelRoomListScreen}
                  options={({ navigation }) => this.getOption("Habitaciones", true, navigation)}
                />
                <Drawer.Screen
                  name="AddHotelRoom"
                  component={HotelRoomFormScreen}
                  options={({ navigation }) => this.getOption("Añadir Habitación", false, navigation)}
                />
                <Drawer.Screen
                  name="EditHotelRoom"
                  component={HotelRoomEditFormScreen}
                  options={({ navigation }) => this.getOption("Editar Habitación", false, navigation)}
                />
              </>
            )}
  
            {this.checkAccess('hotelRoom') && (
              <>
                <Drawer.Screen
                  name="HotelOrders"
                  component={HotelOrderListScreen}
                  options={({ navigation }) => this.getOption("Hospedaje", true, navigation)}
                />
                <Drawer.Screen
                  name="AddHotelOrder"
                  component={HotelOrderFormScreen}
                  options={({ navigation }) => this.getOption("Añadir Hospedaje", false, navigation)}
                />
                <Drawer.Screen
                  name="EditHotelOrder"
                  component={HotelOrderEditFormScreen}
                  options={({ navigation }) => this.getOption("Editar Hospedaje", false, navigation)}
                />
              </>
            )}
  
            {this.checkAccess('user') && (
              <>
                <Drawer.Screen
                  name="Users"
                  component={UsersListScreen}
                  options={({ navigation }) => this.getOption("Usuarios", true, navigation)}
                />
                <Drawer.Screen
                  name="EditUser"
                  component={UserEditFormScreen}
                  options={({ navigation }) => this.getOption("Editar Usuario", false, navigation)}
                />
                <Drawer.Screen
                  name="AddUser"
                  component={UserFormScreen}
                  options={({ navigation }) => this.getOption("Añadir Usuario", false, navigation)}
                />
              </>
            )}
  
            <Drawer.Screen
              name="Logout"
              component={LogoutScreen}
              options={({ navigation }) => this.getOption("Salir", false, navigation)}
            />
            <Drawer.Screen
              name="UpdatePassword"
              component={UpdatePasswordFormScreen}
              options={({ navigation }) => this.getOption("Cambiar Contraseña", false, navigation)}
            />
            <Drawer.Screen
              name="AddWidget"
              component={AddWidgetFormScreen}
              options={({ navigation }) => this.getOption("Añadir widget", false, navigation)}
            />
            <Drawer.Screen
              name="EditWidget"
              component={EditWidgetFormScreen}
              options={({ navigation }) => this.getOption("Editar widget", false, navigation)}
            />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={({ navigation }) => this.getOption("Login", false, navigation)}
            />
          </Stack.Navigator>
        )}
        <GlobalLoading/>
      </NavigationContainer>
    );
  }
  
};

const styles = StyleSheet.create({
  headerIcon: {
    marginLeft: 'auto',
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.appConfigReducer.isAuthenticated,
  authUser: state.appConfigReducer.user,
  userType: state.appConfigReducer.userType
});

export default connect(mapStateToProps, null)(withTheme(App));
