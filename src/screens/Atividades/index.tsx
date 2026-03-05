import { Text, View } from "react-native";
import { MainHeader } from "@/components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyList } from "./EmptyList";
import { FloatingButton } from "@/components/FloatingButton";
import { useState } from "react";
import { AddNewAtividadeModal } from "./AddNewAtividadeModal";

export const Atividades = () => {

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const handleAddNewAtividade = () => {}

    return (
        <SafeAreaView className="bg-gray-700 flex-1 " edges={['top']}>
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
                <EmptyList />
                
                <FloatingButton iconName="add" onPress={() => showModal()}>
                    Criar
                </FloatingButton>
            </View>

            <AddNewAtividadeModal 
                handleAddNewAtividade={handleAddNewAtividade}
                hideModal={hideModal}
                loading={loading}
                visible={modalVisible}   
            />
        </SafeAreaView>
    );
}