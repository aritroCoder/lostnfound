import * as React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
// TODO: add users details like name, phone, photos

//signup page 
export default function HomeScreen({ navigation }) {

    const [name, setName] = React.useState('');
    const [roll, setRoll] = React.useState('');
    const [phone, setPhone] = React.useState();
    const [whatsapp, setWhatsapp] = React.useState();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loggingIn, setLoggingIn] = React.useState(false);

    React.useEffect(() => {
        if (loggingIn) handleAuth();
    }, [loggingIn])

    const handleAuth = () => {
        if (password === confirmPassword) {
            console.log(loggingIn);
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async () => {
                    await auth().currentUser.sendEmailVerification({
                        handleCodeInApp: false,
                        url: 'https://lostnfound-52d9b.firebaseapp.com',
                    });
                    const update = {
                        displayName: name,
                        phoneNumber: phone
                    };
                      
                    await auth().currentUser.updateProfile(update);
                    Alert.alert("Verification Email Sent", "Check your email for a verification mail. If not found, search in spam folder.");
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('That email address is invalid!');
                    }

                    console.error(error);
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
                <TextInput style={styles.input} onChangeText={(text)=>setName(text)} placeholder="Your name" />
            </View>
            <View style={styles.inputGrid}>
                <Text style={styles.text}>Roll Number: </Text>
                <TextInput style={styles.input} onChangeText={(text)=>setRoll(text)} placeholder="Your 8 digit Roll Number" />
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
                <TextInput style={styles.input} keyboardType="phone-pad" onChangeText={(text)=>setPhone(text)} placeholder="Your Phone Number without country codes(India only)" />
            </View>
            <View style={{ ...styles.inputGrid, flexDirection: 'column' }}>
                <Text style={styles.text}>Whatsapp number: </Text>
                <TextInput style={styles.input} keyboardType="phone-pad" onChangeText={(text)=>setWhatsapp(text)} placeholder="Your Whatsapp Number without country codes(India only)" />
            </View>
            <View style={{ ...styles.inputGrid, flexDirection: 'column' }}>
                <Text style={styles.text}>Upload Profile Pic: </Text>
                <TextInput style={styles.input} keyboardType="phone-pad" placeholder="Your Whatsapp Number without country codes(India only)" />
            </View>
            <Text style={{ color: 'black' }}>Already have an account?</Text><Pressable onPress={() => navigation.navigate("Login - Lost&Found")}><Text style={{ color: 'black' }}>Log in</Text></Pressable>
            <Pressable android_ripple={{ color: '#3164b5' }} style={styles.button} onPress={() => { setLoggingIn(!loggingIn) }}>
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
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2196F3',
        margin: 10,
    },
});