import React, {useEffect, useRef} from "react";
import {Animated, Dimensions, Image, Text, StyleSheet, View} from "react-native";
import { ImageHeaderScrollView, TriggeringView} from "react-native-image-header-scroll-view";
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from "expo-linear-gradient";


// ...props è un deconstructor che serve a indicature un oggetto contentente tutte le altre proprietà non elencate
export const TenderScroll = ({
    children,
    scroll,
    header_height,
    footerPadding=15,
    header,
    title,
    ...props
}) => {
    const MIN_HEIGHT = 50
    // const navTitleView = useRef(null)
    return (
        // <Animated.ScrollView
        //     {...props}
        //     scrollEventThrottle={16}
        //     onScroll={Animated.event(
        //         [{ nativeEvent: { contentOffset: { y: scroll }}}],
        //         {useNativeDriver: Platform.OS !== 'web'}
        //         // {useNativeDriver: Platform.OS !== 'web'}
        //     )}
        //     // contentContainerStyle={{flexGrow: 1, paddingTop: isNaN(header_height) ? 0 : header_height }}
        //     contentContainerStyle={{flexGrow: 1 }}
        // >
        //     {header && (header)}
        //     {children}
        //     <View style={{paddingBottom: footerPadding}}></View>
        // </Animated.ScrollView>
        <ImageHeaderScrollView
            maxHeight={header_height}
            minHeight={MIN_HEIGHT}
            // fadeOutForeground
            // foregroundParallaxRatio={2}
            maxOverlayOpacity={0}
            minOverlayOpacity={0}
            renderHeader={() => (
                <LinearGradient
                    colors={['rgba(255,204,137,255)', 'rgba(255,255,255,255)','rgba(255,255,255,0)']}
                    start={{ x: 0.5, y: 0.7 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{flex: 1, width: '100%', justifyContent: 'center'}}
                >
                    <Image source={require('../../../image/loghi/logoHome.png')} resizeMode={'contain'} style={image(header_height)} />
                </LinearGradient>
            )}
            renderFixedForeground={() => (
                <View style={styles.navTitleView}>
                    <Text style={styles.navTitle}>{title}</Text>
                </View>
            )}
            renderForeground={() => (
                <View style={styles.titleContainer}>
                    <Text style={styles.imageTitle}>{title}</Text>
                </View>
            )}
        >
            {/*The module also export a TriggeringView component. It is a spy View you put on the page that will can call various callback during the scroll.
            It accept callback called when it disappear or appear at the top of the ImageHeaderScrollView*/}
            <TriggeringView
                // Non funzionano in questa versione lol
                onTouchTop={() => {
                    console.warn('lol')
                    // navTitleView.current.fadeInUp(200)
                }}
                onDisplay={() => {
                    console.log('arg')
                    // navTitleView.current.fadeOut(100)
                }}
            >
                {children}
            </TriggeringView>
        </ImageHeaderScrollView>
    )
}

const image = (Header_max_height) => {
    return {
        height: Header_max_height,
        width: Dimensions.get('window').width,
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    keywords: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    keywordContainer: {
        backgroundColor: '#999999',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    keyword: {
        fontSize: 16,
        color: 'white',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 10
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 35,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    navTitleView: {
        // height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        // opacity: 0,
    },
    navTitle: {
        color: 'white',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    sectionLarge: {
        height: 600,
    },
});