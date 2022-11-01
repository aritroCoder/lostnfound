import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  View,
  RefreshControl
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// Custom Components
import FeedItem from '../utils/FeedItem';
import PlusBtn from '../../components/utils/Plusbtn';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import UserBtn from '../../components/utils/UserBtn';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function LostFeed({ navigation }) {
  const [posts, setPosts] = React.useState([]);
  const [fetching, setFetching] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts().then(() => setRefreshing(false));
  }, []);

  const getPosts = async () => {
    setFetching(true);
    try {
      firestore()
        .collection('foundPosts')
        .get()
        .then((querySnapshot) => {
          const posts = [];
          querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.data().opened) {
              posts.push({
                details: documentSnapshot.data().details,
                name: documentSnapshot.data().name,
                item: documentSnapshot.data().item,
                location: documentSnapshot.data().location,
                phone: documentSnapshot.data().phone,
                email: documentSnapshot.data().email,
                uid: documentSnapshot.data().uid,
                date: documentSnapshot.data().date.toDate().toString(),
                id: documentSnapshot.id,
              });
            }
          });
          setPosts(posts);
          setFetching(false);
        });
    } catch (err) {
      Alert.alert(err.message);
      setFetching(false);
    }
  }

  React.useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <PlusBtn navigator={navigation} found={true} />
      <UserBtn navigator={navigation} />
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <Text style={styles.title}>Found Feed</Text>

        {!fetching ? (
          posts &&
          posts.map((post, index) => {
            return (
              <FeedItem
                details={post.details}
                location={post.location}
                date={post.date}
                item={post.item}
                name={post.name}
                phone={post.phone}
                key={index}
                email={post.email}
                uid={post.uid}
                id={post.id}
                getPosts={getPosts}
                found={true}
              />
            );
          })
        ) : (
          <View>
            <ActivityIndicator />
          </View>
        )}

        {posts.length === 0 ? (
          <View>
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No posts found
            </Text>
            <Pressable
              style={{ marginLeft: '30%', width: '40%', padding: 10 }}
              android_ripple={{ color: '#2b2a24' }}
              onPress={() => getPosts()}>
              <Text style={{ textAlign: 'center' }}>Reload...</Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2d0'
  },
  title: {
    color: '#61764B',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
});
