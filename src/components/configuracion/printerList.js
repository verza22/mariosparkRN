import React, { Component  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert  } from 'react-native';
import { List,  Portal, Modal, FAB, withTheme, Button, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { NetPrinter } from "choiceqr-react-native-thermal-printer";

import { RemovePrinter, GetPrinters } from '../../redux/actions/printers'

class PrinterListScreen extends Component {
    constructor(props) {
      super(props);
      this.onPressFab = this.onPressFab.bind(this);
      this.printerTest = this.printerTest.bind(this);

      this.colors = props.theme.colors;

      this.state = {
        modalVisible: false,
        printerID: null
      };
    }

    componentDidMount(){
      this.props.GetPrinters(this.props.defaultStoreID);
    }

    handlePress(item){
      this.props.navigation.navigate('ConfigImpresoraEdit', { item });
    };

    onLongPress(item){
      this.setState({ modalVisible: true, printerID: item.id });
    };

    handleDelete = () => {
      this.setState({ modalVisible: false, printerID: null });
      this.props.RemovePrinter(this.state.printerID, ()=>{
        Alert.alert('Impresora eliminada');
      });
    };

    printerTest(item){
      let ip = item.ip;
      NetPrinter.init().then(() => {
        this.setState({ printers: [{ host: ip, port: 9100 }] })
        NetPrinter.connectPrinter(ip, 9100)
        .then((printer) => {
          this.setState({ currentPrinter: printer });
          NetPrinter.printText("<C>sample text LZ</C>\n<C>Prueba</C>\n<C>Prueba correcta</C>\n\n\n");
        });
      })
    }
  
    renderPrinter = ({ item }) => (
      <List.Item
        onPress={() => this.handlePress(item)}
        onLongPress={() => this.onLongPress(item)}
        title={item.name}
        description={`IP: ${item.ip}`}
        right={() => <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{item.isPrincipal ? 'P' : ''}</Text>
          <IconButton
              icon="printer"
              size={20}
              onPress={() => this.printerTest(item)}
          />
        </View>}
        style={styles.item}
      />
    );

    onPressFab() {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'ConfigImpresoraAdd' }]
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
                <Text>¿Estás seguro de que deseas eliminar esta impresora?</Text>
                <Button mode="contained" onPress={this.handleDelete} style={{ marginTop: 10 }}>
                  Confirmar Eliminación
                </Button>
              </View>
            </Modal>
          </Portal>
          <FlatList
            data={this.props.printers}
            renderItem={this.renderPrinter}
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
  defaultStoreID: state.appConfigReducer.defaultStoreID,
  printers: state.printerReducer.printers
});

const mapDispatchToProps = {
    RemovePrinter,
    GetPrinters
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PrinterListScreen));