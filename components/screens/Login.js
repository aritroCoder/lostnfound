import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
//login page 
export default function HomeScreen({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loggingIn, setLoggingIn] = React.useState(false);

    React.useEffect(() => {
        if (loggingIn) {
            handleAuth()
                .then(() => {
                    setLoggingIn(false);
                })
        }
    }, [loggingIn])

    const handleAuth = async () => {
        if (email === '' || password === '') { return ToastAndroid.show("Please enter your email and password", ToastAndroid.SHORT); }
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                auth().onAuthStateChanged((user) => {
                    if (user) {
                        // console.log(user.emailVerified);
                        if (user.emailVerified) navigation.navigate('Feed');
                        else Alert.alert('Your email is not verified', "Please check your email for a verification link sent during sign up and verify this email");
                    }
                });
            })
            .catch(error => {
                Alert.alert("Error", error.message);
            });
    }

    const forgotPassword = async () => {
        if (email === '') return ToastAndroid.show("Please enter your webmail and press forgot password", ToastAndroid.SHORT);
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Password Reset", "A password reset email has been sent to your email address");
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputGrid}>
                <Text style={styles.text}>Webmail: </Text>
                <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} placeholder="name_roll@iitp.ac.in" />
            </View>
            <View style={styles.inputGrid}>
                <Text style={styles.text}>Password: </Text>
                <TextInput style={styles.input} onChangeText={(text) => setPassword(text)} secureTextEntry placeholder="Password" />
            </View>
            <Pressable android_ripple={{ color: '#9BA17B' }} style={styles.button} onPress={() => setLoggingIn(true)}>
                <Text style={styles.buttonText}>{loggingIn ? <ActivityIndicator /> : "Login"}</Text>
            </Pressable>
            <Pressable style={{ marginHorizontal: 10, paddingVertical: 5 }} android_ripple={{ color: '#615e57' }} onPress={() => forgotPassword()}><Text style={{ textAlign: "center" }}>Forgot Password?</Text></Pressable>
            <Text style={{ ...styles.lowerText, color: 'black' }}>Don't have an account?</Text><Pressable style={styles.button} android_ripple={{ color: '#615e57' }} onPress={() => navigation.navigate("Signup - Lost&Found")}><Text style={{ ...styles.lowerText, color: '#F8FFDB' }}>Create account</Text></Pressable>
        </View>
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
    lowerText: {
        marginLeft: 15,
        marginRight: 15,
        padding: 5
    },
});