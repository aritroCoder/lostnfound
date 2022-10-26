import * as React from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Alert,
} from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, uploadString } from 'firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import DatePicker from 'react-native-date-picker';

import { storage, db } from '../../configs/firebase.config';

function get_url_extension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

function decodeFromBase64(input) {
    input = input.replace(/\s/g, '');
    return input;
}

function dataURItoBlob(dataURI) {
    if(typeof dataURI !== 'string'){
        throw new Error('Invalid argument: dataURI must be a string');
    }
    dataURI = dataURI.split(',');
    var type = dataURI[0].split(':')[1].split(';')[0],
        byteString = atob(dataURI[1]),
        byteStringLength = byteString.length,
        arrayBuffer = new ArrayBuffer(byteStringLength),
        intArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteStringLength; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], {
        type: type
    });
  
  }

export default function PostforLostItem() {
    const [name, setName] = React.useState('');
    const [item, setItem] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [details, setDetails] = React.useState('');
    const lostCollectionRef = collection(db, 'lostPosts');
    const [posting, setPosting] = React.useState(false);
    const [imageList, setImageList] = React.useState([]);
    const [date, setDate] = React.useState(new Date());

    let uid;

    const auth = getAuth();
    onAuthStateChanged(auth, user => {
        if (user) {
            uid = user.uid;
        } else {
            // No user is signed in.
        }
    });

    const handlePress = async () => {
        try {
            setPosting(true);
            if (!name || !item || !phone || !location || !details || !date) {
                Alert.alert('Please fill all the fields');
                setPosting(false);
                return;
            }
            // Add a new document in collection "lostPosts"
            let newDocRef = await addDoc(lostCollectionRef, {
                name: name,
                item: item,
                phone: phone,
                location: location,
                details: details,
                date: date.toDateString(),
                user: uid,
                found: false,
            });

            imageList.forEach(image => {
                const storageRef = ref(
                    storage,
                    `lostposts/${uid}/${newDocRef.id}/${v4()}.jpg`,
                );               
                
                console.log("data:image/jpeg;base64,"+image);
                uploadString(storageRef, image, 'base64', { contentType: 'image/jpeg' }).then(
                    snapshot => {
                        console.log('Uploaded a blob or file!');
                    },
                );
            });

            Alert.alert('Success', 'Your post is successfully added');
        } catch (e) {
            Alert.alert('Error', e.message);
            console.log(e.message);
        }

        setPosting(false);
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
            multiple: true,
            includeBase64: true,
        }).then(images => {
            let tempList = [];
            images.forEach(image => {
                imageURI = Platform.OS === 'ios' ? image.sourceURL : image.path;
                imageData = image.data;
                // console.log(imageData);
                tempList = [...tempList, imageData];
                console.log(imageURI);
            });
            setImageList([...imageList, ...tempList]);
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Post for Lost Item</Text>

            <View style={styles.inputGrid}>
                <Text>Enter Your Name: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={text => setName(text)}
                />
            </View>
            <View style={styles.inputGrid}>
                <Text>Lost Item Name: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Eg. keys, bottle, headphones"
                    onChangeText={text => setItem(text)}
                />
            </View>
            <View style={styles.inputGrid}>
                <Text>Phone Number: </Text>
                <TextInput
                    style={styles.input}
                    keyboardType="phone-pad"
                    placeholder="Phone"
                    onChangeText={text => setPhone(text)}
                />
            </View>
            <View style={styles.inputGrid}>
                <Text>Location of losing: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Where lost"
                    onChangeText={text => setLocation(text)}
                />
            </View>
            <View style={styles.inputGrid}>
                <Text>Any Details: </Text>
                <TextInput
                    style={styles.multiLineImput}
                    multiline
                    placeholder="Message"
                    onChangeText={text => setDetails(text)}
                />
            </View>
            <View style={{ ...styles.inputGrid, flexDirection: 'column' }}>
                <Text>Date of losing: </Text>
                <DatePicker date={date} onDateChange={setDate} />
            </View>
            <Pressable style={styles.button} onPress={() => choosePhotoFromLibrary()}>
                <Text style={styles.buttonText}>Add Photos</Text>
            </Pressable>
            <Text style={styles.imageText}>{imageList.length} images selected</Text>
            <Pressable style={styles.button} onPress={() => handlePress()}>
                <Text style={styles.buttonText}>
                    {posting ? <ActivityIndicator /> : 'Post'}
                </Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    title: {
        color: 'black',
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    multiLineImput: {
        height: 100,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        margin: 10,
        backgroundColor: 'black',
        borderRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    imageText: {
        marginLeft: 30,
    },
    datePicker: {
        marginLeft: '10%',
    },
});
