import React, {useEffect, useLayoutEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList, Image, useWindowDimensions,
} from "react-native";
import {Button} from "react-native-elements";
// import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {CartProductList} from "./components/CartProductList";
import {HeaderButtons} from "react-navigation-header-buttons";
import Ionicons from "react-native-vector-icons/Ionicons";
import basket from '../assets/basket.png'
import {useTranslation} from "react-i18next";

export const BasketScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButtons>
        <Ionicons onPress={() => navigation.navigate("SettingsScreen")} name="chevron-back" color="red" size={25}/>
      </HeaderButtons>,
    });
  }, []);

  const productsCart = useSelector(state => state.cart);
  const {width} = useWindowDimensions();
  const {t} = useTranslation()

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let sum = 0;
    productsCart.map((item) => {
      sum += item.price;
    });
    setTotalAmount(sum);
  });


  return (
    // <NativeBaseProvider>
      <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={productsCart}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <CartProductList totalAmount={totalAmount} item={item}/>;
          }}
        />
        {totalAmount === 0 &&
          <View style={{
            marginLeft: 130,
            width: 120,
            height: 120,
            backgroundColor: 'rgba(231,196,143,0.94)',
            borderRadius: 100,
            marginBottom: 130,
            justifyContent: 'center',
            alignItems: 'center' }}>
            <Image source={basket} style={{width: 100, height: 100,}}/>

          </View>
        }
        {/*<View style={styles.priceContainer}>*/}
        {/*  <View>*/}
        {/*    <Text style={{ fontWeight: "600" }}>Итого:</Text>*/}
        {/*    <Text style={{ fontWeight: "500", fontSize: 18 }}>{totalAmount} грн</Text>*/}
        {/*  </View>*/}
        {/*  <Button*/}
        {/*    title="Оплатить"*/}
        {/*    buttonStyle={{ ...styles.button, ...styles.buttonPay }}*/}
        {/*    // titleStyle={styles.titlePay}*/}
        {/*  />*/}
        {/*</View>*/}
      </SafeAreaView>
      <View style={styles.priceContainer}>
        <View>
          <Text style={{fontWeight: "600", color: 'gray', fontSize: 12}}>{t('totalText')}:</Text>
          <Text style={{fontWeight: "500", fontSize: 18}}>{totalAmount} {t('currency')}</Text>
        </View>
        <Button
          title={t("buttonPay")}
          buttonStyle={{...styles.button, ...styles.buttonPay}}
          // titleStyle={styles.titlePay}
        />
      </View>
      </>

    // </NativeBaseProvider>

  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    height: 550,
  },
  priceContainer: {
    flexDirection: "row",
    width: '100%',
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    bottom: 0,
    position: 'absolute'
  },
  button: {
    height: 40,
    width: 120,
    borderRadius: 50,
    backgroundColor: "white",
    opacity: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonPay: {
    backgroundColor: "#ec5e4e",
  },
});

