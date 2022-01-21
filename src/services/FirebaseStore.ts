import storage from '@react-native-firebase/storage';

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
    console.log(error);
  }
  return url;
};

export default uploadFile;
