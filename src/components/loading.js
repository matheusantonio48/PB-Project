import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ActivityIndicator
} from 'react-native';

const load = (props) => {
    const { hide } = props;
    if (hide) {
        return null;
    }
    return (
        <View {...this.props} style={{
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            position: 'absolute',
            flex: 1, zIndex: 999999,
            width: '100%',
            height: '100%'
        }}>
            <ActivityIndicator size="large" color="#1e66aa" />
        </View>
    );
};

load.propTypes = {
    hide: PropTypes.bool,
};

export default load;