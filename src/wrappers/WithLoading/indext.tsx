import React, { useState } from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Colors, Fonts } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type wrappedComponentProp = React.ComponentType<any> | React.FC<any>;

const withLoading = (WrappedComponent: wrappedComponentProp) => {
  return (props: any) => {
    const { translate } = useI18nLocate();
    const [modalVisible, showLoading] = useState(false);
    return (
      <View style={styles.wrapper}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.containerModal}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={Colors.tertiary} />
              <View>
                <Text style={styles.loadingText}>{translate('loading')}</Text>
              </View>
            </View>
          </View>
        </Modal>
        <WrappedComponent
          activeLoading={modalVisible}
          setLoading={showLoading}
          {...props}
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
    alignItems: 'center',
    backgroundColor: Colors.loadingBackground,
  },
  loadingContainer: {
    backgroundColor: Colors.background,
    padding: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    width: 200,
  },
  loadingText: {
    color: Colors.headline,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    marginLeft: 12,
  },
});

export default withLoading;
