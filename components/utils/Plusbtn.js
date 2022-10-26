import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Plusbtn = (props) => {
    return (
        <Pressable onPress={()=>props.navigator.navigate('Post for Lost Item')} android_ripple={{ color: '#A64B2A' }} style={{ ...styles.plus, top: '80%' }}>
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

export default Plusbtn