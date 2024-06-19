import React, { Component  } from 'react';
import { connect } from 'react-redux';

import { SYNC_INTERVAL } from './../config';

import { SyncOrders } from '../redux/actions/orders'

class SyncManager extends Component {
    constructor(props) {
      super(props);

      this.executeSync = this.executeSync.bind(this);

      this.intervalId = null;
    }

    componentDidMount(){
        if(this.intervalId)
            clearInterval(this.intervalId);

        this.intervalId = setInterval(this.executeSync, SYNC_INTERVAL);
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    executeSync(){
        if(this.props.isAuthenticated){
            if(this.props.ordersToUpload.length > 0){
                console.log("////SYNC ORDERS////")
                this.props.SyncOrders(this.props.ordersToUpload);
            }
            if(this.props.hotelOrdersToUpload.length > 0){
    
            }
        }
    }
  
    render() {
      return null
    }
  }

const mapStateToProps = state => ({
    isAuthenticated: state.appConfigReducer.isAuthenticated,
    ordersToUpload: state.ordersReducer.ordersToUpload,
    hotelOrdersToUpload: state.hotelOrderReducer.hotelOrdersToUpload
});

const mapDispatchToProps = {
    SyncOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncManager);