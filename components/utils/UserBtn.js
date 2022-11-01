import React from 'react';
import {
    Text,
    StyleSheet,
    Image
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import auth from '@react-native-firebase/auth';

const UserBtn = (props) => {
    const [image, setImage] = React.useState(null);

    React.useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setImage(user.photoURL);
                console.log(user);
            }
        })
    }, [])
    const handleClick=()=>{
        props.navigator.navigate('User Feed');
    }
    return (
        <Pressable onPress={()=>handleClick()} android_ripple={{ color: '#A64B2A' }} style={{ ...styles.plus, top: '70%' }}>
            <Image style={{borderRadius: 25}} source={{ uri: image, width: 50, height: 50 }}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    plus: {
        // flex: 1,
        position: 'absolute',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#FFD369',
        height: 50,
        width: 50,
        borderRadius: 25,
        border: 6,
        borderColor: '#000',
        // bottom: 30,
        right: 30,
        zIndex: 5
    },
    text: {
        color: '#000',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 50,
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default UserBtn;