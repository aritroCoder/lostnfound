import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function UpdatePassword({ navigation }) {
    const handleLogOut = async () => {
        auth()
            .signOut()
            .then(() => {
                Alert.alert("Logged Out", "You have been logged out successfully");
                navigation.navigate("Login - Lost&Found");
            });
    }

    const handlePasswordReset = async () => {
        auth()
            .sendPasswordResetEmail(auth().currentUser.email)
            .then(() => {
                Alert.alert("Password Reset", "A password reset email has been sent to your email address");
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Password / Log Out</Text>
            <Pressable style={styles.button} android_ripple={{ color: '#54514a'}} onPress={()=>handlePasswordReset()}>
                <Text style={styles.buttonText}>Update Password</Text>
            </Pressable>
            <Pressable style={styles.Logout} android_ripple={{ color: '#5c0303' }} onPress={()=>handleLogOut()}>
                <Text style={styles.logOutText}>Log Out</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#000000',
    },
    Logout: {
        marginTop: 15,
        backgroundColor: '#ff0000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    logOutText: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    }
});