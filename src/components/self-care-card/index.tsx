import React from 'react';
import { View, useColorScheme, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
import { RichEditor } from 'react-native-pell-rich-editor';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '../CustomText';
import { Colors, Fonts, Metrics } from '../../styles';
import { Owner } from '../../store/self-care/types';
import Avatar from '../Avatar';
// import { renderWebview } from './renderWebview';

type SelfCareCardListProps = {
  contentHtml: string;
  owner: Owner;
};
const cssText =
  'h1 {margin-bottom:20px; color: "red"!important; body: {background-color: "blue";}}';

const SelfCareCardList = ({
  contentHtml,
  owner,
}: SelfCareCardListProps): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  console.log(contentHtml);
  return (
    <View style={[styles.container, isDarkMode && styles.darkBackground]}>
      <View style={styles.header}>
        <Avatar avatarUri={owner?.avatar} size={30} />
        <View style={styles.headerContent}>
          <Text>{owner.name}</Text>
        </View>
      </View>
      <View>
        {/* <WebView
          useWebKit={true}
          scrollEnabled={false}
          hideKeyboardAccessoryView={true}
          keyboardDisplayRequiresUserAction={false}
          source={{ html: renderWebview({ content: editor.patient }) }}
          originWhitelist={['*']}
          dataDetectorTypes={'none'}
          domStorageEnabled={false}
          bounces={false}
          style={styles.rich}
        /> */}
        <RichEditor
          initialContentHTML={contentHtml}
          enterKeyHint={'done'}
          disabled
          initialHeight={200}
          style={styles.rich}
          editorStyle={{
            backgroundColor: isDarkMode
              ? Colors.darkCardBackground
              : Colors.cardBackground,
            color: isDarkMode ? Colors.textNormal : Colors.headline,
          }}
        />
      </View>
      <LinearGradient
        colors={
          isDarkMode
            ? ['rgba(97,108,119,0)', 'rgba(97,108,119,1)']
            : ['rgba(0,0,0,0)', 'rgba(255,255,254,0)', 'rgba(255,255,255,1)']
        }
        style={styles.linearGradient}>
        <Text style={[Fonts.style.small, styles.showMore]}>ver más</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: Colors.cardBackground,
    padding: 9,
    paddingBottom: 12,
    height: 240,
    marginBottom: 30,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    marginTop: 9,
    marginHorizontal: 6,
    height: 40,
  },
  headerContent: {
    marginLeft: 9,
  },
  rich: {
    minHeight: 166,
    flex: 1,
  },
  linearGradient: {
    alignItems: 'center',
    borderBottomColor: Colors.orange,
    bottom: 0,
    height: '50%',
    justifyContent: 'flex-end',
    paddingTop: 50,
    position: 'absolute',
    right: 0,
    width: Metrics.screenWidth,
    zIndex: 1,
  },
  showMore: {
    alignItems: 'flex-end',
    lineHeight: 14,
    color: Colors.boldText,
  },
  darkBackground: { backgroundColor: Colors.darkCardBackground },
});

export default SelfCareCardList;
