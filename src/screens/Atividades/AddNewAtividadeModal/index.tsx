import { FC } from "react";
import { ActivityIndicator, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthButton } from "@/components/AuthButton";
import { colors } from "@/shared/colors";

interface Params {
    visible: boolean;
    hideModal: () => void;
    handleAddNewAtividade: () => void;
    loading: boolean;
}

export const AddNewAtividadeModal: FC<Params> = ({
    handleAddNewAtividade,
    hideModal,
    loading,
    visible
}) => {
    
    return (
        <View className="flex-1 absolute">
            <Modal
                animationType="slide"
                transparent
                visible={visible}
                onRequestClose={hideModal}
            >
                <TouchableWithoutFeedback onPress={hideModal}>
                    <View className="flex-1 items-center justify-center bg-black/70">
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View className="m-5 bg-gray-600 rounded-xl p-6 shadow-lg w-[90%] h-[272] z-9">
                                <View className="flex-row justify-between">
                                    <Text className="color-gray-100 font-inter font-semibold text-md">Nova Atividade</Text>
                                    <TouchableOpacity onPress={hideModal}>
                                        <MaterialIcons name="close" size={20} color={colors.gray[300]}/>
                                    </TouchableOpacity>
                                </View>
                                
                                <View>
                                    
                                </View>

                                <AuthButton
                                    onPress={handleAddNewAtividade}
                                >
                                    {loading ? <ActivityIndicator /> : 'Salvar'}
                                </AuthButton>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}