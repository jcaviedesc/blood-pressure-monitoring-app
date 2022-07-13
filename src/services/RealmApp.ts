import Realm from 'realm';

const appId = 'bettionsync-vjgga'; // Set App ID here.
const appConfig = {
  id: appId,
  timeout: 10000,
};
const app = new Realm.App(appConfig);
export default app;
