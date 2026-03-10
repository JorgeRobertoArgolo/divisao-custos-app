import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParticipantesEmptyList } from "./ParticipantesEmptyList";
import { MainHeader } from "@/components/MainHeader";
import { FloatingButton } from "@/components/FloatingButton";
import { useCallback, useEffect, useState } from "react";
import { useParticipants } from "@/shared/hooks/useParticipants";
import { ParticipantsRequestDTO } from "@/interfaces/participants/request/participants-request-dto";
import { AddNewParticipantsModal } from "./AddNewParticipantsModal";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "@/shared/colors";
import { ParticipantsCard } from "./ParticipantsCard";

export const Participantes = () => {

    const [modalVisible, setModalVisible] = useState(false);
        
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const { isLoading, addParticipants, fetchParticipants, participants, isLoadingMore } = useParticipants();

    useEffect(() => {
        fetchParticipants(true);
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchParticipants(true);
        }, [])
    );

    const handleSaveParticipants = async (data: ParticipantsRequestDTO) => {
        const result = await addParticipants(data);

        if (result) {
            hideModal();
        }
    }

    return (
        <SafeAreaView className="bg-gray-800 flex-1 " edges={['top']}>
            <View className="flex-1 mx-6 mt-10 mb-6">
                <MainHeader />

                <View className="mt-4 mb-4">
                    
                    <Text 
                        className="color-gray-100 text-lg-heading font-semibold font-inter"
                    >
                        Participantes
                    </Text>
                    
                    <Text className="color-gray-300 font-inter text-md font-normal">
                        Pessoas com quem você já dividiu tarefas
                    </Text>
                </View>

                <FlatList 
                    contentContainerStyle={{flexGrow: 1}}
                    showsVerticalScrollIndicator={false}
                    data={participants}
                    keyExtractor={({id}) => `participants-${id}`}
                    renderItem={({item}) => <ParticipantsCard data={item} />}
                    ListEmptyComponent={<ParticipantesEmptyList />}
                    onEndReached={() => fetchParticipants()}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={
                        isLoadingMore ? <ActivityIndicator color={colors["green-base"]} className="my-4" size={"small"} /> : null
                    }
                />

                <FloatingButton iconName="add" onPress={() => showModal()}>
                    Criar
                </FloatingButton>
            </View>

            <AddNewParticipantsModal 
                handleAddNewParticipants={handleSaveParticipants}
                hideModal={hideModal}
                loading={isLoading}
                visible={modalVisible}   
            />
        </SafeAreaView>
    );
}