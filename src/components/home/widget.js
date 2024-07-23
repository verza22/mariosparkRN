import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { withTheme, Card, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import axios from 'axios';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";

import { API_URL } from './../../config';
import { RemoveWidget } from '../../redux/actions/widgets';

const { width } = Dimensions.get('window');

class Widget extends Component {
    constructor(props) {
        super(props);
        this.colors = props.theme.colors;

        this.editWidget = this.editWidget.bind(this);
        this.deleteWidget = this.deleteWidget.bind(this);

        this.state = {
            data: "",
            dataList: null,
            dataListCol: null
        };
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        axios({
            headers: {Authorization: `Bearer ${this.props.token}`},
            method: "POST",
            url: API_URL+"widget/GetWidgetData",
            data: {
                widgetID: this.props.widget.id,
                storeID: this.props.defaultStoreID,
                type: this.props.widget.type
            }
        })
        .then(res => {
            if(this.props.widget.type === 1){
                this.setState({data: res.data});
            }else{
                let data = eval(res.data);
                let dataList = data.map(x=> x.RESULT);
                let dataListCol = data.map(x=> x.WeekNumber);

                this.setState({dataList, dataListCol});
            }
        });
    }
    
    getValue(){
        if(this.props.widget.symbol === ""){
            return this.state.data;
        }else{
            let isLeading = this.props.widget.isLeading;
            let symbol = this.props.widget.symbol;
            if(isLeading){
                return symbol+" "+this.state.data; 
            }else{
                return this.state.data+" "+symbol;
            }
        }
    }

    editWidget(){
        this.props.navigation.navigate('EditWidget', { widget: this.props.widget });
    }

    deleteWidget(){
        this.props.showDelete()
        .then(res=>{
            this.props.RemoveWidget(this.props.widget.id, ()=>{

            });
        });
    }

    getWidth(){
        return this.props.widget.sizeX;
    }

    getHeight(){
        return this.props.widget.sizeY;
    }

    getGraph(cardWidth, cardHeightPercentage){
        switch(this.props.widget.type){
            case 2:
                return <LineChart
                    data={{
                    labels: this.state.dataListCol,
                    datasets: [{data: this.state.dataList}]
                    }}
                    width={cardWidth}
                    height={cardHeightPercentage}
                    chartConfig={{
                        backgroundGradientFrom: "#FFFFFF",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: "#FFFFFF",
                        backgroundGradientToOpacity: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                    }}
                />;
            // case 3:
            //     return <ProgressChart
            //         data={{
            //             labels: this.state.dataListCol,
            //             data: this.state.dataList
            //         }}
            //         width={cardWidth}
            //         height={cardHeightPercentage}
            //         chartConfig={{
            //             backgroundGradientFrom: "#FFFFFF",
            //             backgroundGradientFromOpacity: 0,
            //             backgroundGradientTo: "#FFFFFF",
            //             backgroundGradientToOpacity: 0,
            //             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            //         }}
            //         style={{
            //             marginVertical: 8,
            //         }}
            //     />;
            case 4:
                return <BarChart
                    data={{
                        labels: this.state.dataListCol,
                        datasets: [{data: this.state.dataList}]
                    }}
                    width={cardWidth}
                    height={cardHeightPercentage}
                    chartConfig={{
                        backgroundGradientFrom: "#FFFFFF",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: "#FFFFFF",
                        backgroundGradientToOpacity: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    style={{
                        marginVertical: 8,
                    }}
                />;
            default:
                return <Text>nada</Text>;
        }
    }
  
    render() {
        const cardWidthPercentage = this.getWidth();
        const cardHeightPercentage = this.getHeight();
        const cardWidth = (width * cardWidthPercentage) / 100;

        return (<View style={[styles.container, { width: cardWidth }]}>
            <Card style={styles.card}>
                <View style={styles.titleView}>
                    <Card.Title 
                        title={this.props.widget.title} 
                        titleStyle={styles.cardTitle} 
                        titleVariant="titleSmall"
                    />
                 </View>
                <Card.Content style={[styles.cardContent, { height: cardHeightPercentage }]}>
                    <View style={[styles.textContent, { flex: this.props.widget.type===1 || this.props.editMode ? 1 : 0 }]}>
                        {
                            this.props.editMode ? 
                                <View style={styles.btnView}>
                                    <IconButton
                                        icon="pencil"
                                        iconColor={this.colors.primary}
                                        size={48}
                                        onPress={this.editWidget}
                                    />
                                    {
                                        cardWidthPercentage > 25 &&
                                        <IconButton
                                            icon="delete"
                                            iconColor={this.colors.primary}
                                            size={48}
                                            onPress={this.deleteWidget}
                                        />
                                    }
                                </View>
                            :
                            <>
                                {
                                    this.props.widget.type===1 ? 
                                        <Text variant="bodyMedium">{this.getValue()}</Text>
                                    :
                                        <>
                                            {
                                                this.state.dataList !== null && this.getGraph(cardWidth, cardHeightPercentage)
                                            }
                                        </>
                                }
                            </>
                        }
                    </View>
                </Card.Content>
            </Card>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    card: {
        margin: 0,
    },
    cardContent: {
        overflow: 'hidden',
    },
    textContent: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    cardTitle: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        lineHeight: 13
    },
    titleView: {
        height: 25
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});

const mapStateToProps = state => ({
    defaultStoreID: state.appConfigReducer.defaultStoreID,
    token: state.appConfigReducer.token
});

const mapDispatchToProps = {
    RemoveWidget
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Widget));
