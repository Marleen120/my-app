import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Platform,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Switch } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { storage } from "../Firebase";
import { getStorage} from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// -----------------------------------------Importing own compnents

import colors from "../Colors";

const screenWidth = Dimensions.get("window").width;

export default function Profile({ navigation }) {

  const [isNotificationsOn, setIsNotificationsOn] = React.useState(false);
  const [dp, setDp] = useState(null);
  const onToggleNotifications = () => setIsNotificationsOn(!isNotificationsOn);

  useEffect(() => {
    console.log("useeffect of profile called []");
  }, []);

  const selectProfilePic = async () => {
    // Function to pick image from device

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);
    setDp(result.assets[0].uri);
  };

  const uploadImage = async (img ) => {

    if(dp == null) {
      return alert("Please select an image to upload");
    }
    console.log("Uploading image ...");
    const response = await fetch(img);
    const blob = await response.blob();
    const filename = img.substring(img.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `profiles/${filename}`);

    try{

      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);
      console.log("\n\n\t\timage URL returned ==>", url.trim());
      return url.trim();
    }
    catch(error){
      console.log(new Error(error));
    }

  };

 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top container for user info  */}
      <View
        style={{
          flex: 0.4,
          backgroundColor: colors.grey,
          alignItems: "center",
          justifyContent: "center",
          marginTop: StatusBar.height,
          paddingTop: 20,
        }}
      >
        <StatusBar style="dark" backgroundColor={colors.lightbg} />
        <TouchableOpacity onPress={() => selectProfilePic()}>
        {dp ? <Image
       style={{
        height: 100,
        width: 100,
        resizeMode: "cover",
        borderRadius: 50,
        marginBottom: 5,
      }}
        source={{uri:dp}} /> : 
        <Image
              style={{
                height: 100,
                width: 100,
                resizeMode: "cover",
                borderRadius: 50,
                marginBottom: 5,
              }}
              source={require("../assets/simba.jpeg")}
            />
        }
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.white }}> Marleen </Text>
        <Text style={styles.text}>marleen@gmail.com</Text>
       
        <TouchableOpacity
          style={{
            backgroundColor: colors.yellow,
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 120,
            borderRadius: 20,
          }}
          onPress={()=>(uploadImage(dp))}
        >
          <Text
            style={{ color: colors.black, fontSize: 16, fontWeight: "400" }}
          >
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Container view for settings */}

      <View
        style={{
          flex: 0.6,
          backgroundColor: colors.lightbg,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View style={styles.sectionHeaderView}>
          <Text style={styles.sectionText}>Account   </Text>
        </View>

        <TouchableOpacity
          style={styles.sectionOptions}
        >
          {/* <FontAwesome name="lock" size={18} color={colors.green} /> */}
          <Text>Change Password</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.sectionOptions}>
          <Text>Enable notifications</Text>
          <Switch
            value={isNotificationsOn}
            onValueChange={onToggleNotifications}
          />
        </View>

        <View style={styles.sectionHeaderView}>
          <Text style={styles.sectionText}>Others</Text>
        </View>

        <TouchableOpacity style={styles.sectionOptions}>
          <Text>Privacy policy    </Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionOptions}>
          <Text>Terms and conditions   </Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => onLogOut()}>
          <Feather name="power" size={20} color={colors.grey} />
          <Text style={styles.sectionText}>Logout   </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: StatusBar.height,
    backgroundColor: colors.grey,
  },

  field: {
    marginBottom: 10,
    padding: 12,
    height: 50,
    borderRadius: 10,
    borderColor: colors.grey,
    borderWidth: 0.5,
  },
  text: { color: colors.lightGrey, marginBottom: 5, marginLeft: 5 },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 5,
    color: colors.grey,
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 5,
    color: colors.yellow,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 35,
    fontSize: 13,
    borderRadius: 10,
    borderColor: colors.purple,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "5%",
    marginLeft: 5,
    marginBottom: 10,
  },
  addImageBtn: {
    borderRadius: 20,
    height: 90,
    width: 90,
    backgroundColor: colors.lightPurple,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
  itemImage: {
    height: 90,
    width: 90,
    borderRadius: 20,
  },
  submitBtn: {
    height: 55,
    width: 306,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
  },
  sectionHeaderView: {
    height: 45,
    paddingHorizontal: 18,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  sectionText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.darkGrey,
  },
  sectionOptions: {
    flexDirection: "row",
    height: 45,
    paddingHorizontal: 18,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    marginVertical: "2%",
    marginHorizontal: "3%",
    borderRadius: 20,
  },
  logoutBtn: {
    flexDirection: "row",
    height: 45,
    paddingHorizontal: 26,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});