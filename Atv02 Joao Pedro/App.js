import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';

const campeoesMarvel = [
  { id: '1', nome: 'Homem de Ferro', imagem: 'https://tm.ibxk.com.br/2024/12/13/13184034529078.jpg', descricao: 'Gênio, bilionário, playboy, filantropo.' },
  { id: '2', nome: 'Capitão América', imagem: 'https://criticalhits.com.br/wp-content/uploads/2024/12/marvel-rivals-characters-captain.webp', descricao: 'O super soldado com escudo indestrutível.' },
  { id: '3', nome: 'Viúva Negra', imagem: 'https://newr7-r7-prod.web.arc-cdn.net/resizer/v2/PXXQO3JZLRDMNIF26BPLSRLNPU.jpeg?auth=9afa3c4b797f0b5e3902f5d20dc04ce9be69356a274ecbd6267c33dd058e325f&width=1244&height=700', descricao: 'Espiã mortal e mestra em combate corpo a corpo.' },
  { id: '4', nome: 'Thor', imagem: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/marvel-rivals-thor-how-to-play.jpg', descricao: 'Deus do Trovão de Asgard.' },
  { id: '5', nome: 'Hulk', imagem: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/12/image-30-168.jpg', descricao: 'Força bruta e raiva incontrolável.' },
  { id: '6', nome: 'Feiticeira Escarlate', imagem: 'https://cdn.selectgame.net/wp-content/uploads/2024/12/Wanda-em-Marvel-Rivals-capa-001.webp', descricao: 'Controle de magia e realidade.' },
  { id: '7', nome: 'Pantera Negra', imagem: 'https://insider-gaming.com/br/wp-content/uploads/sites/2/2024/12/black-panter-trophy-marvel-rivals.jpg', descricao: 'Rei de Wakanda e guerreiro ágil.' },
  { id: '8', nome: 'Homem-Aranha', imagem: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/12/image-30-201.jpg', descricao: 'O amigo da vizinhança.' },
  { id: '9', nome: 'Doutor Estranho', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdT3umDDi6k7OLeWKlJ3jFauWwGRMawEnGw&s', descricao: 'Mestre das artes místicas.' }
];

export default function App() {
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [campeaoSelecionado, setCampeaoSelecionado] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCarregando(false);
    }, 200);
  }, []);

  useEffect(() => {
    if (busca.trim() === '') {
      setCarregando(false);
      return;
    }
  
    setCarregando(true); 
  
    const timeout = setTimeout(() => {
      setCarregando(false); 
    }, 20);
  
    return () => clearTimeout(timeout);
  }, [busca]);

  const filtrarCampeoes = campeoesMarvel.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirDetalhes = (campeao) => {
    setCampeaoSelecionado(campeao);
    setModalVisible(true);
  };

  const mostrarAlerta = () => {
    if(Platform.OS === "web"){
      window.alert("Isso é um alerta de marvel rivals")
    }
    else{
      Alert.alert('Isso é um alerta de marvel rivals')
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}> Campeões do Marvel Rivals</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar campeão..."
        value={busca}
        onChangeText={setBusca}
      />

      <Button title="Mostrar Alerta" onPress={mostrarAlerta} />

      {carregando ? (
        <ActivityIndicator size="large" color="#FF0000" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filtrarCampeoes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <TouchableOpacity style={styles.card} onPress={() => abrirDetalhes(item)}>
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
              <Text style={styles.nome}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {campeaoSelecionado && (
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitulo}>{campeaoSelecionado.nome}</Text>
              <Image source={{ uri: campeaoSelecionado.imagem }} style={styles.imagemModal} />
              <Text style={styles.modalDescricao}>{campeaoSelecionado.descricao}</Text>
              <Button title="Fechar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  nome: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagemModal: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  modalDescricao: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
