import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, Alert } from 'react-native';
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { Game, GamePlatform } from './types';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

const BASE_URL = 'http://192.168.1.103:8080';

const mapSelectValue = (games: Game[]) => {
  return games.map(game => ({
    ...game,
    label: game.title,
    value: game.id
  }));
}

const placeholder = {
  label: 'Selecione o game',
  value: null
}

const CreateRecord = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [platform, setPlatform] = useState<GamePlatform>();
  const [selectedGame, setSelectedGame] = useState('');
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGamesGames] = useState<Game[]>([]);
  
  const handleChangePlatform = (selectedPlatform: GamePlatform) => {
    setPlatform(selectedPlatform);
    const gamesByPlatform = allGames.filter(game => game.platform === selectedPlatform);
    setFilteredGamesGames(gamesByPlatform);
  }

  const handleSubmit = () => {
    const payload = { name, age, gameId: selectedGame };
    axios.post(`${BASE_URL}/records`, payload).then(() => {
      Alert.alert('Dados salvos com sucesso!');
      setName('');
      setAge('');
      setSelectedGame('');
      setPlatform(undefined);
    }).catch(() => {
      Alert.alert('Erro ao cadastrar os dados!')
    })
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/games`).then(response => {
      const selectValue = mapSelectValue(response.data)
      setAllGames(selectValue);
    }).catch(() => {
      Alert.alert('Erro ao listar os jogos!')
    })
  }, []);

  return (
      <>
          <Header />
          <View style={styles.container}>
            <TextInput style={styles.inputText}
                placeholder="Nome"
                placeholderTextColor="#9e9e9e"
                onChangeText={text => setName(text)}
                value={name}/>
            <TextInput style={styles.inputText}
                keyboardType="numeric"
                maxLength={3}
                placeholder="Idade"
                placeholderTextColor="#9e9e9e"
                onChangeText={text => setAge(text)}
                value={age}/>
            <View style={styles.platformContainer}>
                <PlatformCard activePlatform={platform} platform="PC" icon="laptop"
                onChange={handleChangePlatform} />
                <PlatformCard activePlatform={platform} platform="XBOX" icon="xbox"
                onChange={handleChangePlatform} />
                <PlatformCard activePlatform={platform} platform="PLAYSTATION" icon="playstation"
                onChange={handleChangePlatform} />
            </View>
            <RNPickerSelect 
              onValueChange={value => {setSelectedGame(value)}}
              placeholder={placeholder}
              value={selectedGame}
              items = {filteredGames}
              style={pickerSelectStyle}
              Icon={() => {
                return <Icon name="chevron-down" color="#9e9e9e" size={25} />
              }}
            />
            <View style={styles.footer}>
              <RectButton style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Salvar</Text>
              </RectButton>
            </View>
          </View>
      </>
    );
}

const pickerSelectStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  placeholder: {
    color: '#9E9E9E',
    fontSize: 16,
    fontFamily: "Play_700Bold",
  },
  iconContainer: {
    top: 10,
    right: 12,
  }
});


const styles = StyleSheet.create({
    container: {
      marginTop: '15%',
      paddingRight: '5%',
      paddingLeft: '5%',
      paddingBottom: 50
    },
    inputText: {
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      fontFamily: "Play_700Bold",
      fontSize: 16,
      paddingLeft: 20,
      marginBottom: 21
    },
    platformContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footer: {
      marginTop: '15%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#00D4FF',
      flexDirection: 'row',
      borderRadius: 10,
      height: 60,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      fontFamily: "Play_700Bold",
      fontWeight: 'bold',
      fontSize: 18,
      color: '#0B1F34',
    }
  });

export default CreateRecord;