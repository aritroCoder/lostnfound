import * as React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import {listAll, ref, getDownloadURL} from 'firebase/storage';
import {storage, db} from '../../configs/firebase.config';

const logo = {
  uri: 'https://images.pexels.com/photos/8600666/pexels-photo-8600666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  width: 330,
  height: 250,
};

export default function FeedItem(props) {
  const [images, setImages] = React.useState([]);
  
  React.useEffect(() => {
    const getImages = async()=>{
      const storageRef = ref(storage, `lostposts/${props.uid}/${props.id}/`);

      listAll(storageRef).then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            setImages((prev) => [...prev, url]);
          });
        });
      });
    }

    getImages();
  },[])
  return (
    <View style={styles.lostEntry}>
      <ScrollView pagingEnabled horizontal style={styles.imgGrid}>

        {images.length>0 && images.map((image, index) => (
          <Image style={styles.image} source={image} key={index}/>
        ))}
        
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
      <Pressable android_ripple={{color: '#0c285e'}} style={styles.button}>
        <Text style={styles.buttonText}>I Found It!</Text>
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
