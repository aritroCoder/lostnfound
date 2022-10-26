import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

export default function UpdatePassword() {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Update Password</Text>
            <TextInput style={styles.input} placeholder="Current Password"/>
            <TextInput style={styles.input} secureTextEntry placeholder="New Password"/>
            <TextInput style={styles.input} secureTextEntry placeholder="Confirm New Password"/>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Update Password</Text>
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
});