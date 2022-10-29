import * as React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert
} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'


const logo = {
  uri: 'https://images.pexels.com/photos/8600666/pexels-photo-8600666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  width: 330,
  height: 250,
};

export default function FeedItem(props) {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const getImages = async () => {
      if(props.found){
        storage().ref(`founditems/${props.uid}/${props.id}`).list()
        .then((res) => {
          res.items.forEach((imageRef) => {
            imageRef.getDownloadURL()
              .then((url) => {
                setImages((prev) => [...prev, url]);
              })
          });
        })
      }else{
        storage().ref(`lostitems/${props.uid}/${props.id}`).list()
        .then((res) => {
          res.items.forEach((imageRef) => {
            imageRef.getDownloadURL()
              .then((url) => {
                setImages((prev) => [...prev, url]);
              })
          });
        })
      }
    }

    getImages();
  }, [])

  const foundItem = async () => {
    firestore()
      .collection('lostPosts')
      .doc(props.id)
      .update({
        found: true,
        opened: false
      })
      .then(() => {
        console.log('User updated!');
        Alert.alert('Item has been marked as found', "The owner of the item will connect to you. Be sure to keep the item safely until then.");
        props.getPosts();
      });
  }

  const claimItem = async () => {
    firestore()
      .collection('foundPosts')
      .doc(props.id)
      .update({
        claimed: true,
        opened: false
      })
      .then(() => {
        console.log('User updated!');
        Alert.alert('Item has been marked as claimed', "The finder of the item will connect to you. Be sure to contact him in case he fails to connect.");
        props.getPosts();
      });
  }

  const handleFoundClaimAction = () => {
    if(props.found){
      Alert.alert(
        "Mark as claimed",
        "Are you sure you want to mark this item as claimed?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => claimItem() }
        ],
        { cancelable: false }
      );
      
    }else{
      Alert.alert(
        "Mark as found",
        "Are you sure you want to mark this item as found?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => foundItem() }
        ],
        { cancelable: false }
      );
    }
    }
  

  return (
    <View style={styles.lostEntry}>
      <ScrollView pagingEnabled horizontal style={styles.imgGrid}>

        {images.length > 0
          &&
          // console.log(images)
          images.map((image, index) => (
            <Image style={styles.image} source={{ uri: image, width: 330, height: 250 }} key={index} />
          ))
        }

      </ScrollView>
      <View style={styles.inputGrid}>
        <Text style={styles.text}>Item Name: {props.item}</Text>
        <Text style={styles.subtext}>
          Posted by {props.name}
        </Text>
        <Text style={styles.subtext}>
          phone: {props.phone}
        </Text>
        <Text style={styles.subtext}>Date: {props.date}</Text>
        <Text style={styles.subtext}>Place: {props.location}</Text>
        <Text style={styles.message}>
          {props.details}
        </Text>
      </View>
      <Pressable android_ripple={{ color: '#0c285e' }} style={styles.button} onPress={() => handleFoundClaimAction()}>
        <Text style={styles.buttonText}>{props.found?"Claim":"I found it!"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  lostEntry: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  inputGrid: {
    flexDirection: 'column',
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  subtext: {
    color: 'black',
    fontSize: 15,
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 10,
    marginRight: 10,
  },
  message: {
    color: 'black',
    fontSize: 15,
    margin: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  image: {
    margin: 10,
  },
});
