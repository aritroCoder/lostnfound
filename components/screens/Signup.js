import * as React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, updateProfile } from 'firebase/auth';
// TODO: add users details like name, phone, photos
import { app } from '../../configs/firebase.config';

//signup page 
export default function HomeScreen({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loggingIn, setLoggingIn] = React.useState(false);

    const handleAuth = async () => {
        if (password === confirmPassword) {
            try {
                setLoggingIn(true);
                const auth = getAuth(app);
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log(userCredential);
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        sendEmailVerification(user);
                        Alert.alert('Verification Email Sent', 'Please verify your email address before logging in. If you dont see the mail, be sure to check your spam folder once');
                        navigation.navigate('Login - Lost&Found');
                    } else {
                        Alert.alert('Error', 'There was an error creating your account.');
                    }
                });
            } catch (err) {
                console.log(err);
                Alert.alert("Error Creating Account", err.message);
            }
        } else {
            Alert.alert("Passwords don't match");
        }
        setLoggingIn(false);
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.inputGrid}>
                <Text style={styles.text}>Name: </Text>
                <TextInput style={styles.input} placeholder="Your name" />
            </View>
            <View style={styles.inputGrid}>
                <Text style={styles.text}>Roll Number: </Text>
                <TextInput style={styles.input} placeholder="Your 8 digit Roll Number" />
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
                <TextInput style={styles.input} keyboardType="phone-pad" placeholder="Your Phone Number without country codes(India only)" />
            </View>
            <View style={{ ...styles.inputGrid, flexDirection: 'column' }}>
                <Text style={styles.text}>Whatsapp number: </Text>
                <TextInput style={styles.input} keyboardType="phone-pad" placeholder="Your Whatsapp Number without country codes(India only)" />
            </View>
            <View style={{ ...styles.inputGrid, flexDirection: 'column' }}>
                <Text style={styles.text}>Upload Profile Pic: </Text>
                <TextInput style={styles.input} keyboardType="phone-pad" placeholder="Your Whatsapp Number without country codes(India only)" />
            </View>
            <Text style={{ color: 'black' }}>Already have an account?</Text><Pressable onPress={() => navigation.navigate("Login - Lost&Found")}><Text style={{ color: 'black' }}>Log in</Text></Pressable>
            <Pressable style={styles.button} onPress={() => handleAuth()}>
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