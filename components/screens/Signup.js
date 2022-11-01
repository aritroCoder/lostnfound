import * as React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

//signup page 
export default function HomeScreen({ navigation }) {

    const [name, setName] = React.useState('');
    const [roll, setRoll] = React.useState('');
    const [phone, setPhone] = React.useState();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loggingIn, setLoggingIn] = React.useState(false);
    const [photo, setPhoto] = React.useState(null);

    React.useEffect(() => {
        if (loggingIn) handleAuth();
    }, [loggingIn])

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
        }).then(image => {
            imageURI = Platform.OS === 'ios' ? image.sourceURL : image.path;
            console.log(imageURI);
            setPhoto(imageURI);
        });
    };

    const handleAuth = () => {
        if(email.slice(-11)!=='@iitp.ac.in') {
            ToastAndroid.show("Enter a valid IIT Patna email", ToastAndroid.SHORT);
            return setLoggingIn(false);
        }

        if(name.length===0||roll.length===0||phone.length===0||email.length===0||password.length===0||confirmPassword.length===0||!photo) {
            ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
            return setLoggingIn(false);
        }

        if (password === confirmPassword) {
            console.log(loggingIn);
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async () => {
                    await auth().currentUser.sendEmailVerification({
                        handleCodeInApp: false,
                        url: 'https://lostnfound-52d9b.firebaseapp.com',
                    });
                    const imgRef = storage().ref(`users/${auth().currentUser.uid}/${auth().name}`);
                    await imgRef.putFile(photo)
                    const update = {
                        displayName: name,
                        phoneNumber: phone,
                        photoURL: await imgRef.getDownloadURL()
                    };

                    await auth().currentUser.updateProfile(update);

                    await firestore()
                        .collection('users')
                        .doc(auth().currentUser.uid)
                        .set({
                            roll,
                            phone,  
                        })

                    Alert.alert("Verification Email Sent", "Check your email for a verification mail. If not found, search in spam folder.");
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert("Error", 'That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        Alert.alert("Error", 'That email address is invalid!');
                    }

                    console.error(error);
                    Alert.alert("Error", error.message);
                });
        }
        else {
            Alert.alert('Password and confirm Password do not match');
        }
        setLoggingIn(false);
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.inputGrid}>
                <Text style={styles.text}>Name: </Text>
                <TextInput style={styles.input} onChangeText={(text) => setName(text)} placeholder="Your name" />
            </View>
            <View style={styles.inputGrid}>
                <Text style={styles.text}>Roll Number: </Text>
                <TextInput style={styles.input} onChangeText={(text) => setRoll(text)} placeholder="Your 8 digit Roll Number" />
            </View>
            <View style={styles.inputGrid}>
                <Text style={styles.text}>Webmail: </Text>
                <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} placeholder="name_roll@iitp.ac.in" />
            </View>
            <View style={styles.inputGrid}>
                <Text style={styles.text}>Password: </Text>
                <TextInput style={styles.input} onChangeText={(text) => setPassword(text)} secureTextEntry placeholder="Password" />
            </View>
            <View style={{ ...styles.inputGrid, flexDirection: 'column' }}>
                <Text style={styles.text}>Confirm Password: </Text>
                <TextInput style={styles.input} onChangeText={(text) => setConfirmPassword(text)} secureTextEntry placeholder="Retype the Password" />
            </View>
            <View style={styles.inputGrid}>
                <Text style={styles.text}>Phone: </Text>
                <TextInput style={styles.input} keyboardType="phone-pad" onChangeText={(text) => setPhone(text)} placeholder="Your Phone Number" />
            </View>
            <View style={{ ...styles.inputGrid, flexDirection: 'column' }}>
                <Text style={styles.text}>Upload Profile Pic: </Text>
                <Pressable style={styles.button} android_ripple={{ color: '#3164b5' }} onPress={() => choosePhotoFromLibrary()}>
                    <Text style={styles.buttonText}>Add a Photo</Text>
                </Pressable>
                <Text style={styles.imageText}>{!photo ? 0 : 1} image selected</Text>
            </View>
            <Text style={{ color: 'black' }}>Already have an account?</Text><Pressable onPress={() => navigation.navigate("Login - Lost&Found")}><Text style={{ color: 'black' }}>Log in</Text></Pressable>

            <Pressable android_ripple={{ color: '#3164b5' }} style={{...styles.button, marginBottom: 25}} onPress={() => { setLoggingIn(!loggingIn) }}>
                <Text style={styles.buttonText}>{loggingIn ? <ActivityIndicator /> : "Create an Account"}</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    inputGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    title: {
        color: 'black',
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
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
        color: '#F8FFDB'
    },
});