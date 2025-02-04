import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Container } from './styles';
  
import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players', { group });
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll()
      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turmas');
    }
  }

  useFocusEffect(useCallback(()=> {
    fetchGroups()
  }, []));

  return (
    <Container>
      <Header/>
      <Highlight
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      <FlatList
        data={groups}
        keyExtractor={(item) => item }
        renderItem={({item})=> (
          <GroupCard
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => <ListEmpty message='Que tal adicionar uma nova turma ?' />}
        showsVerticalScrollIndicator={false}
      />

      <Button title='Criar nova turma' onPress={handleNewGroup}/>
    </Container>
  );
}
