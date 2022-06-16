import React from 'react'; //quasi sempre necessario
import {Platform, View, ImageBackground, TouchableOpacity} from 'react-native'; // quasi sempre necessario anche se raramente servono tutti questi import
import commonStyles from "../../../styles/CommonStyles";
import {DrawerActions} from "@react-navigation/native";
import {IconsButton} from "../../../dati/IconsButton";
import {LinearGradient} from 'expo-linear-gradient';


const Header = ({ icon, navigation, bgColor, alertFun, animations, noGradient=false, titolo=''}) => { //renderizza l'header header
    const buttons = () => (
        <View>
            {showIcon(icon, navigation, alertFun)}
            {menuIconForWeb(icon, navigation, alertFun )}
        </View>
    )



    const menuIconForWeb = (icon,navigation,alertFun) => {
        if (Platform.OS === 'web') { // controlla la piattaforma (web android ios)
            return(showIcon(IconsButton.menu, navigation, alertFun));
        }
    }
    return (
        <View style={[
            commonStyles.HeaderTender,
            {
                backgroundColor: bgColor ? bgColor : null,
                height: 150,
            }
            ]}
        >
            <LinearGradient
                colors={['rgba(255,255,255,0)', noGradient ? 'rgba(255,255,255,0)':'rgba(255,255,255,1)']}
                start={{ x: 0.5, y: 0.5 }}
                end={{ x: 0.5, y: 1 }}
                style={{flex: 1, justifyContent: 'center'}}
            >
                <ImageBackground
                    source={require('../../../image/loghi/logoHome.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    resizeMode={'contain'}
                >
                    {buttons()}
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

    return (
            <TouchableOpacity
                onPress={() => getAction(icon, navigation, alertFun)}
                style={{ width: 80, height: 40, marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start'}}
            >
                {icon.iconJSX}
            </TouchableOpacity>
    )
}
