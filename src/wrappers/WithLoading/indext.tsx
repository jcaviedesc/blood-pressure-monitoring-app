import React, { useState } from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../../styles';

type wrappedComponentProp = React.ComponentType<any> | React.FC<any>;

const withLoading = (WrappedComponent: wrappedComponentProp) => {
  return () => {
    const [modalVisible, showLoading] = useState(false);
    return (
      <View style={styles.wrapper}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.containerModal}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        </Modal>
        <WrappedComponent
          activeLoading={modalVisible}
          setLoading={showLoading}
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.loadingBackground,
  },
});

export default withLoading;
