import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { MainProductList } from "./components/MainProductList";
// import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import { getProducts } from "../store/actions";
import {useTranslation} from "react-i18next";

const MAIN_URL = "http://localhost"; // TODO: move to config

export const HomeScreen = ({ navigation }) => {
  const products = useSelector(state => state.products)
  console.log('QQQproducts', products);
  const [nickName, setNickname] = useState();
  const [categories, setCategories] = useState();
  const dispatch = useDispatch();
  const {t} = useTranslation()

  useEffect(() => {
    axios.post(MAIN_URL + "/pastille")
      .then(res => {
        const data = res.data;
        dispatch(getProducts(data));
        setCategories(products);
      }).catch(error => error);
  }, [dispatch]);

  // const getNickname = () => {
  //   AsyncStorage.getItem(STORAGE_KEY)
  //     .then(nick => {
  //       if (nick !== null) {
  //         setNickname(nick);
  //         navigation.navigate("Home");
  //       }
  //     }).catch(e => e.message);
  // };

  return (
    // <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={t('home.data', { returnObjects: true })}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            console.log('EEEitem', item)
            return <MainProductList item={item} />;
          }}
        />
      </SafeAreaView>
    // </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
});
