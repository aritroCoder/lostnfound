import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';

export default function PostforLostItem() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Post for Found Item</Text>

            <View style={styles.inputGrid}>
                <Text>Enter Your Name: </Text>
                <TextInput style={styles.input} placeholder="Name" />
            </View>
            <View style={styles.inputGrid}>
                <Text>Phone Number: </Text>
                <TextInput style={styles.input} keyboardType="phone-pad" placeholder="Phone" />
            </View>
            <View style={styles.inputGrid}>
                <Text>Location of finding: </Text>
                <TextInput style={styles.input} placeholder="Where lost" />
            </View>
            <View style={styles.inputGrid}>
                <Text>Any Details: </Text>
                <TextInput style={styles.multiLineImput} multiline placeholder="Message" />
            </View>

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Post</Text>
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
});