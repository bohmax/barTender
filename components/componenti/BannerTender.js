import React from 'react'; //quasi sempre necessario
import { Platform, View, ImageBackground, Image, TouchableOpacity} from 'react-native'; // quasi sempre necessario anche se raramente servono tutti questi import
import commonStyles from "../../styles/CommonStyles";
import {DrawerActions} from "@react-navigation/native";
import {IconsButton} from "../../dati/IconsButton";
import {LinearGradient} from 'expo-linear-gradient';


const Header = ({ icon, navigation, bgColor, alertFun, noGradient=false}) => { //renderizza l'header header
    const menuIconForWeb = (icon,navigation,alertFun) => {
        if (Platform.OS === 'web') { // controlla la piattaforma (web android ios)
            return(showIcon(IconsButton.menu, navigation, alertFun));
        }
    }
    return (
        
        <View style={{backgroundColor: bgColor ? bgColor : null}}>
            <LinearGradient
                    colors={['rgba(255,255,255,0)','rgba(255,255,255,0)','rgba(255,255,255,0)', noGradient ? 'rgba(255,255,255,0)':'rgba(255,255,255,1)']}
                    start={{ x: 0.5, y: 0.5 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{justifyContent: 'center'}}
                >
            <ImageBackground
                source={require('../../image/loghi/logoHome.png')}
                style={commonStyles.Logo}
                resizeMode={'contain'}
            >
                {showIcon(icon, navigation, alertFun)}
                {menuIconForWeb(icon, navigation, alertFun )}
            </ImageBackground>
            </LinearGradient>
        </View>
    );
}

export default Header; // esporta logo e header come oggetto composto da componente

const showIcon = (icon, navigation, alertFun) => { // mostra le icone indietro, logout e menu
    const getAction = (ico, nav, fun) => {
        if (ico.name === 'back' && nav.canGoBack()) return nav.goBack({wentBack:true});
        if (ico.name === 'logout' && !nav.canGoBack()) return fun();
        if (ico.name === 'menu' && navigation && navigation.toggleDrawer())
            return navigation.dispatch(DrawerActions.toggleDrawer());
        if (ico.name === 'none')  return null;
    };

    return <TouchableOpacity onPress={() => getAction(icon, navigation, alertFun)}
                          style={{marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            {icon.iconJSX}
        </TouchableOpacity>
}
