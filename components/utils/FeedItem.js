import * as React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const logo = {
  uri: 'https://images.pexels.com/photos/8600666/pexels-photo-8600666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  width: 330,
  height: 250,
};

export default function FeedItem(props) {
  const [images, setImages] = React.useState([]);
  const [roll, setRoll] = React.useState('');

  React.useEffect(() => {
    const getImages = async () => {
      if (props.found) {
        storage()
          .ref(`founditems/${props.uid}/${props.id}`)
          .list()
          .then(res => {
            res.items.forEach(imageRef => {
              imageRef.getDownloadURL().then(url => {
                setImages(prev => [...prev, url]);
              });
            });
          });
      } else {
        storage()
          .ref(`lostitems/${props.uid}/${props.id}`)
          .list()
          .then(res => {
            res.items.forEach(imageRef => {
              imageRef.getDownloadURL().then(url => {
                setImages(prev => [...prev, url]);
              });
            });
          });
      }
    };

    getImages();
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        setRoll(doc.data().roll);
      });
  }, []);

  const foundItem = async () => {
    firestore()
      .collection('lostPosts')
      .doc(props.id)
      .update({
        opened: false,
      })
      .then(() => {
        console.log('User updated!');
        Alert.alert(
          'Item has been marked as found',
          'The owner of the item will connect to you. Be sure to keep the item safely until then, and send the mail when the mail window opens.',
        );

        Linking.openURL(
          `mailto:${props.email}?subject=${
            props.item
          }%20has%20been%20found!&body=item%20described%20as%20"${
            props.details
          }",%20has%20been%20found%20by%20${
            auth().currentUser.displayName
          }%20Roll:%20${roll}%20on%20${new Date()}`,
        );

        // email alert to creator of post
        // const mailID = 'nodejsmongodbgraphql@gmail.com';
        // const recipent = props.email
        // const passwd = 'tGusfSmYop';
        // let transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //         user: mailID,
        //         pass: passwd
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // })

        // let mailOptions = {
        //     from: mailID,
        //     to: recipent,
        //     subject: props.found? "Your lost item has been found!" : "Your found item has been claimed!",
        //     text: `The item ${props.item}, with description ${props.details} has been ${props.found? "claimed":"found"} by ${auth().currentUser.name}, and email ${auth().currentUser.email}. Please contact them to arrange for pickup.`
        // }

        // transporter.sendMail(mailOptions, function (err, success) {
        //     if (err) console.log(err)
        //     else console.log("email sent")
        // })
        // end email alert code

        props.getPosts();
      });
  };

  const claimItem = async () => {
    firestore()
      .collection('foundPosts')
      .doc(props.id)
      .update({
        opened: false,
      })
      .then(() => {
        console.log('User updated!');
        Alert.alert(
          'Item has been marked as claimed',
          'The finder of the item will connect to you. Be sure to contact him in case he fails to connect, and send the mail when the mail window opens.',
        );
        Linking.openURL(
          `mailto:${props.email}?subject=${
            props.item
          }%20has%20been%20claimed!&body=item%20described%20as%20"${
            props.details
          }",%20has%20been%20claimed%20by%20${
            auth().currentUser.displayName
          }%20Roll:%20${roll}%20on%20${new Date()}`,
        );
        props.getPosts();
      });
  };

  const handleFoundClaimAction = () => {
    if (props.found) {
      Alert.alert(
        'Mark as claimed',
        'Are you sure you want to mark this item as claimed?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => claimItem()},
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Mark as found',
        'Are you sure you want to mark this item as found?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => foundItem()},
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <View style={styles.lostEntry}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 17, fontWeight: 'bold', color: '#61764B'}}>
          {images.length > 1 ? '<' : ''}
        </Text>

        <ScrollView pagingEnabled horizontal style={styles.imgGrid}>
          {images.length > 0 &&
            // console.log(images)
            images.map((image, index) => (
              <Image
                style={styles.image}
                source={{uri: image, width: 320, height: 250}}
                key={index}
              />
            ))}
        </ScrollView>

        <Text style={{fontSize: 17, fontWeight: 'bold', color: '#61764B'}}>
          {images.length > 1 ? '>' : ''}
        </Text>
      </View>
      <View style={styles.inputGrid}>
        <Text style={styles.text}>Item Name: {props.item}</Text>
        <Text style={styles.subtext}>Posted by {props.name}</Text>
        <Text style={styles.subtext}>phone: {props.phone}</Text>
        <Text style={styles.subtext}>Date: {props.date}</Text>
        <Text style={styles.subtext}>Place: {props.location}</Text>
        <Text style={styles.message}>{props.details}</Text>
      </View>
      <Pressable
        android_ripple={{color: '#0c285e'}}
        style={styles.button}
        onPress={() => handleFoundClaimAction()}>
        <Text style={styles.buttonText}>
          {props.found ? 'Claim' : 'I found it!'}
        </Text>
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
    backgroundColor: '#C8DBBE',
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
    fontSize: 20,
  },
  image: {
    margin: 8,
    borderRadius: 10,
  },
});
