import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";

import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";

type RouteParams = {
    group: string   
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('time a')
    const [players, setPLayers] = useState<PlayerStorageDTO[]>([])

    const newPlayerNameInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();
    const route = useRoute();
    const { group } = route.params as RouteParams

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar');
        }

        const newPlayer = {
            name: newPlayerName,
            team: team
        };

        try {

            await playerAddByGroup(newPlayer, group);
            await fetchPlayersByTeam();

            newPlayerNameInputRef.current?.blur();
            setNewPlayerName('');
            
        } catch (error) {
            if ( error instanceof AppError) {
                Alert.alert('Nova Pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova Pessoa', 'Não foi possível adicionar');
            }
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            await fetchPlayersByTeam()
        } catch (error) {
            console.log(error)
            Alert.alert('Remover pessoa', 'Não foi possível remover a pessoa selecionada');
        }
    }

    function handleRemoveGroup(){
        Alert.alert(
            'Remover turma',
            'Deseja remover a turma ?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: removeGroup}
            ]
        )
    }

    async function removeGroup() {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.log(error)
            Alert.alert('Remover turma', 'Não foi possível remover a turma');
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const players = await playersGetByGroupAndTeam(group, team);
            setPLayers(players);
        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas pelo time selecionado');
        }
    }

    useEffect(() => {
        fetchPlayersByTeam()
    }, [team])

    return(
        <Container>
            <Header showBackButton/>
            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef = {newPlayerNameInputRef}
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    placeholder="Nome do participante"
                    autoCorrect={false}
                    returnKeyType="done"
                />

                <ButtonIcon icon="add" type="PRIMARY" onPress={handleAddPlayer}/>
            </Form>

            <HeaderList>
                <FlatList
                    data={['time a', 'time b']}
                    keyExtractor={(item)=> item}
                    renderItem={({item}) => (
                        <Filter 
                            title={item}
                            isActive={team === item}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />

                <NumberOfPlayers>{players.length}</NumberOfPlayers>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard 
                        name={item.name} 
                        onRemove={() => handleRemovePlayer(item.name)}
                    />
                )}
                ListEmptyComponent={()=> (
                    <ListEmpty
                        message="Não há pessoas nesse time"  
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && {flex:1}
                ]}
            />

            <Button
                title="Remover turma"
                type="SECONDARY"
                onPress={handleRemoveGroup}
            />
        </Container>
    )
}