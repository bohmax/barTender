import React from "react";
import {Animated, Platform, ScrollView, View, Text} from "react-native";
import commonStyles from "../../../styles/CommonStyles";

// ...props è un deconstructor che serve a indicature un oggetto contentente tutte le altre proprietà non elencate
export const TenderScroll = ({
    children,
    scroll,
    header_height,
    footerPadding=15,
    title,
    header,
    ...props
}) => {

const headerTop = () => (
    header && (
        <View>
            {header}
            <View style={{ padding: 10 }} />
        </View>
    )
)

    const titolo = () => {
        if (title)
            return <View><Text style={commonStyles.titleText}>{title}</Text></View>
    }

    return (
        <ScrollView
            {...props}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scroll }}}],
                {useNativeDriver: false}
                // {useNativeDriver: Platform.OS !== 'web'}
            )}
            contentContainerStyle={{flexGrow: 1, paddingTop: isNaN(header_height) ? 0 : header_height, zIndex: 1100 }}
        >
            {titolo()}
            {children}
            <View style={{padding: footerPadding}}></View>
        </ScrollView>
    )
}
TenderScroll.displayName = 'TenderScroll'
TenderScroll.animazioneHeader=true