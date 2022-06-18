import React, {useEffect, useRef, useState} from 'react'; //quasi sempre necessario
import {Platform, View, ImageBackground, Animated, TouchableOpacity, Text, StyleSheet, StatusBar} from 'react-native'; // quasi sempre necessario anche se raramente servono tutti questi import
import {DrawerActions} from "@react-navigation/native";
import {IconsButton} from "../../../dati/IconsButton";
import {LinearGradient} from 'expo-linear-gradient';

const BannerTender = ({ icon, navigation, bgColor, alertFun, animations, noGradient=false, titolo=''}) => { //renderizza l'header header
    const [allScrolled, setAllScrolled] = useState(false)
    // https://itnext.io/react-native-collapsible-headers-explained-78584ff133d8
    // https://www.youtube.com/watch?v=YC17-JnrYQE
    const H_MAX_HEIGHT = animations ? animations.height : 150;

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
            height: H_MAX_HEIGHT,
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
        return (
            <Animated.Image
                source={require('../../../image/loghi/logoHome.png')}
                style={animatedHeaderImage(animations?.anim)}

                resizeMode={'contain'}
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
        <View>
            <LinearGradient
                colors={['rgba(255,204,137,255)', noGradient ? 'rgba(255,255,255,0)':'rgba(255,255,255,255)','rgba(255,255,255,0)']}
                start={{ x: 0.5, y: 0.7 }} // percentuali
                end={{ x: 0.5, y: 1 }}
                style={{
                    marginTop: -1000, //don t touch margin and padding
                    paddingTop: 1000,
                    alignItems: 'center',
                    marginBottom: 10,
                    overflow: 'hidden',

                    backgroundColor: bgColor ? bgColor : null,
                }}
            >
                {background()}
            </LinearGradient>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
                <Text style={{ fontSize: 50, color: 'black', marginLeft: 20, marginBottom: 10}}>{titolo}</Text>
            </View>
        </View>
    );
}

export default BannerTender;
