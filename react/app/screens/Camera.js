import React, { Component } from "react";
import { Text, View, Button, Platform, Image, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export class PickImage extends Component {
  state = {
    image: null,
  };

  componentDidMount() {
    this.getPermissions();
  }

  getPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        return alert("Camera permission not granted");
      }
    }
  };

  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.all,
        allowEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          image: result.data,
        });
        console.log(result.uri);
        this.uploadImage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  uploadImage = async (uri) => {
    const data = new FormData();
    let filename = uri.split("/")[uri.split(".").length - 1];
    let type = `image/${uri.split(".")[uri.split(".").length - 1]}`;
    const fileToUpload = {
      uri: uri,
      name: filename,
      type: type,
    };
    data.append("digit", fileToUpload);
    fetch(" your url comes here + /predict-digit", {
      method: "POST",
      body: data,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <Button
          title="Pick An Image"
          onPress={() => {
            this.pickImage();
            console.log("Loading...");
          }}
        />
      </View>
    );
  }
}

export default PickImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
