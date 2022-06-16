import React from "react";
import { View, TouchableOpacity, Text } from 'react-native';
import {AppContext} from "../../../AppContext";
import { themeStyles } from "../../../styles/theme/ThemeStyles"



export const TenderButton = ({ testo, navigation, bar = "unknown", color = themeStyles.light.backgroundColor1, action = null }) => {
    //const [bar, setBar] = useState('');
    
    //console.log("TenderButton")
    const { selBarName, setSelBarName } = React.useContext(AppContext);
    const setBarAndNavigate = () => {
    // I think there might be this problem https://stackoverflow.com/a/65516659/7130614
    // since bar is not passed to DrinkSelection I'm using context instead (erroneously)
    setSelBarName(bar.nome);
    navigation.push('DrinkMenuSelection', {barName: bar.nome} )
}
    
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 10,
            borderWidth: 3,
            borderColor: themeStyles.light.backgroundColor2,
            borderRadius: 50,

        }}>
            <TouchableOpacity
                onPress={() => action == null ? setBarAndNavigate() : action()}
                style={{
                    flex:1,
                    borderColor: color,
                    borderWidth: 6,
                    backgroundColor: themeStyles.light.backgroundColor2,
                    paddingVertical: 10,
                    borderRadius: 50,
                    shadowColor: '#000',
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84 ,
                    shadowOffset : { width: 0, height: 5},
                    elevation: 10,
            }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize:17 }}>{testo}</Text>
            </TouchableOpacity>
        </View>
    )
}

