import { useState } from "react";
import { Alert, FlatList } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";

type RouteParams = {
    group: string   
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('time a')
    const [players, setPLayers] = useState([])

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
            
        } catch (error) {
            if ( error instanceof AppError) {
                Alert.alert('Nova Pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova Pessoa', 'Não foi possível adicionar');
            }
        }
    }

    return(
        <Container>
            <Header showBackButton/>
            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    placeholder="Nome do participante"
                    autoCorrect={false}
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
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <PlayerCard 
                        name={item} 
                        onRemove={() => {}}
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
            />
        </Container>
    )
}