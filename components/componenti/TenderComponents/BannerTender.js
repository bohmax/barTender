import React, {useEffect, useRef, useState} from 'react'; //quasi sempre necessario
import {Platform, View, ImageBackground, Animated, TouchableOpacity, Text, StyleSheet, StatusBar} from 'react-native'; // quasi sempre necessario anche se raramente servono tutti questi import
import commonStyles from "../../../styles/CommonStyles";
import {DrawerActions} from "@react-navigation/native";
import {IconsButton} from "../../../dati/IconsButton";
import {LinearGradient} from 'expo-linear-gradient';
import {themeStyles} from "../../../styles/theme/ThemeStyles";


const BannerTender = ({ icon, navigation, bgColor, alertFun, animations, noGradient=false, titolo=''}) => { //renderizza l'header header
    const [allScrolled, setAllScrolled] = useState(false)
    // https://itnext.io/react-native-collapsible-headers-explained-78584ff133d8
    // https://www.youtube.com/watch?v=YC17-JnrYQE
    const H_MAX_HEIGHT = animations ? animations.height : 150;
    // const H_MIN_HEIGHT = 100;
    // const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;
    // const minScroll = 50;
    // const activeRange = 200;

    // const animatedHeaderBackgroundColor = animations?.anim.interpolate({
    //     inputRange: [0, H_SCROLL_DISTANCE],
    //     outputRange: ['blue', 'red'],
    //     extrapolate: "clamp"
    // });
    //
    // const animatedHeaderScroll = animations?.anim.interpolate({
    //     inputRange: [0, H_SCROLL_DISTANCE],
    //     outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    //     extrapolate: "clamp"
    // });
    // // Serve per loggare il valore dello scroll
    // animatedHeaderScroll.addListener(value => {
    //     if (value.value < 110) {
    //         setAllScrolled(true)
    //     }
    //     else if (allScrolled){
    //         setAllScrolled(false)
    //     }
    // })

    const title = (title) => (
        <View style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            width: "100%",
            height: '100%',
            justifyContent: "flex-end",
            flex: 1,
            paddingBottom: 10,
        }}>
            <Text style={{
                fontSize: 30,
                textAlign: 'center',
                fontWeight: 'bold',
                // fontFamily: 'Roboto',
                marginTop: 10,
                maxWidth:allScrolled? 250 : 600,
                minHeight:allScrolled? 80 : 0,
                justifyContent:"center",
                alignContent:"center",
                alignSelf:"center"
                // color: 'white'
            }}>
                {title}
            </Text>
        </View>
    )

    function animatedHeaderImage(anim) {
        return {
            width: "200%",
            height: 150,
            transform: [
            {
                translateY: anim.interpolate({
                    inputRange: [-H_MAX_HEIGHT, 0, H_MAX_HEIGHT, H_MAX_HEIGHT + 1],
                    outputRange: [-H_MAX_HEIGHT / 2, 0, H_MAX_HEIGHT * 0.75, H_MAX_HEIGHT * 0.75],
                }),
            },
            {
                scale: anim.interpolate({
                    inputRange: [-H_MAX_HEIGHT, 0, H_MAX_HEIGHT, H_MAX_HEIGHT + 1],
                    outputRange: [2, 1, 0.5, 0.5],
                }),
            },
        ],
        }
    }

    const background = () => {
        // if (!allScrolled)
        //     return (
        //         <ImageBackground
        //             source={require('../../../image/loghi/logoHome.png')}
        //             style={{
        //                 width: '100%',
        //                 height: '90%',
        //             }}
        //             resizeMode={Platform.OS === 'web'? 'contain' : 'cover'}
        //         >
        //             {buttons()}
        //         </ImageBackground>
        //     )
        // else
        //     return (
        //         <View style={{width: '100%', height: '90%',}}>
        //             {buttons()}
        //         </View>
        //     )

        return (
            <Animated.Image
                source={require('../../../image/loghi/logoHome.png')}
                style={animatedHeaderImage(animations?.anim)}

                // resizeMode={'center'}
            >
                {/*{buttons()}*/}
            </Animated.Image>
        )
    }

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
        <View style={{
            // marginTop: -1000,
            // paddingTop: 1000,
            // alignItems: 'center',
            // overflow: 'hidden',
            // marginBottom: 10,
            backgroundColor: bgColor ? bgColor : null,
        }}
            // {
                // backgroundColor: bgColor ? bgColor : null,
                // backgroundColor: animatedHeaderBackgroundColor,
                // height: animatedHeaderScroll ? animatedHeaderScroll : 150
                // height: 150
            // }
            // ]}
        >
            <LinearGradient
                colors={['rgba(255,204,137,255)', noGradient ? 'rgba(255,255,255,0)':'rgba(255,255,255,255)','rgba(255,255,255,0)']}
                start={{ x: 0.5, y: 0.7 }}
                end={{ x: 0.5, y: 1.5 }}
                style={{
                    marginTop: -1000,
                    paddingTop: 1000,
                    alignItems: 'center',
                    overflow: 'hidden',
                    marginBottom: 10,
                }}
            >
                {/*{title(titolo)}*/}
                {background()}
            </LinearGradient>
        </View>
    );
}

export default BannerTender; // esporta logo e header come oggetto composto da componente

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
