import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Plusbtn = (props) => {
    const handleClick=()=>{
        if(props.found) props.navigator.navigate('Post for Found Item');
        else props.navigator.navigate('Post for Lost Item');
    }
    return (
        <Pressable onPress={()=>handleClick()} android_ripple={{ color: '#9BA17B' }} style={{ ...styles.plus, top: '80%' }}>
            <Text style={styles.text}>+</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    plus: {
        // flex: 1,
        position: 'absolute',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#61764B',
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
        color: '#F8FFDB',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 50,
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default Plusbtn