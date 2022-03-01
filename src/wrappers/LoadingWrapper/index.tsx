import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { Colors, Fonts } from '../../styles';
import { useAppSelector } from '../../hooks';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { selectAppScreenLoading } from '../../store/app/appSlice';

type wrappedComponentProp = {
  children: Element | Element[];
};

const LoadingWrapper: React.FC<wrappedComponentProp> = ({ children }) => {
  const { translate } = useI18nLocate();
  const isScreenLoading = useAppSelector(selectAppScreenLoading);
  return (
    <View style={styles.wrapper}>
      <Modal animationType="fade" transparent={true} visible={isScreenLoading}>
        <View style={styles.containerModal}>
          <View style={styles.loadingContainer}>
            <DotIndicator size={18} color={Colors.tertiary} count={3} />
            <View>
              <Text style={styles.loadingText}>{translate('loading')}</Text>
            </View>
          </View>
        </View>
      </Modal>
      {children}
    </View>
  );
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
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  },
  loadingText: {
    color: Colors.white,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    marginTop: 12,
  },
});

export default LoadingWrapper;
