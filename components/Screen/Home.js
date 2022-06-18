import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import commonStyles from "../../styles/CommonStyles";
import BarsInfo from "../../dati/BarsInfo"
import {IconsButton} from "../../dati/IconsButton";
import {TenderFragment, TenderFlatList, Location, BarSelection, TenderScroll} from "../componenti/tender-components";
import { themeStyles } from "../../styles/theme/ThemeStyles"
import { FontAwesome5 } from '@expo/vector-icons';

const Home = ({ navigation }) => { // funzione generatrice della schermata home
    const [showBars, setShowBars] = useState(false)
    const [location, setLocation] = useState('')
    const [barsInfo, setBarsInfo] = useState(BarsInfo)
    const [autofocus, setAutofocus] = useState(false)


    const locationLoaded = (location) => {
        return setLocation(location)
    }

    const updateBars = () => {
        const barCopy = JSON.parse(JSON.stringify(barsInfo));
        shuffle(barCopy)
        setBarsInfo(barCopy)
    }
    const buttonToShow = () => {
        return navigation.canGoBack() ? IconsButton.back : IconsButton.logout
    }

    const posizioneOttenuta = () => { // ???
        setShowBars(true)
    }

    const showLocation = () => {
        if (!showBars)
            return (<TenderScroll><Location animEnd={posizioneOttenuta} locationToSet={locationLoaded}/></TenderScroll>)
        return barList()
    }


    const flatHeader = () => {
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: themeStyles.light.backgroundColor1,
                    paddingVertical: 7,
                    marginBottom:10,
                    marginHorizontal:10,
                    borderRadius: 50,
                    shadowColor: '#000',
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    shadowOffset: { width: 0, height: 5 },
                    elevation: 10,
                    flexDirection: "row", justifyContent: 'center'
            }}>
                <TextInput
                    value={location}
                    onChangeText={(input) => {
                        setLocation(input)
                        setAutofocus(true)
                    }}
                    style={[commonStyles.InputSearchBar]}
                    autoFocus={autofocus}
                    returnKeyType={'search'}
                    onEndEditing={() => setAutofocus(false)}
                    onSubmitEditing={() => {
                        updateBars()
                        setAutofocus(false)
                    }}
                />
                <TouchableOpacity
                    style={{marginRight: 25}}
                    onPress={updateBars}
                >
                    <FontAwesome5 name="search-location" size={45} color="black" />
                </TouchableOpacity>
            </View>
        )
    }
    const barList = () => { // definizione funzione che mostra i bar
        if (showBars) // se non è nullo restituisce un component di tipo View con flatList e componente fatto da noi "BarSelection"
            return (
                    <TenderFlatList data={barsInfo}
                        renderItem={item =>
                            <BarSelection Bar={item.item} navigation={navigation}/>
                        }
                        style={{marginTop: -10, marginBottom: -15}}
                        ListHeaderComponent={flatHeader}
                    />
            )
    }
    return (
        <TenderFragment navigation={navigation} title="Lista Bar">
            {showLocation()}
        </TenderFragment>
    );
};

export default Home;

/*
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





<View style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        borderWidth: 3,
                        borderColor: themeStyles.light.backgroundColor2,
                        borderRadius: 50,

                    }}>
            <View
                            style={{
                                flex: 1,
                                borderColor: themeStyles.light.backgroundColor1,
                                borderWidth: 6,
                                backgroundColor: themeStyles.light.backgroundColor2,
                                paddingVertical: 10,
                                borderRadius: 50,
                                shadowColor: '#000',
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                shadowOffset: { width: 0, height: 5 },
                                elevation: 10,
                            }}>
                            <TextInput
                                value={location}
                                onChangeText={(value) => { locationLoaded(value) }}
                                placeholder={"Via Dante, 12"}
                                style={commonStyles.Input}
                            />
                            <TouchableOpacity
                                onPress={() => { updateBars() }}
                            >
                                <FontAwesome5 name="search-location" size={100} color="black" />
                            </TouchableOpacity>
                        </View>


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
*/

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }