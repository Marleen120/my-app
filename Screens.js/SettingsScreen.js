import { View,Text,StyleSheet } from "react-native";

const SettingsScreen=()=>{

    return(
       <View Style={styles.container}>
        <Text Style={styles.Text}>
            settings
        </Text>
       </View>)
}
export default SettingsScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'blue',
    },
    button: {
      backgroundColor: 'orange',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
