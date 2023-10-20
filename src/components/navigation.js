import React from 'react';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { withTheme } from 'react-native-paper';

import CategoriesListScreen from './categories/list'
import ProductListScreen from './products/list'
import ProductFormScreen from './products/add'
import CategoryFormScreen from './categories/add'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Abrir Menú" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
};


const Drawer = createDrawerNavigator();

const App = (props) => {

    getOption = (title, display = true) => {
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

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={getOption("Home")} />
        <Drawer.Screen name="Categorias" component={CategoriesListScreen} options={getOption("Categorias")} />
        <Drawer.Screen name="Productos" component={ProductListScreen} options={getOption("Productos")} />
        <Drawer.Screen name="AddProducto" component={ProductFormScreen} options={getOption("Add Producto", false)} />
        <Drawer.Screen name="AddCategoria" component={CategoryFormScreen} options={getOption("Add Categoria", false)} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default withTheme(App);
