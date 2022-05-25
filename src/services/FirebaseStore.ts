import storage from '@react-native-firebase/storage';
import crashlytics from '@react-native-firebase/crashlytics';

const uploadFile = async (
  fileName: string,
  pathToFile: string,
  folderPath: string,
): Promise<string> => {
  let url = '';
  try {
    console.log(`${folderPath}/${fileName}`);
    const reference = storage().ref(`/${folderPath}/${fileName}`);
    await reference.putFile(pathToFile);
    url = await storage().ref(`/${folderPath}/${fileName}`).getDownloadURL();
  } catch (error) {
    crashlytics()
      .setAttribute('folderPath', folderPath)
      .then(() => {
        crashlytics().recordError(error);
      });
  }
  return url;
};

export default uploadFile;
