import React, { Component  }  from 'react';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

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

import LoginScreen from './appConfig/login'
import LogoutScreen from './appConfig/logout'

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
            backgroundColor: props.theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
      }
  }

  render(){
    return (
      <NavigationContainer>
        {
          this.props.isAuthenticated ? 
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} options={getOption("Home")} />
            <Drawer.Screen name="Orders" component={OrdersListScreen} options={getOption("Ordenes")} />
            <Drawer.Screen name="Categorias" component={CategoriesListScreen} options={getOption("Categorías")} />
            <Drawer.Screen name="Productos" component={ProductListScreen} options={getOption("Productos")} />
            <Drawer.Screen name="Customers" component={CustomerListScreen} options={getOption("Clientes")} />
            <Drawer.Screen name="Users" component={UsersListScreen} options={getOption("Usuarios")} />
            <Drawer.Screen name="Logout" component={LogoutScreen} options={getOption("Salir")} />
            <Drawer.Screen name="AddProducto" component={ProductFormScreen} options={getOption("Añadir Producto", false)} />
            <Drawer.Screen name="EditProducto" component={ProductEditFormScreen} options={getOption("Editar Producto", false)} />
            <Drawer.Screen name="AddCategoria" component={CategoryFormScreen} options={getOption("Añadir Categoría", false)} />
            <Drawer.Screen name="EditCategoria" component={CategoryEditFormScreen} options={getOption("Editar Categoría", false)} />
            <Drawer.Screen name="AddCustomer" component={CustomerFormScreen} options={getOption("Añadir Cliente", false)} />
            <Drawer.Screen name="EditCustomer" component={CustomerEditFormScreen} options={getOption("Editar Cliente", false)} />
            <Drawer.Screen name="EditUser" component={UserEditFormScreen} options={getOption("Editar Usuario", false)} />
            <Drawer.Screen name="AddUser" component={UserFormScreen} options={getOption("Añadir Usuario", false)} />
          </Drawer.Navigator> :
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={getOption("Login")} />
          </Stack.Navigator>
        }
      </NavigationContainer>
    );
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.appConfigReducer.isAuthenticated
});

export default connect(mapStateToProps, null)(withTheme(App));
