import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { withTheme, Icon, Menu, Provider } from 'react-native-paper';
import { connect } from 'react-redux';

import { Logout } from '../../redux/actions/appConfig'

class NavigationMenu extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.state = {
        menuVisible: false
    };
  }

  openMenu = () => this.setState({ menuVisible: true });
  closeMenu = () => this.setState({ menuVisible: false });

  logout() {
    this.closeMenu();
    this.props.navigation.navigate('Logout');
  }

  changePassword() {
    this.closeMenu();
    this.props.navigation.navigate('UpdatePassword');
  }

  render() {
    return (
        <View style={styles.headerTitleContainer}>
            {
                this.props.isAuthenticated ?
                <>
                    <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>{this.props.title}</Text>
                        {
                            this.props.offlineMode &&
                            <Icon source="cloud-alert" size={24} color="#fff" />
                        }
                    </View>
                    <Menu
                        visible={this.state.menuVisible}
                        onDismiss={this.closeMenu}
                        anchor={
                        <TouchableOpacity onPress={this.openMenu}>
                            <Image
                            source={require('./../../assets/profile.jpg')}
                            style={styles.profileImage}
                            />
                        </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={this.changePassword} title="Cambiar contraseña" />
                        <Menu.Item onPress={this.logout} title="Salir" />
                    </Menu>
                </> :
                <Text style={styles.headerTitle}>{this.props.title}</Text>
            }
      </View>
    );
  }
}


const styles = StyleSheet.create({
    headerTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerTitleView:{
        flex: 1
    },
    headerTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20
    }
  });

const mapDispatchToProps = {
    Logout
};

const mapStateToProps = state => ({
    isAuthenticated: state.appConfigReducer.isAuthenticated,
    offlineMode: state.appConfigReducer.offlineMode
  });

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(NavigationMenu));