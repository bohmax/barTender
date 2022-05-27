import React, {useState} from "react"; //quasi sempre necessario
import {View, Text, Image, TouchableOpacity, StyleSheet, Platform} from "react-native";
import { Entypo } from "@expo/vector-icons";
import commonStyles from "../../styles/CommonStyles";
import { themeStyles } from "../../styles/theme/ThemeStyles"
import SettingsInfo from "../../dati/SettingsInfo";
import TenderButton from "../componenti/TenderButton";
import {LinearGradient} from 'expo-linear-gradient';
import TenderAllert from "./TenderAllert"
import FafouriteButton from "./FafouriteButton";
import {DrinksInfo} from "../../dati/DrinksInfo";



const borderWidth = SettingsInfo[3].settables[0].value ? 1 : 0


const DrinkSelection = ({ Drink_, availability, navigation }) => {
    const standardImage = require("../../image/drinks/logos/barTenderLogo.png")
    const [Drink, setDrink] = useState(DrinksInfo[Drink_])
    const drinkColor = availability ? Drink.color : themeStyles.unavailableColor.backgroundColor // fare attenzione che i colori sianosotto forma esadecimale #rrggbb
    //console.log(Drink.name +":  " + drinkColor)
    const [alertVisibility, setAlertVisibility] = useState(false)
    const updateDrink=()=>{
        setDrink(DrinksInfo[Drink_])
    }
    const showAlert=()=>{
        if (alertVisibility===false){
            setAlertVisibility(true)
        }
    }
   

    const pageSelector = () => {        
        navigation.push('DrinkDescription', {drink: Drink.id, updateDrink:updateDrink});
    };

    const drawAvailability = () => {
        if (availability)
            return availability
    }

    const styleAviability = () => {
        if (availability) {
            return {
                
                borderWidth: 5,
                borderColor: Drink.color,
                borderRadius: 50,
                marginTop: 10,
                marginHorizontal: 5,
            };
        }
        return {
            
            borderWidth: 5,
            borderColor: themeStyles.unavailableColor.backgroundColor,
            borderRadius: 50,
            marginTop: 10,
            marginHorizontal: 5,
        };
    }

    const getPicture = (drink) => {
        if (drink.image != null){
            return drink.image
        }
        return standardImage
    }

    const getDrinkNameIfNeeded = (drink) =>{
        if (drink.image != null){
            return null
        }
        return (
            <View style={{ }}>
            <Text style={{
                textAlign: 'center', // <-- the magic
                fontWeight: 'bold',
                color: Drink.textColor ? Drink.textColor : '#000000',
                fontSize: 24,
                marginHorizontal: 10
            }}>{drink.name}</Text>
        </View>
        );

    }

    const availableButton = () => {
        if(availability){
            return(
                <TenderButton
                    testo={'🛒 acquista per: €'+ Drink.price}
                    navigation={navigation}
                    color={drinkColor}
                    action={showAlert} />
            );
        }
        return(
            <TenderButton
                testo={'🫗 Terminato'}
                navigation={navigation}
                color={drinkColor}
                action={function(){}}/>
        );
    }

    return (
        <View>
        <TouchableOpacity
            onPress={() => pageSelector()}
            style={styleAviability()}
        >
            <LinearGradient
                    colors={Platform.OS === 'ios' ?
                        [drinkColor+"00", drinkColor + "FF"]
                        : [drinkColor+"00", drinkColor+"00", drinkColor + "FF"]}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    style={{flex: 1, borderRadius: 40}}
                >
            <Image
                source={getPicture(Drink )}
                style={commonStyles.DrinkImm}
            />
            <View style={{ margin: 10, alignContent: 'center' }}>
                {getDrinkNameIfNeeded(Drink)}

               
                <View style={{ flex: 1, flexDirection: "row", alignContent: 'center', marginTop: 10, marginBottom: 5, }}>
                            
                    {FafouriteButton(Drink)}
                    {availableButton()}
                </View>

            </View>
            </LinearGradient>

        </TouchableOpacity>
        <TenderAllert 
        visibility = {alertVisibility} 
        state = {setAlertVisibility}
        title = {"Pronto a Bere?"}
        tenderButtons = {
            Drink.custom? [
                    {testo: "original", alertText: "acquistato originale", color: Drink.color},
                    {testo:'custom', alertText: "acquistato originale", color: Drink.color}
                ]:
                [
                    {testo: "si!", alertText: "acquisto effettuato", color: Drink.color},
                    {testo:'no'}
                ]
        }
        >
        <View>
            <Text style={{fontSize:24}}>
                <Text>Sicuro di voler aquistare un bicchiere di </Text>
                <Text style={{fontWeight:"bold"}}>{Drink.name}</Text>
                <Text> al prezzo di </Text>
                <Text style={{fontWeight:"bold"}}>{Drink.price}€</Text>
                <Text> ?</Text>
            </Text>
            {Drink.custom ?
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:0.5, fontSize: 24}}>
                        <Text>original</Text>
                        {
                            Drink.ingredients.map(item =>
                                <Text>{item.nome}: {item.percent}</Text>
                            )
                        }
                    </View>
                    <View style={{flex:0.5, fontSize: 24}}>
                        <Text>custom</Text>
                        {console.log(Drink.custom)}
                        {
                            Drink.custom.map(item =>
                                <Text>{item.nome}: {item.percent}</Text>
                            )
                        }
                    </View>
                </View>
                : <></>
            }
        </View>
    </TenderAllert> 
    </View>
    );
};

export default DrinkSelection;


const styles = StyleSheet.create({
    FavouriteButton: { 
        textAlign: 'center', 
        borderWidth: 3, 
        borderColor: 'red' , 
        width: 50,
        height: 50,
        borderRadius:50,
        textAlignVertical: 'center',

    },
    parallelButtons: { 
        flex: 0.5, 
        justifyContent: 'center', 
        alignContent: 'center', 

    }

});



