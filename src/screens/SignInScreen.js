import React, { useEffect, useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-elements";
import axios from "axios";
import {set_token} from "../config/storage";
import {useDispatch} from "react-redux";
import {TYPE_SCREEN} from "../store/constans";

const MAIN_URL = "http://localhost"; // TODO: move to config
export const SignInScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButtons>
        <Ionicons onPress={() => navigation.navigate("Home")} name="chevron-back" color="white" size={25} />
      </HeaderButtons>,
    });
  }, []);

  const dispatch = useDispatch()

  const [data, setData] = useState({
    nickName: null,
    email: null,
    password: null,
  });

  const onChangeNickname = (val) => {
    console.log("VAL", val);
    setData((preState) => ({
      ...preState,
      nickName: val,
    }));
  };
  const onChangeEmail = (val) => {
    console.log("VAL", val);
    setData((preState) => ({
      ...preState,
      email: val,
    }));
  };
  const onChangePassword = (val) => {
    console.log("VAL", val);
    setData((preState) => ({
      ...preState,
      password: val,
    }));
  };

  // useEffect(() => {
  //   getNickname();
  // }, []);

  const handleSignIn = () => {
    console.log('handleSignIn')

    axios.post(MAIN_URL + "/signin", {
      nickname: data.nickName,
      email: data.email,
      password: data.password,
    }).then(result => {
      console.log('EEEresult_data', result.data)
      const {accessToken} = result.data
      set_token(accessToken)
      dispatch({
        type: TYPE_SCREEN,
        payload: "main",
      })
      navigation.navigate('Home')
      console.log('EEEaccessToken', accessToken)

      // const { email, password, nickname } = result.data.passResult;
      // if (!email || (email && email.trim().length === '')) {
      //   console.log('Поле не может быть пустым')
      // } else {
      //   set_token(nickname, email, password)
      //     // .then(() => navigation.navigate("Home"));
      // }

    }).catch(error => {
      error.message;
    });
  };
  //
  // const getNickname = () => {
  //   AsyncStorage.getItem("@save_nickname")
  //     .then (nick => {
  //       if (nick !== null) {
  //         navigation.navigate("Home");
  //       }
  //     }).catch(e => e.message);
  // };

  return (
    <KeyboardAvoidingView style={{
      flex: 1,
    }}>
      <ScrollView style={styles.mainTextStyle}>
        <View style={styles.center}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={{ ...styles.title, ...styles.info }}>
            Log in with your account
          </Text>
        </View>

        <TextInput
          style={styles.input}
          onChangeText={onChangeNickname}
          value={data.nickName}
          placeholder="Nickname"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={data.email}
          placeholder="email"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={data.password}
          placeholder="password"
          keyboardType="numeric"
        />
        <Button
          title="LOGIN"
          onPress={handleSignIn}
          buttonStyle={{ ...styles.button, ...styles.buttonSignUp }}
          titleStyle={styles.titleSignUp}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainTextStyle: {
    backgroundColor: "#efe8e8",
    flexDirection: "column",
    paddingHorizontal: 30,
    textAlign: "center",
    paddingVertical: 150,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(117,117,117,0.56)",
    padding: 10,
  },

  button: {
    marginTop: 30,
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    opacity: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonSignUp: {
    backgroundColor: "#ec5e4e",
  },
  titleSignUp: {
    color: "white",
  },
  title: {
    fontSize: 35,
    color: "#423e3e",
    textAlign: "center",
  },
  center: {
    paddingTop: 3,
  },
  info: {
    fontSize: 20,
    marginHorizontal: 20,
    margin: 20,
  },
});
