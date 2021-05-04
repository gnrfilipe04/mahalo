import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar } from 'react-native-paper'
import Logo from '../assets/Logo.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface StoreProps {
    id: number;
    name: string;
    email: string;
    password: number;
    photo: string;  
}

export function Home(){
    const [stores, setStores] = useState<StoreProps []>()

    function getStores (){
        axios({
            method: 'GET',
            url: 'http://10.0.0.106:3333/stores',
        })
            .then(response => setStores(response.data))
            .catch(e => console.log(e))
    }

    useEffect(() => {
        getStores()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name='chevron-back'size={24} color={colors.gray500}/>
                <Avatar.Image size={48} source={Logo}/>
            </View>
            <ScrollView style={styles.containerList}>
                {stores?.map(item => (
                    <View style={styles.cardContainer}>
                        <Ionicons name='cart' size={28} style={styles.icon}/>
                        <View>
                            <Text style={styles.cardText}>{item.name}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {    
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: colors.white,
        
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    containerList: {
        flex: 1,
        position: 'relative',
        maxHeight: 500,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray300,
        marginTop: 10,
        padding: 15,
        borderRadius: 30,
        
    },
    icon: {
        backgroundColor: colors.white,
        padding: 15,
        position: 'absolute',
        borderRadius: 40,
        borderColor: colors.gray300,
        borderWidth: 1,
    },
    cardText: {
        fontFamily: fonts.poppinsRegular,
        color: colors.gray800,
        marginLeft: 60,
    }
})