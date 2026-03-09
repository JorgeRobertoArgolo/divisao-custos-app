import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { MainHeader } from "@/components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyList } from "./EmptyList";
import { FloatingButton } from "@/components/FloatingButton";
import { useCallback, useEffect, useState } from "react";
import { AddNewAtividadeModal } from "./AddNewAtividadeModal";
import { useActivity } from "@/shared/hooks/useActivity";
import { ActivityRequestDTO } from "@/interfaces/activity/request/activity-request-dto";
import { ActivityCard } from "./ActivityCard";
import { colors } from "@/shared/colors";
import { useFocusEffect } from "@react-navigation/native";

export const Atividades = () => {

    const [modalVisible, setModalVisible] = useState(false);
    
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const { isLoading, addActivity, fetchActivities, activities, isLoadingMore  } = useActivity();

    //Busca atividades, assim que abre a tela
    useEffect(() => {
        //Define o refresh com true, para retorna a página 0
        fetchActivities(true);
    }, []);

    useFocusEffect(
        useCallback(() => {
            // Dispara o refresh sempre que o usuário "entrar" ou "voltar" para essa tela
            fetchActivities(true);
        }, [])
    )

    const handleSaveActivity = async (data: ActivityRequestDTO) => {
        const result = await addActivity(data);
        
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
                        Atividades
                    </Text>
                    
                    <Text className="color-gray-300 font-inter text-md font-normal">
                        Organize suas despesas divididas
                    </Text>
                </View>
                
                <FlatList
                    contentContainerStyle={{ flexGrow: 1}}
                    showsVerticalScrollIndicator={false}
                    data={activities}
                    keyExtractor={({id}) => `activity-${id}`}
                    renderItem={({item}) => <ActivityCard data={item} />}
                    ListEmptyComponent={<EmptyList />}
                    onEndReached={() => fetchActivities()}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={
                        isLoadingMore ? <ActivityIndicator color={colors["green-base"]} className="my-4" size={"small"} /> : null
                    }
                />
                
                <FloatingButton iconName="add" onPress={() => showModal()}>
                    Criar
                </FloatingButton>
            </View>

            <AddNewAtividadeModal 
                handleAddNewActivity={handleSaveActivity}
                hideModal={hideModal}
                loading={isLoading}
                visible={modalVisible}   
            />
        </SafeAreaView>
    );
}