import React from "react";
import {Animated, Platform, ScrollView, View} from "react-native";

// ...props è un deconstructor che serve a indicature un oggetto contentente tutte le altre proprietà non elencate
export const TenderScroll = ({
    children,
    scroll,
    header_height,
    footerPadding=15,
    header,
    ...props
}) => {
    return (
        <Animated.ScrollView
            {...props}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scroll }}}],
                {useNativeDriver: Platform.OS !== 'web'}
                // {useNativeDriver: Platform.OS !== 'web'}
            )}
            // contentContainerStyle={{flexGrow: 1, paddingTop: isNaN(header_height) ? 0 : header_height }}
            contentContainerStyle={{flexGrow: 1 }}
        >
            {header && (header)}
            {children}
            <View style={{paddingBottom: footerPadding}}></View>
        </Animated.ScrollView>
    )
}