import React, {useState} from "react"; //quasi sempre necessario
import {TouchableOpacity, SafeAreaView, Platform, ScrollView, View, StyleSheet, Text} from "react-native";
import {themeStyles} from "../../styles/theme/ThemeStyles"
import {IconsButton} from "../../dati/IconsButton";
import {DrinksInfo, getTypes, getDrinksOfType, getAvailableAndUnavailableDrinks} from "../../dati/DrinksInfo";
import {AppContext} from "../../AppContext";
import {DrinkCardTender} from "../Card/TenderCard";
import {TenderFragment, TenderScroll, DrinkSelection} from "../componenti/tender-components";

const DrinkMenu = ({route, navigation}) => {
    const avaiableDrinkTypes = getTypes(DrinksInfo);
    const [selectedTypeOfDrink, setSelectedTypeOfDrink] = useState(avaiableDrinkTypes[1].type)
    const {
        availableDrinks,
        unavailableDrinks
    } = getAvailableAndUnavailableDrinks(getDrinksOfType(DrinksInfo, selectedTypeOfDrink));


    const DrinkTypeSelection = ({type}) => {
        return (
            <TouchableOpacity
                onPress={() => setSelectedTypeOfDrink(type)}
                style={type === selectedTypeOfDrink ? styles.SelectedFilterButton : styles.FilterButton}
            >
                <Text style={type === selectedTypeOfDrink ? styles.SelectedFiletrText : styles.FiletrText}>{type}</Text>

            </TouchableOpacity>
        );
    };


    const {selBarName, setSelBarName} = React.useContext(AppContext);
    console.log("DrinkType - selected bar:", selBarName)

    const buttonToShow = () => {
        return navigation.canGoBack() ? IconsButton.back : IconsButton.logout
    }
    return (
        <TenderFragment navigation={navigation} title={`Menu: ${selBarName}`}>
            {/*<View style={styles.ViewInfo}>*/}
            {/*    <Text style={styles.FeedTestoVoto}>Menu: {selBarName}</Text>*/}
            {/*</View>*/}
            <TenderScroll>

                <DrinkCardTender title={"Tipo di Drink:"}>
                    <View>
                        <ListDrinkType avaiableDrinkTypes={avaiableDrinkTypes} callbackfn={(item) => {
                            return <DrinkTypeSelection type={item.type} key={item.id}/>
                        }}/>
                    </View>
                </DrinkCardTender>

                <ListDrinkAvailable availableDrinks={availableDrinks} callbackfn={(item) => {
                    return <DrinkSelection Drink_={item.id} availability={true} navigation={navigation} key={item.id}/>
                }}/>

                <ListUnavailableDrink unavailableDrinks={unavailableDrinks} callbackfn={(item, index) => {
                    return <DrinkSelection Drink_={item.id} availability={false} navigation={navigation} key={item.id}/>
                }}/>

            </TenderScroll>

        </TenderFragment>
    )
};

export default DrinkMenu;



function ListDrinkType(props) {
    return <View>{props.avaiableDrinkTypes.map(props.callbackfn)}</View>;
}

function ListDrinkAvailable(props) {
    return <>
        {props.availableDrinks.length > 0 && <View style={styles.ViewInfo}>
            <Text style={styles.FeedTestoVoto}>DRINK DISPONIBILI</Text>
        </View>}
        {props.availableDrinks.map(props.callbackfn)}
    </>;
}

function ListUnavailableDrink(props) {
    return <View>
        {props.unavailableDrinks.length > 0 && <Text style={[styles.FeedTestoVoto, themeStyles.unavailableColor]}>
            DRINK NON DISPONIBILI
        </Text>}
        {props.unavailableDrinks.map(props.callbackfn)}
    </View>;
}


const styles = StyleSheet.create({
    FeedTestoVoto: {
        fontSize: 20,
        textAlign: 'center',
        padding: 20,
        margin: 10,
        borderRadius: 5,
        fontWeight: 'bold',
        backgroundColor: themeStyles.light.backgroundColor1
    },
    FiletrText: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 24,
        padding: 10
    },
    FilterButton: {
        width: '100%',
        borderWidth: 5,
        borderColor: themeStyles.light.backgroundColor1,
        borderRadius: 50,
        marginTop: 10
    },
    SelectedFiletrText: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 24,
        padding: 10
    },
    SelectedFilterButton: {
        width: '100%',
        borderWidth: 5,
        backgroundColor: themeStyles.light.backgroundColor1,
        borderColor: themeStyles.light.backgroundColor2,
        borderRadius: 50,
        marginTop: 10
    }
})


