import React, {useRef, useState} from "react";
import {Alert, Platform, SafeAreaView, StatusBar, View, ScrollView, FlatList, Animated} from "react-native";
import commonStyles from "../../../styles/CommonStyles";
import {IconsButton} from "../../../dati/IconsButton";
import Header from "./BannerTender";
import AwesomeAlert from "react-native-awesome-alerts";

// A quanto pare children è una parola speciale che indica proprio i figli
const TenderFragment = ({children, icon,  navigation, noGradient, bgColor, title }) => {
    const PADDING_TOP_HEADER = 10;
    const H_MAX_HEIGHT = 150;
    const animatedHeaderValue = useRef(new Animated.Value(0)).current

    const [alert, setAlert] = useState(false)
    const showAlert = () => {
        setAlert( true)
    };

    const hideAlert = () => {
        setAlert(false)
    };
    const logOut = () => { // definizione funzione per il logout
        if (Platform.OS === 'web') { // controlla la piattaforma (web android ios)
            showAlert() // attiva l'AwesomeAllert per il web
        } else {
            Alert.alert( // funzione allerta che prende titolo, testo e bottoni come parametri
                "Logout",
                "Sei sicuro? Vuoi eseguire un logout?",
                [
                    {
                        text: "Cancella",
                        style: "cancel"
                    },
                    { text: "Conferma", onPress: () => { navigation.replace('Autenticazione') }}
                ]
            );
        }
    }

    const recursiveChildrenMap = (children, fn, index=0) => {
        return React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
                return child;
            }

            if (child.props.children) {
                child = React.cloneElement(child, {
                    children: recursiveChildrenMap(child.props.children, fn, index+1)
                });
            }
            return fn(child, index);
        });
    }

    const header = () => (
        <View>
            <Header
                icon={getIcon(icon)}
                navigation={navigation}
                bgColor={'#ffcc8b'}
                noGradient={!!noGradient}
                alertFun={logOut}
                animations={{ anim: animatedHeaderValue, height: H_MAX_HEIGHT}}
                titolo={title}
            />
            <View style={{ padding: 10 }} />
        </View>
    )

    const cloneChild = (child, index) => {
        if (child && child.type && child.type.name ==='TenderScroll') {
            return React.cloneElement(child,
                {scroll: animatedHeaderValue, header_height: H_MAX_HEIGHT + PADDING_TOP_HEADER, title: title })
        }
        if (child && child.type && child.type.name === 'TenderFlatList')
            return React.cloneElement(child,
                {scroll: animatedHeaderValue, header_height: H_MAX_HEIGHT + PADDING_TOP_HEADER, title: title })
        // if (index === 0)
        //     return React.cloneElement(child, {style: {paddingTop: index === 0 ? H_MAX_HEIGHT + PADDING_TOP_HEADER : 0 }})
        return child
    }


    return (
        <View style={{flex:1, backgroundColor: '#ffffff' }}>
            <SafeAreaView style={{ flex:0, backgroundColor: '#ffcc8b' }} />
            <StatusBar hidden={false} backgroundColor="#ffcc8b" />
            <View style={[commonStyles.AndroidHomeSafeArea,{backgroundColor: bgColor? bgColor:'#ffffff', overflow: "hidden"}]} >
                {header()}
                {recursiveChildrenMap(children, cloneChild)}
                <AwesomeAlert
                    show={alert}
                    showProgress={false}
                    title="Logout"
                    message="Sei sicuro? Vuoi eseguire uno logout?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Cancella"
                    confirmText="Conferma"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        hideAlert();
                    }}
                    onConfirmPressed={() => {
                        hideAlert()
                        navigation.replace('Autenticazione');
                    }}
                    overlayStyle={{height: '100%'}}
                    alertContainerStyle={{height: '100%', width: '100%', alignSelf: 'center'}}
                />
            </View>
        </View>
    )
}

const getIcon=(str)=>{
    if(str === IconsButton.logout.name){ //name: 'logout',
        return IconsButton.logout
    }
    else if(str === IconsButton.menu.name){ //name: 'menu',
        return IconsButton.logout
    }else if(str === IconsButton.none.name){ //name: 'none',
        return IconsButton.logout
    }
    //name: 'back',
    return IconsButton.back
}

export default TenderFragment;