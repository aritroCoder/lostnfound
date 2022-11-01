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
    ToastAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

// unused function
function get_url_extension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

export default function PostforLostItem() {
    const [name, setName] = React.useState('');
    const [item, setItem] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [posting, setPosting] = React.useState(false);
    const [imageList, setImageList] = React.useState([]);
    const [date, setDate] = React.useState(new Date());

    React.useEffect(() => {
        setImageList([]);
        auth().onAuthStateChanged((user) => {
            if (user) {
                setName(user.displayName);
                setEmail(user.email);
                firestore().collection('users').doc(user.uid).get()
                    .then((doc) => {
                        if (doc.exists) {
                            console.log(doc.data());
                            setPhone(doc.data().phone);
                        }
                    })
                console.log(user)
            }
        });
    }, [])

    const handlePress = async () => {
        if (name === '' || item === '' || phone === '' || location === '' || details === '' || posting === '') return ToastAndroid.show("Fill in the fields properly!", ToastAndroid.SHORT);
        if (imageList.length > 5) return ToastAndroid.show("Select no more than 5 images", ToastAndroid.SHORT)
        setPosting(true);
        let uid;
        auth().onAuthStateChanged(async (user) => {

            try {
                if (user) {
                    uid = user.uid;
                    let postID;
                    await firestore()
                        .collection('foundPosts')
                        .add({
                            name,
                            item,
                            phone,
                            location,
                            details,
                            date,
                            email,
                            uid,
                            found: true,
                            opened: true
                        })
                        .then((docRef) => {
                            postID = docRef.id;
                        })
                    imageList.forEach(async (image) => {
                        console.log({ image });
                        const imgRef = storage().ref(`founditems/${uid}/${postID}/${v4()}`);
                        await imgRef.putFile(image);
                    });

                    Alert.alert('Post added!');
                }
            } catch (err) {
                Alert.alert(err.message);
            }
        });

        setPosting(false);
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
            multiple: true,
        }).then(images => {
            let tempList = [];
            images.forEach(image => {
                imageURI = Platform.OS === 'ios' ? image.sourceURL : image.path;
                tempList = [...tempList, imageURI];
                console.log(imageURI);
            });
            setImageList([...imageList, ...tempList]);
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Post for Found Items</Text>

            <View style={styles.inputGrid}>
                <Text>Enter Your Name: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={text => setName(text)}
                    defaultValue={name}
                />
            </View>
            <View style={styles.inputGrid}>
                <Text>Found Item Name: </Text>
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
                    defaultValue={phone}
                />
            </View>
            <View style={styles.inputGrid}>
                <Text>Location of finding: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Where found"
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
                <Text>Date of finding: </Text>
                <DatePicker date={date} onDateChange={setDate} />
            </View>
            <Pressable style={styles.button} onPress={() => choosePhotoFromLibrary()}>
                <Text style={styles.buttonText}>Add Photos (max 5)</Text>
            </Pressable>
            <Text style={styles.imageText}>{imageList.length} images selected</Text>
            <Pressable style={styles.button} android_ripple={{ color: '#4a4848' }} onPress={() => handlePress()}>
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
        borderRadius: 25,
        backgroundColor: '#EAEAEA'
    },
    multiLineImput: {
        height: 100,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#EAEAEA'
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
        color: '#F8FFDB'
    },
    imageText: {
        marginLeft: 30,
    },
    datePicker: {
        marginLeft: '10%',
    },
});
