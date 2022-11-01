import * as React from 'react';
import { Text, StyleSheet, ScrollView, View, ActivityIndicator, RefreshControl } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Custom Components
import MyFeedItem from '../utils/MyFeedItem';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function MyPosts() {
    const [posts, setPosts] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [fetching, setFetching] = React.useState(false);

    let uid;
    React.useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                uid = user.uid;
                getPosts();
            }
        })
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getPosts().then(() => setRefreshing(false));
    }, []);

    const getPosts = async () => {
        setFetching(true);
        try {
            firestore()
                .collection('lostPosts')
                .get()
                .then((querySnapshot) => {
                    const posts = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        // console.log(documentSnapshot.data());
                        if (documentSnapshot.data().uid === uid) {
                            posts.push({
                                details: documentSnapshot.data().details,
                                name: documentSnapshot.data().name,
                                item: documentSnapshot.data().item,
                                location: documentSnapshot.data().location,
                                phone: documentSnapshot.data().phone,
                                uid: documentSnapshot.data().uid,
                                date: documentSnapshot.data().date.toDate().toString(),
                                found: documentSnapshot.data().found,
                                opened: documentSnapshot.data().opened,
                                id: documentSnapshot.id,
                            });
                        }
                    });
                    firestore()
                        .collection('foundPosts')
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((documentSnapshot) => {
                                if (documentSnapshot.data().uid === uid) {
                                    posts.push({
                                        details: documentSnapshot.data().details,
                                        name: documentSnapshot.data().name,
                                        item: documentSnapshot.data().item,
                                        location: documentSnapshot.data().location,
                                        phone: documentSnapshot.data().phone,
                                        uid: documentSnapshot.data().uid,
                                        date: documentSnapshot.data().date.toDate().toString(),
                                        found: documentSnapshot.data().found,
                                        opened: documentSnapshot.data().opened,
                                        id: documentSnapshot.id,
                                    });
                                }
                            });
                            setPosts(posts);
                            setFetching(false);

                        })
                })
        } catch (err) {
            Alert.alert(err.message);
            setFetching(false);
        }
    }

    return (
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }>
            <Text style={styles.title}>My Posts</Text>

            {!fetching ? (
                posts &&
                posts.map((post, index) => {
                    return (
                        <MyFeedItem
                            details={post.details}
                            location={post.location}
                            date={post.date}
                            item={post.item}
                            name={post.name}
                            phone={post.phone}
                            key={index}
                            uid={post.uid}
                            id={post.id}
                            getPosts={getPosts}
                            found={post.found}
                            opened={post.opened}
                        />
                    );
                })
            ) : (
                <View>
                    <ActivityIndicator />
                </View>
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2d0'
    },
    title: {
        color: 'black',
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    }
});