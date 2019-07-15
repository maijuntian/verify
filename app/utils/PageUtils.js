import * as Constant from "../style/constant"
import {Actions} from "react-native-router-flux";
import {changeLocale} from "../style/i18n";


export const loginPage = () => {
    if (Constant.APP_TYPE === 2) {
        Actions.LoginPageCN();
    } else {
        Actions.LoginPage();
    }
};

export const home = (res) => {
    Constant.REGION = res;
    Constant.APP_TYPE = res === "AU" ? 0 : res === "CN" ? 2 : 1;
    changeLocale();
    Actions.reset("root");

   /* if (Constant.APP_TYPE === 1) {
        Actions.reset("root_inter");
    } else {
        Actions.reset("root");
    }*/
};

export const home2 = () => {
  /*  if (Constant.APP_TYPE === 1) {
        Actions.reset("root_inter");
    } else {*/
        Actions.reset("root");
    // }
};