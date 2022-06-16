import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        //backgroundColor: "#ffcc8b",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    SafeAreaHeader: {
        flex:0,
        backgroundColor: '#ffcc8b',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    AndroidHomeSafeArea: {
        flex: 1,
        backgroundColor: "#ffffff00",
    },
    ViewAut: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        marginHorizontal: 10,
        // borderColor: 'black',
        // borderWidth: 3,
    },
    titleText: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 36,
        //textShadowColor: 'black',
        //textShadowRadius: 5
    },
    Input: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 16,
    },
    InputSearchBar: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginHorizontal: 15,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 16,
    },
    BottoneView: {
        flex: 1,
        justifyContent: "center",
        paddingRight: 5,
        borderRadius: 15,
    },
    Bottone: {
        backgroundColor: "#2196F3",
        padding: 10,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    BottoneText: {
        color: "white",
    },
    Bottom: {
        //serve per centrare il resto degli elementi della pagina a causa di logo
        // Altrimenti è tutto centrato al di sotto del logo
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 30
    },
    ViewHome: {
        flexDirection: "column",
        justifyContent: "flex-start",
        marginHorizontal: 10,
    },
    RistoranteImm: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        // borderColor: 'black',
        // borderWidth: 3,
    },
    DrinkImm: {
        justifyContent: "center",
        alignItems: "center",
        height: 300,
        width: '100%',
        resizeMode: 'contain',
        marginVertical: 10,
        // borderColor: 'black',
        // borderWidth: 3,
    },
    HeaderTender: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        width: "100%",
        zIndex: 998,
        // elevation: 20,
        // shadowOffset: {width: 0, height: 5},
        // shadowRadius: 4,
        // shadowOpacity: 0.5
    },
    NavigatorTender: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        width: "100%",
        zIndex: 998,
        // elevation: 20,
        // shadowOffset: {width: 0, height: 5},
        // shadowRadius: 4,
        // shadowOpacity: 0.5
    }
});
