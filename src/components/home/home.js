import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { withTheme, IconButton, Portal, Modal, Button, List } from 'react-native-paper';
import { connect } from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';

import { GetWidgets, UpdateWidgetPositions, GetWidgetTypeList } from '../../redux/actions/widgets'
import Widget from './widget';

class HomeScreen extends Component {
    constructor(props) {
      super(props);
      this.colors = props.theme.colors;

      this.updateWidgets = this.updateWidgets.bind(this);
      this.addWidget = this.addWidget.bind(this);
      this.editMode = this.editMode.bind(this);
      this.orderWidget = this.orderWidget.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.showDelete = this.showDelete.bind(this);
      this.renderItem = this.renderItem.bind(this);
      this.handleOrder = this.handleOrder.bind(this);

      this.resolve = null;

      this.state = {
        editMode: false,
        modalVisible: false,
        dragVisible: false,
        orderWidgets: []
      };
    }

    componentDidMount(){
      this.updateWidgets();
      if(this.props.widgetTypeList.length === 0)
        this.props.GetWidgetTypeList();
    }

    componentDidUpdate(prevProps) {
      if ((this.props.route.params?.editedWidget !== prevProps.route.params?.editedWidget) && this.state.editMode) {
          this.setState({
            editMode: false
          });
      }
    }

    updateWidgets(){
      this.props.GetWidgets(this.props.userID);
    }

    addWidget(){
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'AddWidget' }]
      })
    }

    editMode(){
      this.setState({ editMode: !this.state.editMode });
    }

    orderWidget(){
      let orderWidgets = [...this.props.widgets];
      this.setState({dragVisible: true, orderWidgets});
    }

    handleDelete(){
      if(this.resolve){
        this.setState({modalVisible: false});
        this.resolve();
      }
    }

    showDelete(){
      return new Promise((resolve, reject) =>{
        this.resolve = resolve;
        this.setState({modalVisible: true});
      })
    }

    renderItem({ item, drag, isActive }){
      return <List.Item
        title={item.title}
        onLongPress={drag}
        style={{ backgroundColor: isActive ? '#f0f0f0' : '#fff' }}
      />
    }

    handleOrder(){
      let widgetOrder = this.state.orderWidgets.map(x=> x.id);
      this.props.UpdateWidgetPositions(this.props.userID, widgetOrder, ()=>{
        this.updateWidgets();
      });
      this.setState({dragVisible: false, orderWidgets: []});
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
                  <Text>¿Estás seguro de que deseas eliminar este widget?</Text>
                  <Button mode="contained" onPress={this.handleDelete} style={{ marginTop: 10 }}>
                    Confirmar Eliminación
                  </Button>
                </View>
              </Modal>
            </Portal>
            <Portal>
            <Modal 
              visible={this.state.dragVisible} 
              onDismiss={() => this.setState({ dragVisible: false })}
              contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
            >
              <DraggableFlatList
                data={this.state.orderWidgets}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
                onDragEnd={({ data }) => this.setState({orderWidgets: [...data]})}
              />
              <Button mode="contained" onPress={this.handleOrder} style={{ marginTop: 20 }}>
                Guardar
              </Button>
            </Modal>
          </Portal>
          <ScrollView>
            <View style={styles.containerBtn}>
              <IconButton
                icon="sort"
                iconColor={this.colors.primary}
                size={24}
                onPress={this.orderWidget}
                mode="contained-tonal"
              />
              <IconButton
                icon="pencil"
                iconColor={this.colors.primary}
                size={24}
                onPress={this.editMode}
                mode="contained-tonal"
              />
              <IconButton
                icon="plus"
                iconColor={this.colors.primary}
                size={24}
                onPress={this.addWidget}
                mode="contained-tonal"
              />
              <IconButton
                icon="refresh"
                iconColor={this.colors.primary}
                size={24}
                onPress={this.updateWidgets}
                mode="contained-tonal"
                style={[styles.iconButton]}
              />
            </View>
            
            <View style={styles.innerContainer}>
              {
                this.props.widgets.map(x => 
                  <Widget 
                    key={x.id} 
                    widget={x} 
                    editMode={this.state.editMode}
                    navigation={this.props.navigation}
                    showDelete={this.showDelete}
                  />
                )
              }
            </View>
          </ScrollView>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Asegura que las tarjetas se distribuyan uniformemente
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  containerBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 0,
  },
  iconButton: {
    marginRight: 12,
  },
});

const mapStateToProps = state => ({
    userID: state.appConfigReducer.user.id,
    widgets: state.widgetReducer.widgets,
    widgetTypeList: state.widgetReducer.widgetTypeList
});

const mapDispatchToProps = {
    GetWidgets,
    UpdateWidgetPositions,
    GetWidgetTypeList
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(HomeScreen));
