import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import { get_notific_token, get_token, save_notific_token } from "./src/config/storage";
import {AuthStack} from "./src/navigation/AuthStack";
import {TYPE_SCREEN} from "./src/store/constans";
import {RootStack} from "./src/navigation/RootStack";
import {changeLanguage} from "i18next";
import messaging from "@react-native-firebase/messaging";

export const Main = () => {
  const _default = useSelector((state) => state.type_screen);
  const [typeScreen, setTypeScreen] = useState('login')

  const dispatch = useDispatch();
  useEffect(() => {
    getToken()
    setTypeScreen(_default)
  }, [_default])
  // useEffect(async () => {
  //   const currentLang = await get_language();
  //   console.log("WWcurrentLang", currentLang);
  //   changeLanguage(currentLang);
  // }, [])
  const getPushData = (message) => {
    console.log("QQQmessage", message);
  };
  messaging().onMessage(getPushData);

  const getTokenNotific = async () => {
    const token_notification = await get_notific_token()
    console.log("QQQtoken_notification", token_notification);

    if(!token_notification) {
      const token = await messaging().getToken();
      console.log("QQQtoken", token);
      save_notific_token(token)
    }
  };
  useEffect(() => {
    getTokenNotific();
  }, []);

  const getToken = async () => {
    const token = await get_token();
    token
      ? dispatch({
        type: TYPE_SCREEN,
        payload: 'main',
      })
      : dispatch({
        type: TYPE_SCREEN,
        payload: 'login',
      });
  }

  return (
    <>
      <NavigationContainer>
        {typeScreen !== 'login' ?
          <RootStack/>:
          <AuthStack/>
        }
      </NavigationContainer>
    </>
  )
}
