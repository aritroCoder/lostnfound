import React from 'react';
import {
    Text,
    StyleSheet,
    Image
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const UserBtn = (props) => {
    const handleClick=()=>{
        props.navigator.navigate('User Feed');
    }
    return (
        <Pressable onPress={()=>handleClick()} android_ripple={{ color: '#A64B2A' }} style={{ ...styles.plus, top: '70%' }}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', width: 50, height: 50 }}/>
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