import React from "react";
import {SafeAreaView, TouchableOpacity, View, StyleSheet, Text, Image, TouchableOpacityComponent} from "react-native";
import commonStyles from "../../styles/CommonStyles";
import {themeStyles} from "../../styles/theme/ThemeStyles"
import Header from "../componenti/HeaderTender";
import SettingsInfo from "../../dati/SettingsInfo";
import {IconsButton} from "../../dati/IconsButton";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import {MaterialIcons} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const InitialSelectorScreen = ({route, navigation}) => {
    return (
        <SafeAreaView style={commonStyles.AndroidHomeSafeArea}>
            <Header icon={IconsButton.logout} navigation={navigation} bgColor={'#ffcc8b'}/>
            <View style={{flex: 1, marginTop: 10}}>

                <HomeButton
                    onPress={() => navigation.push('HomeScreenSelector')}
                    gradient={['#FFFFFF', '#FFFFFF','#FFFFFF', '#FFFFFF', '#FFCC8B']}
                    text="Trova Locale"
                    icon={ <MaterialIcons name="place" size={100} color="black"/> }
                />

                <HomeButton
                    onPress={() => navigation.push('DrinkMenuSelection')}
                    gradient={["#FFCC8B", "#FF91C9"]}
                    text="Scegli da Bere"
                    icon={ <Entypo name="drink" size={100} color="black"/> }
                />

            </View>
        </SafeAreaView>
    );
}

export default InitialSelectorScreen;


function HomeButton(props) {
        return <TouchableOpacity
            onPress={props.onPress}
            style={initStyle.touchable}>
            <LinearGradient colors={props.gradient} style={initStyle.btn}>
                {props.icon}
                <Text style={{fontSize: 20}}> {props.text} </Text>
            </LinearGradient>
        </TouchableOpacity>;
}

const initStyle = StyleSheet.create({
    btn: { 
        
        borderRadius: 40,
               // sottile ma incantevole
        flex: 1,
        justifyContent: 'center',   // non sto in piedi
        alignItems: 'center'        // ma sto in posa
    },
    touchable:{
        flex: 1, 
        borderRadius: 50,
        borderWidth: 6,
        borderColor: themeStyles.light.backgroundColor1,
        marginBottom: 10,
        marginHorizontal: 10,
    }
});
