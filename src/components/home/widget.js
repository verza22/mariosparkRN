import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { withTheme, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import axios from 'axios';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";

import { API_URL } from './../../config';

const { width } = Dimensions.get('window');

class Widget extends Component {
    constructor(props) {
        super(props);
        this.colors = props.theme.colors;

        this.sizeXList = [25,50,75,100];
        this.sizeYList = [50,100,150,200];

        this.state = {
            cardWidthPercentage: this.sizeXList[this.props.widget.sizeX-1],
            cardHeightPercentage: this.sizeYList[this.props.widget.sizeY-1],
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
            if(this.props.widget.type === 0){
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
  
    render() {
        const { cardWidthPercentage, cardHeightPercentage } = this.state;
        const cardWidth = (width * cardWidthPercentage) / 100;

        return (<View style={[styles.container, { width: cardWidth }]}>
            <Card style={[styles.card]}>
                <View style={styles.titleView}>
                    <Card.Title 
                        title={this.props.widget.title} 
                        titleStyle={styles.cardTitle} 
                        titleVariant="titleSmall"
                    />
                 </View>
                <Card.Content style={[styles.cardContent, { height: cardHeightPercentage }]}>
                    <View style={[styles.textContent, { flex: this.props.widget.type===0 ? 1 : 0 }]}>
                        {
                            this.props.widget.type===0 ? 
                                <Text variant="bodyMedium">{this.getValue()}</Text>
                            :
                                <>
                                    {
                                        this.state.dataList !== null &&
                                        <LineChart
                                            data={{
                                            labels: this.state.dataListCol,
                                            datasets: [{data: this.state.dataList}]
                                            }}
                                            width={cardWidth} // from react-native
                                            height={cardHeightPercentage}
                                            chartConfig={{
                                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            }}
                                            bezier
                                            style={{
                                                marginVertical: 8,
                                            }}
                                        />
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
    }
});

const mapStateToProps = state => ({
    defaultStoreID: state.appConfigReducer.defaultStoreID,
    token: state.appConfigReducer.token
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Widget));
