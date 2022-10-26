import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import {collection, getDocs} from 'firebase/firestore';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

// Custom Components
import FeedItem from '../utils/FeedItem';
import PlusBtn from '../../components/utils/Plusbtn';
import {db} from '../../configs/firebase.config';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export default function LostFeed({navigation}) {
  const [posts, setPosts] = React.useState([]);
  const [fetching, setFetching] = React.useState(false);

  //get current user
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) {
      uid = user.uid;
    } else {
      // No user is signed in.
    }
  });

  const getData = async () => {
    console.log('fetching posts...');
    setFetching(true);
    try {
      const lostCollectionRef = collection(db, 'lostPosts');
      const docSnap = await getDocs(lostCollectionRef);
      console.log('fetched posts');
      let tempPosts = [];
      docSnap.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        tempPosts.push({...doc.data(), id: doc.id});
      });
      setPosts(tempPosts);

      setFetching(false);
    } catch (err) {
      console.log(err);
      getData();
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PlusBtn navigator={navigation} />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Lost Feed</Text>

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
                uid={post.user}
                id={post.id}
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
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No posts found
            </Text>
            <Pressable
              style={{marginLeft: '30%', width: '40%', padding: 10}}
              android_ripple={{color: '#2b2a24'}}
              onPress={() => getData()}>
              <Text style={{textAlign: 'center'}}>Reload...</Text>
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
  },
  title: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
});
