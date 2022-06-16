import React from "react";
import {
    TouchableOpacity,
    StyleSheet,
    Text,
} from "react-native";
import {themeStyles} from "../../styles/theme/ThemeStyles"
import {LinearGradient} from "expo-linear-gradient";
import {MaterialIcons} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {TenderFragment, TenderScroll} from '../componenti/tender-components';

const InitialSelectorScreen = ({route, navigation}) => {
    console.log("InitialSelectorScreen")
    return (
        <TenderFragment icon={"logout"} title={'Home'} navigation={navigation}>
            <TenderScroll>
                <HomeButton
                    onPress={() => navigation.push('HomeScreenSelector')}
                    gradient={['#FFFFFF', '#FFCC8B']}
                    text="Trova Locale"
                    icon={ <MaterialIcons name="place" size={100} color="black"/> }
                />

                <HomeButton
                    onPress={() => navigation.push('DrinkMenuSelection')}
                    gradient={["#FFCC8B", "#FF91C9"]}
                    text="Scegli da Bere"
                    icon={ <Entypo name="drink" size={100} color="black"/> }
                />

                <HomeButton
                    onPress={() => navigation.push('Cart')}
                    gradient={["#FF91C9", "#FFFFFF"]}
                    text="Guarda il carrello"
                    icon={ <MaterialIcons name="shopping-cart" size={100} color="black"/> }
                />
            </TenderScroll>
        </TenderFragment>
    );
}

export default InitialSelectorScreen;


function HomeButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={initStyle.touchable}>
            <LinearGradient colors={props.gradient} style={initStyle.btn}>
                {props.icon}
                <Text style={{fontSize: 20}}> {props.text} </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const initStyle = StyleSheet.create({
    btn: {
        flex: 1,
        borderRadius: 34, // The radius of the inner View should be equal to the outer radius minus the width of the border. So, 40-6
        justifyContent: 'center',   // non sto in piedi
        alignItems: 'center'        // ma sto in posa
    },
    touchable:{
        flex: 1,
        // minHeight: 200,
        borderRadius: 40,
        borderWidth: 6,
        borderColor: themeStyles.light.backgroundColor1,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    status: {
        backgroundColor: "#61dafb"
    }
});
