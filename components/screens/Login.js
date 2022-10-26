import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../configs/firebase.config';

//login page 
export default function HomeScreen({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loggingIn, setLoggingIn] = React.useState(false);

    const handleAuth = async () => {
        try {
            setLoggingIn(true);
            const auth = getAuth(app);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            onAuthStateChanged(auth, (user) => {
                if (user && user.emailVerified) {
                    // Alert.alert('Logged In', 'You have been logged in successfully');
                    navigation.navigate("Lost Feed");
                } else {
                    Alert.alert('Error', 'There was an error logging you in. Check if you have created your account and verified email');
                }
            });
        } catch (error) {
            console.log(error);
            Alert.alert('Error', error.message);
        }
        setLoggingIn(false);
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
            <Pressable style={styles.button} onPress={() => handleAuth()}>
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