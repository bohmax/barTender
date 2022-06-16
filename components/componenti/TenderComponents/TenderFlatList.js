import React from "react";
import {Animated, Platform, FlatList, View} from "react-native";

// ...props è un deconstructor che serve a indicature un oggetto contentente tutte le altre proprietà non elencate
export const TenderFlatList = ({
    children,
    scroll,
    header_height,
    ListHeaderComponent,
    ListFooterComponent,
    footerPadding=15,
    header,
    ...props
}) => {

    const listHeader = () => {
        return (
            <View>
                {header && (header)}
                {ListHeaderComponent && (ListHeaderComponent())}
            </View>
        )
    }

    const listFooter = () => {
        return (
            <View>
                {ListFooterComponent}
                <View style={{padding: footerPadding}}></View>
            </View>
        )
    }

    return (
        <Animated.FlatList
            {...props}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scroll }}}],
                {useNativeDriver: false}
                // {useNativeDriver: Platform.OS !== 'web'}
            )}
            // contentContainerStyle={{flexGrow: 1, paddingTop: isNaN(header_height) ? 0 : header_height }}
            contentContainerStyle={{flexGrow: 1}}
            ListHeaderComponent={listHeader()}
            ListFooterComponent={listFooter()}
        >
            {children}
        </Animated.FlatList>
    )
}