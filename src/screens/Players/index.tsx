import { useState } from "react";
import { FlatList } from "react-native";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";

export function Players() {
    const [team, setTeam] = useState('time a')
    const [players, setPLayers] = useState([`teste`, `jose`])

    return(
        <Container>
            <Header showBackButton/>
            <Highlight
                title="Nome da turma"
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome do participante"
                    autoCorrect={false}
                />

                <ButtonIcon icon="add" type="PRIMARY"/>
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

                <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
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
            />


            <Button
                title="Remover turma"
                type="SECONDARY"
            />
        </Container>
    )
}