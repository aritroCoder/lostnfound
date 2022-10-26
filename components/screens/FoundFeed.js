import * as React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

// Custom components
import FeedItem from '../utils/FeedItem';

export default function LostFeed() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Lost Feed</Text>

            <FeedItem/>
            <FeedItem/>
            <FeedItem/>
            <FeedItem/>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: 'black',
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    }
});