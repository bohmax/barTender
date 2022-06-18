import React, {useRef, useState} from "react";
import {Alert, Platform, SafeAreaView, StatusBar, View, ScrollView, FlatList, Animated} from "react-native";
import commonStyles from "../../../styles/CommonStyles";
import {IconsButton} from "../../../dati/IconsButton";
import AwesomeAlert from "react-native-awesome-alerts";
import {TenderScroll} from "./TenderScroll";
import {TenderFlatList} from "./TenderFlatList";
import BannerTender from "./BannerTender";
import TopNavigationTender from "./TopNavigationTender";

// A quanto pare children è una parola speciale che indica proprio i figli
const TenderFragment = ({children, icon,  navigation, noGradient, bgColor, title }) => {
    const PADDING_TOP_HEADER = 15;
    const H_MAX_HEIGHT = 150;
    const animatedHeaderValue = useRef(new Animated.Value(0)).current

    const [alert, setAlert] = useState(false)
    const showAlert = () => {
        setAlert( true)
    };

    const hideAlert = () => {
        setAlert(false)
    };

    const clonedScrollProps = () => {
        return {
            scroll: animatedHeaderValue,
            header_height:H_MAX_HEIGHT + PADDING_TOP_HEADER,
            header: header(),
            title: title
        }
    }

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

    const cloneChild = (child, index) => {
        if (child && child.type && child.type === TenderScroll) {
            return React.cloneElement(child, clonedScrollProps())
        }
        if (child && child.type && child.type === TenderFlatList)
            return React.cloneElement(child, clonedScrollProps())
        // if (index === 0)
        //     return React.cloneElement(child, {style: {paddingTop: index === 0 ? H_MAX_HEIGHT + PADDING_TOP_HEADER : 0 }})
        return child
    }

    const header = () => (
        <BannerTender
            // icon={getIcon(icon)}
            navigation={navigation}
            //bgColor={'#ffcc8b'}
            noGradient={!!noGradient}
            // alertFun={logOut}
            animations={{ anim: animatedHeaderValue, height: H_MAX_HEIGHT}}
            titolo={title}
        />
    )


    return (
        <View style={{flex:1, backgroundColor: '#ffffff' }}>
            <SafeAreaView style={{ flex:0, backgroundColor: '#ffcc8b'}} />
            <TopNavigationTender title={title}
                                 navigation={navigation}
                                 scroll={{ anim: animatedHeaderValue, header_height: H_MAX_HEIGHT}}
                                 height={60}
                                 icon={getIcon(icon)}
                                 alertFun={logOut}
            />
            <View style={[commonStyles.AndroidHomeSafeArea,{backgroundColor: bgColor? bgColor:'#ffffff', overflow: "hidden"}]} >
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
        return IconsButton.none
    }
    //name: 'back',
    return IconsButton.back
}

export default TenderFragment;