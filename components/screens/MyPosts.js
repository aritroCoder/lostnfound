import * as React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

// Custom Components
import FeedItem from '../utils/FeedItem';

export default function MyPosts() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>My Posts</Text>

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