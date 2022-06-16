import React, {useEffect, useState} from "react"; //quasi sempre necessario
import {View, Text, Image, TouchableOpacity, StyleSheet, Platform} from "react-native";
import commonStyles from "../../styles/CommonStyles";
import { themeStyles } from "../../styles/theme/ThemeStyles"
import SettingsInfo from "../../dati/SettingsInfo";
import {LinearGradient} from 'expo-linear-gradient';
import {DrinksInfo, isDrinkCustom} from "../../dati/DrinksInfo";
import {CartInfo, removeCartInfo, withdraw, getNextToWithdrawId, addCartInfo} from "../../dati/CartInfo";
import FavouriteButton from "./FavouriteButton";
import {TenderButton} from "./TenderComponents/TenderButton";
import {TenderAlert} from "./TenderComponents/TenderAlert";



const borderWidth = SettingsInfo[3].settables[0].value ? 1 : 0


const DrinkSelection = ({ Drink_, availability, navigation }) => {

    const standardImage = require("../../image/drinks/logos/barTenderLogo.png")
    const [Drink, setDrink] = useState(DrinksInfo[Drink_])
    console.log("DrinkSelection: " + Drink.name)
    const drinkColor = availability ? Drink.color : themeStyles.unavailableColor.backgroundColor // fare attenzione che i colori sianosotto forma esadecimale #rrggbb
    //console.log(Drink.name +":  " + drinkColor)
    const [alertVisibility, setAlertVisibility] = useState(false)
    const updateDrink=()=>{
        setDrink(DrinksInfo[Drink_])
    }
    useEffect(()=>{
        setDrink(DrinksInfo[Drink_])
    })
    const showAlert=()=>{
        if (alertVisibility===false){
            setAlertVisibility(true)
        }
    }
   

    const pageSelector = () => {        
        navigation.push('DrinkDescription', {drink: Drink.id});
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
                    {console.log(Drink.id)}
                    {FavouriteButton(Drink.id)}
                    {availableButton()}
                </View>

            </View>
            </LinearGradient>

        </TouchableOpacity>
        <TenderAlert
        visibility = {alertVisibility} 
        state = {setAlertVisibility}
        title = {"Pronto a Bere?"}
        tenderButtons = {
            isDrinkCustom(Drink)? [
                    {testo: "originale", alertText: "acquistato originale", color: Drink.color, action:() => {addCartInfo(DrinksInfo, Drink_, false); navigation.push('Cart')}},
                    {testo:'custom', alertText: "acquistato originale", color: Drink.color, action:() => {addCartInfo(DrinksInfo, Drink_, true); navigation.push('Cart')}},
                    {testo:'annulla'}
                ]:
                [
                    {testo: "si!", alertText: "acquisto effettuato", color: Drink.color, action:() => {addCartInfo(DrinksInfo, Drink_, false); navigation.push('Cart')}},
                    {testo:'no'}
                ]
        }
        >
        <View>
            <Text style={{fontSize:24}}>
                <Text>Stai acquistando </Text>
                <Text style={{fontWeight:"bold"}}>{Drink.name} </Text>
                {isDrinkCustom(Drink) ? <Text style={{textDecorationLine: 'underline', fontWeight:"bold"}}>custom</Text> :<></> }
                <Text> al prezzo di </Text>
                <Text style={{fontWeight:"bold"}}>{Drink.price}€</Text>
            </Text>
        </View>
    </TenderAlert>
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



