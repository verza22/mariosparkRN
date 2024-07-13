import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { withTheme, Card } from 'react-native-paper';
import { connect } from 'react-redux';

import { GetWidgets } from '../../redux/actions/widgets'

const { width } = Dimensions.get('window');

class Widget extends Component {
    constructor(props) {
        super(props);
        this.colors = props.theme.colors;

        this.sizeXList = [25,50,75,100];
        this.sizeYList = [50,100,150,200];

        this.state = {
            cardWidthPercentage: this.sizeXList[this.props.widget.sizeX-1],
            cardHeightPercentage: this.sizeYList[this.props.widget.sizeY-1]
        };
    }

    componentDidMount(){
    }
  
    render() {
        const { cardWidthPercentage, cardHeightPercentage } = this.state;
        const cardWidth = (width * cardWidthPercentage) / 100;

        return (<View style={[styles.container, { width: cardWidth }]}>
            <Card style={[styles.card]}>
                <Card.Title title={this.props.widget.title} titleStyle={styles.cardTitle} />
                <Card.Content style={[styles.cardContent, { height: cardHeightPercentage }]}>
                    <View style={styles.textContent}>
                        <Text variant="bodyMedium">{this.props.widget.symbol}</Text>
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
    cardTitle: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        alignSelf: 'center'
    },
    cardContent: {
        overflow: 'hidden',
    },
    textContent: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    }
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Widget));
