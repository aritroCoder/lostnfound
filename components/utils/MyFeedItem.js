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
      if (props.found) {
        storage().ref(`founditems/${props.uid}/${props.id}`).list()
          .then((res) => {
            res.items.forEach((imageRef) => {
              imageRef.getDownloadURL()
                .then((url) => {
                  setImages((prev) => [...prev, url]);
                })
            });
          })
      } else {
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

  const closePost = async () => {
    if (props.found) {
      firestore()
        .collection('foundPosts')
        .doc(props.id)
        .update({
          opened: false,
        })
        .then(() => {
          console.log('Post updated!');
          Alert.alert('Item has been marked as closed', "This post will not be visible in public feed and won't be seen by all users");
          props.getPosts();
        });
    } else {
      firestore()
        .collection('lostPosts')
        .doc(props.id)
        .update({
          opened: false,
        })
        .then(() => {
          console.log('Post updated!');
          Alert.alert('Item has been marked as closed', "This post will not be visible in public feed and won't be seen by all users");
          props.getPosts();
        });
    }

  }

  const openPost = async () => {
    if (props.found) {
      firestore()
        .collection('foundPosts')
        .doc(props.id)
        .update({
          opened: true,
        })
        .then(() => {
          console.log('Post updated!');
          Alert.alert('Item has been marked as opened', "This post will be visible in public feed and can be seen by all users");
          props.getPosts();
        });
    } else {
      firestore()
        .collection('lostPosts')
        .doc(props.id)
        .update({
          opened: true,
        })
        .then(() => {
          console.log('Post updated!');
          Alert.alert('Item has been marked as opened', "This post will be visible in public feed and can be seen by all users");
          props.getPosts();
        });
    }
  }

  const handleCloseOpenPost = () => {
    if (props.opened) {
      Alert.alert(
        "Mark as closed",
        "Are you sure you want to mark this item as closed?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => closePost() }
        ],
        { cancelable: false }
      );

    } else {
      Alert.alert(
        "Mark as open",
        "Are you sure you want to reopen this post to be visible in public?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => openPost() }
        ],
        { cancelable: false }
      );
    }
  }


  return (
    <View style={styles.lostEntry}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#61764B' }}>{images.length > 1 ? "<" : ""}</Text>
        <ScrollView pagingEnabled horizontal style={styles.imgGrid}>
          {images.length > 0
            &&
            // console.log(images)
            images.map((image, index) => (
              <Image style={styles.image} source={{ uri: image, width: 330, height: 250 }} key={index} />
            ))
          }
        </ScrollView>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#61764B' }}>{images.length > 1 ? ">" : ""}</Text>
      </View>
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
      <Pressable android_ripple={{ color: '#0c285e' }} style={styles.button} onPress={() => handleCloseOpenPost()}>
        <Text style={styles.buttonText}>{props.opened ? "Close Post" : "Reopen Post"}</Text>
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
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#C8DBBE'
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
    borderRadius: 15,
    elevation: 3,
    backgroundColor: '#61764B',
    margin: 10,
  },
  buttonText: {
    color: '#F8FFDB',
    fontSize: 15
  },
  image: {
    margin: 10,
  },
});
