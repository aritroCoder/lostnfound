import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
//login page 
export default function HomeScreen({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loggingIn, setLoggingIn] = React.useState(false);

    React.useEffect(() => {
        if (loggingIn){
            handleAuth()
                        .then(() => {
                            setLoggingIn(false);
                        })
        }
    }, [loggingIn])

    const handleAuth = async () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                auth().onAuthStateChanged((user) => {
                    if (user) {
                        // console.log(user.emailVerified);
                        if(user.emailVerified) navigation.navigate('Feed');
                        else Alert.alert('Your email is not verified', "Please check your email for a verification link sent during sign up and verify this email");
                    }
                  });
            })
            .catch(error => {
                Alert.alert(error.message);
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
            <Pressable android_ripple={{ color: '#3164b5' }} style={styles.button} onPress={() => setLoggingIn(true)}>
                <Text style={styles.buttonText}>{loggingIn ? <ActivityIndicator /> : "Login"}</Text>
            </Pressable>
            <Text style={{ color: 'black' }}>Don't have an account?</Text><Pressable onPress={() => navigation.navigate("Signup - Lost&Found")}><Text style={{ color: 'black' }}>Create account</Text></Pressable>
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