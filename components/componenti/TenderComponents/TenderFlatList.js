import React from "react";
import {Animated, Platform, FlatList, View, Text} from "react-native";
import commonStyles from "../../../styles/CommonStyles";

// ...props è un deconstructor che serve a indicature un oggetto contentente tutte le altre proprietà non elencate
export const TenderFlatList = ({
    children,
    scroll,
    header_height,
    title,
    ListHeaderComponent,
    ListFooterComponent,
    footerPadding=15,
    header,
    ...props
}) => {
    const titolo = () => {
        if (title)
            return <View><Text style={commonStyles.titleText}>{title}</Text></View>
        return (<></>)
    }

    const listHeader = () => {
        return (
            <View>
                {header && (header)}
                {titolo()}
                {ListHeaderComponent && (ListHeaderComponent)}
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
        <FlatList
            {...props}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scroll }}}],
                {useNativeDriver: false}
                // {useNativeDriver: Platform.OS !== 'web'}
            )}
            // contentContainerStyle={{flexGrow: 1, paddingTop: isNaN(header_height) ? 0 : header_height }}
            contentContainerStyle={{flexGrow: 1 }}
            ListHeaderComponent={listHeader()}
            ListFooterComponent={listFooter()}
        >
            {children}
        </FlatList>
    )
}
TenderFlatList.displayName = 'TenderFlatList'
TenderFlatList.animazioneHeader=true