import React, { useEffect, useState } from 'react'

import { View, StyleSheet, TextInput, Switch, Image, Text, Alert, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { RectButton } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

import Logo from '../assets/Logo.png'
import fonts from '../styles/fonts'
import colors from '../styles/colors'
import axios from 'axios'

interface UsersProps {
    id: number;
    name: string;
    email: string;
    password: number;
    photo: string;  
}

export function Login(){

    const navigation = useNavigation()

    const [inputValueEmail, setInputValueEmail] = useState('')
    const [inputValuePassword, setInputValuePassword] = useState('')
    const [isFocusedEmail, setIsFocusedEmail] = useState(false)
    const [isFocusedPassword, setIsFocusedPassword] = useState(false)

    const [isRemember, setIsRemember ] = useState(false)

    const [users, setUsers] = useState<UsersProps []>([])

    function handleInputBlur(typeInput: string) {
        if(typeInput === 'email'){
            setIsFocusedEmail(false);
        }else if(typeInput === 'password'){
            setIsFocusedPassword(false);
        } 
      }
    
      function handleInputFocus(typeInput: string) {
        if(typeInput === 'email'){
            setIsFocusedEmail(true);
        }else if(typeInput === 'password'){
            setIsFocusedPassword(true);
        } 
      }

      function handleInputChange(value: string, typeInput: string) {
        if(typeInput === 'email'){
            setInputValueEmail(value);
        }else if (typeInput === 'password'){
            setInputValuePassword(value);
        }
      }

    function getUsers (){
        axios({
            method: 'GET',
            url: 'http://10.0.0.106:3333/users'
        })
            .then(response => setUsers(response.data))
            .catch(e => console.log(e))
    }

    function newUser(){
        axios({
            method: 'POST',
            url: 'http://10.0.0.106:3333/users',
            data: {
                id: 2,
                name: "José",
                password: 54321,
                email: "josesilva@hotmail.com",
                photo: "https://avatars.githubusercontent.com/u/61130843?v=4"
            }
        })
            .then(response => console.log(response.data))
            .catch(e => console.log(e))
    }

    function validateLogin(email: string, password: string){
        try {
           const userValidate = users.find(item => item.email === email && String(item.password) === password)
           

           if(userValidate) {
               if(!isRemember) {
                   setInputValueEmail('') 
                   setInputValuePassword('')
                }

               navigation.navigate('Home')
            }else {
                Alert.alert("Oop's","Email ou senha inválidos 😪")
            }
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getUsers ()
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={Logo}/>
            </View>
                <View style={styles.inputContainer}>
                    <Ionicons name='mail' size={24} color={(isFocusedEmail || inputValueEmail) ? colors.green300 : colors.gray300}/>
                    <TextInput 
                        style={styles.input}
                        keyboardType='email-address'
                        value={inputValueEmail}
                        onChangeText={text => handleInputChange(text, 'email')}
                        onFocus={() => handleInputFocus('email')}
                        onBlur={() => handleInputBlur('email')}
                        
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name='lock-closed' size={24} color={(isFocusedPassword || inputValuePassword) ? colors.green300 : colors.gray300}/>
                    <TextInput 
                        style={styles.input}
                        keyboardType={'numbers-and-punctuation'}
                        value={inputValuePassword}
                        secureTextEntry={true}
                        onChangeText={text => handleInputChange(text, 'password')}
                        onFocus={() => handleInputFocus('password')}
                        onBlur={() => handleInputBlur('password')}
                    />
                </View>
                
                <View style={styles.switchContainer}>
                    <Switch
                        trackColor={{false: colors.gray300, true: colors.green300}}
                        thumbColor={isRemember ? colors.green400 : colors.gray50} 
                        value={isRemember}
                        onValueChange={() => setIsRemember(!isRemember)}
                    />
                    <Pressable onPress={() => setIsRemember(!isRemember)}>
                        <Text style={isRemember ? styles.switchTextActive : styles.switchText}>Lembrar-me</Text>
                    </Pressable>
                </View>

                <RectButton style={styles.button} onPress={() => validateLogin(inputValueEmail, inputValuePassword)}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>

                <RectButton>
                    <Text style={styles.register}>Registrar</Text>
                </RectButton>
                
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    content: {
        alignItems: 'center',
    },
    register: {
        textAlign: 'center',
        fontFamily: fonts.poppinsRegular,
        color: colors.green400,
        marginTop: 20,
    },
    backgroudGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 300
      },
    title: {
        fontFamily: fonts.poppinsBold,
    },
    inputContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: colors.gray400,
        borderBottomWidth: 1,
        color: colors.gray500,
        marginTop: 20,

    },
    input: {
       width: '90%',
       color: colors.gray800,
       fontFamily: fonts.poppinsRegular,
       marginLeft: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 15,
    },
    switchText: {
        fontFamily: fonts.poppinsRegular,
        color: colors.gray400
    },
    switchTextActive: {
        fontFamily: fonts.poppinsRegular,
        color: colors.green400
    },
    button: {
        backgroundColor: colors.blue400,
        padding: 10,
        borderRadius: 4,
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: fonts.poppinsRegular,
        color: colors.white,
        fontSize: 15
    }
})