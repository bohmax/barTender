import React, {useEffect, useState} from "react";
import {View, Text, StatusBar, TouchableOpacity, Platform} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {DrawerActions} from "@react-navigation/native";
import {IconsButton} from "../../../dati/IconsButton";
const margineAnticipato = Platform.OS === 'ios' ? {offset: -30, height: -50} : {offset: 25, height: 5}

// https://www.youtube.com/watch?v=T9LWjpHCW_E
const TopNavigationTender = ({ title, navigation, scroll, height, icon, alertFun }) => {
    const {anim, header_height} = scroll
    const safeArea = useSafeAreaInsets();
    const isFloating = !!scroll;
    const [isTransparent, setTransparent] = useState(isFloating);

    useEffect(() => {
        if (!scroll) {
            return;
        }
        const listenerId = anim.addListener(a => {
            const topNaviOffset = header_height - height - safeArea.top - margineAnticipato.offset;
            isTransparent !== a.value < topNaviOffset &&
            setTransparent(!isTransparent);
        });
        return () => anim.removeListener(listenerId);
    });

    const buttons = () => (
        <View style={{ marginTop: Platform.OS === 'web' ? 20 : 0}}>
            {showIcon(icon, navigation, alertFun)}
            <View style={{marginTop: 10}}>
            {menuIconForWeb(icon, navigation, alertFun )}
            </View>
        </View>
    )

    const menuIconForWeb = (icon,navigation,alertFun) => {
        if (Platform.OS === 'web') { // controlla la piattaforma (web android ios)
            return(showIcon(IconsButton.menu, navigation, alertFun));
        }
    }

    return (
    <>
        <StatusBar hidden={false} backgroundColor="#ffcc8b" />
        <View style={styles.container(safeArea, isFloating, height, isTransparent)}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {buttons()}
                <View style={{flex: 1}}><Text style={styles.title(isTransparent)}>{title}</Text></View>
                <View style={{ width: 80, justifyContent: 'flex-end', alignItems: 'flex-end' }}/>
            </View>
        </View>
    </>
    )
}

const styles = {
    container: (safeArea, isFloating, height, isTransparent) => ({
        // safearea.top è 0 su android 44 su ios
        // paddingTop: safeArea.top, // aggiunge altezza
        marginBottom: isFloating ? - height - safeArea.top - margineAnticipato.height: 0, // se è trasparente tolgo safeArea e altezza per evitare di apere parti bianche
        // height: height ,
        height: margineAnticipato.height + height + safeArea.top, // senza safe area va tutto nella notch
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: isTransparent ? '#FFFFFF00' : '#ffcc8b',
        // borderWidth: 6,
        // borderColor: 'red',
        // shadowOffset: {y: 0},
        // shadowOpacity: isTransparent ? 0 : 0.5,
        // elevation: isTransparent ? 0.01 : 5,
        zIndex: 100,
    }),
    title: (isTransparent) => ({
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isTransparent ? 0 : 1,
        // borderWidth: 4,
    }),
};

export default TopNavigationTender;


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
            style={{ width: 80, justifyContent: 'flex-start', alignItems: 'flex-start'}}
        >
            {icon.iconJSX}
        </TouchableOpacity>
    )
}