import React, { Component, useState} from 'react';
import { Text, StyleSheet, View, Modal, TouchableWithoutFeedback, Alert  } from 'react-native';
import {themeStyles} from "../../../styles/theme/ThemeStyles"
import { Entypo } from "@expo/vector-icons";
import {TenderButton} from "./TenderButton";


/* necessario per essere chiamato 
  const [alertVisibility, setAlertVisibility] = useState(false)  variabile di stato

  const showAlert=()=>{  // permette di aprire l'allert tramite "onPress"
    if (alertVisibility===false){
        setAlertVisibility(true)
    }
  }
*/

/**
 * 
 * @param {
 * #children, //componenti figli
 * visibility, // true/false: visibilità iniziale
 * state, // funzione per cambiamento di stato
 * title, // "titolo"
 * tenderButtons, //[{testo, navigation, bar, color, action, alertText }]
 * } elements 
 * @returns 
 */

export const TenderAlert = (elements) =>{
const cancelAlertBox = () => {
  elements.state(false);
}
const alertMessage = (text) => {
  Alert.alert(text);
}
  const _renderContent = () => {
    
    return (
      <View style={{ paddingHorizontal:5, paddingVertical:10}}>
        {elements.children}
      </View>
      );
    
  }
  const _renderHeader = () => {
    return (
      <View style={{width: '100%', flexDirection: "row", paddingVertical:10}}>
          <Text style={styles.AlertTitle}>{elements.title ? elements.title : "notifica"}</Text>
          <Entypo
              onPress={() => { cancelAlertBox() }}
              name={"circle-with-cross"}
              size={40}
              color={'black'}
              style={styles.FavouriteButton}
          />
      </View>

    );
  }
  const _renderButtons = () => {

    if (elements.tenderButtons) {
      if (elements.tenderButtons.length == 1) {
        return (
          <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: 'center', alignItems: "center", alignContent: 'center', paddingVertical:20}}>
            {
              singleButton(elements.tenderButtons[0])
            }
          </View>
        );
      }
      else if (elements.tenderButtons.length == 2) {
        
        return (
          <View style={{ flexDirection: "row", alignSelf: "center",justifyContent: 'center', paddingVertical:20 }}>
            {
              singleButton(elements.tenderButtons[0])
            }
            {
              singleButton(elements.tenderButtons[1])
            }
          </View>
        );
      }
      else{
        
        return (<>
              <View style={{ flexDirection: "row", alignSelf: "center",justifyContent: 'center', paddingVertical:20,fontSize:20 }}>
                {
                  singleButton(elements.tenderButtons[0])
                }
                {
                  singleButton(elements.tenderButtons[1])
                }
                {
                  singleButton(elements.tenderButtons[2])
                }

              </View>
              <View style={{flexDirection: "row", width:"50%", justifyContent: 'center', paddingBottom:20 }}>

              </View>
            </>
        );
      }
    }

    /*{
      elements.tenderButtons.map((element,index) => {
        singleButton(index, element.testo, element.navigation, element.bar, element.color, element.action)
      })
    }*/
  }

  const singleButton = (element) => {

    const testo_ = element.testo
    const navigation_ = element.navigation
    const bar_ = element.bar
    const color_ = element.color
    const action_ = element.action
    const alertText = element.alertText

    function actionAcquista () {
      cancelAlertBox();
      action_()
    }

    if(alertText){
      return(
      <View style={styles.parallelButtons}>
        <TenderButton
          testo = {testo_ ? testo_ : "OK"}
          navigation = {navigation_}
          bar = {bar_ ? bar_ : "unknown"} 
          color = {color_ ? color_ : themeStyles.light.backgroundColor1}
          action = {action_ ? actionAcquista : ()=>{alertMessage(alertText)}}
          />
      </View>
      );
    }

    return(
      <View style={styles.parallelButtons}>
        <TenderButton
          testo = {testo_ ? testo_ : "OK"}
          navigation = {navigation_}
          bar = {bar_ ? bar_ : "unknown"} 
          color = {color_ ? color_ : themeStyles.light.backgroundColor1}
          action = {action_ ? actionAcquista: cancelAlertBox}
          />
      </View>
      
    );
  }


//console.log("tenderAllert")
  return(
    <View style={styles.container} >
    <Modal
      visible={elements.visibility }
      transparent={true}
      animationType={"fade"}
      onRequestClose={() => { cancelAlertBox() }} >
      {/*per chiudere il modal quando clicchi fuori
      https://stackoverflow.com/questions/40483034/close-react-native-modal-by-clicking-on-overlay*/}
      <TouchableWithoutFeedback style={{backgroundColor: 'rgba(0,0,0,0.7)'}} onPress={cancelAlertBox}>

        <View style={styles.fullPageBackground}>

          <View style={styles.MainAlertView}>
            {_renderHeader()}
            <View style={styles.horizontalWhiteLines} />

            {_renderContent()}

            {_renderButtons()}

          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  </View>
);
  
}


const styles = StyleSheet.create({
  fullPageBackground:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#33333399"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
   MainAlertView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeStyles.light.backgroundColor1,
    borderRadius:40,
    flexShrink: 1,
    width: '90%',

  },
  AlertTitle: {
    flexGrow: 1,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 3,
    paddingLeft:10,
    width:"90%"
  },
  AlertMessage: {
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    height: '40%'
  },
  buttonStyle: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextStyle: {

    textAlign: 'center',
    fontSize: 22,
    marginTop: -5
  },
  horizontalWhiteLines:{
    width: '100%',
    height: 1,
    backgroundColor: '#fff'
  },
  verticalWhiteLine: {
    width: 0.5,
    height: '100%',
    backgroundColor: '#fff'
  },
  FavouriteButton: {
   // backgroundColor: themeStyles.light.backgroundColor1,
  },
  FavouriteButtonView: {
    // backgroundColor: themeStyles.light.backgroundColor1,
    borderWidth: 1
  },
  parallelButtons: {
    flexGrow: 1,
    minWidth:60,
    height:60,
    justifyContent: 'center',
    alignContent: 'center',
  },
});



  /*
  
  <View style={{ flexDirection: 'row',  }}>
            <TouchableOpacity style={styles.buttonStyle} onPress={()=>{alertMessage()}} activeOpacity={0.7} >
              <Text style={styles.TextStyle}> OK </Text>
            </TouchableOpacity>

            <View style={styles.verticalWhiteLine} />

            <TouchableOpacity style={styles.buttonStyle} onPress={() => { cancelAlertBox() }} activeOpacity={0.7} >
              <Text style={styles.TextStyle}> CANCEL </Text>
            </TouchableOpacity>
          </View>
  


          
  */
