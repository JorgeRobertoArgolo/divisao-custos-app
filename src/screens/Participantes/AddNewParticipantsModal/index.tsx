import { FC } from "react";
import { ActivityIndicator, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AppButton } from "@/components/AppButton";
import { colors } from "@/shared/colors";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { InputDate } from "@/components/InputDate";
import { ParticipantsRequestDTO } from "@/interfaces/participants/request/participants-request-dto";

interface Params {
    visible: boolean;
    hideModal: () => void;
    loading: boolean;
    handleAddNewParticipants: (data: ParticipantsRequestDTO) => void;
}

export const AddNewParticipantsModal: FC<Params> = ({
    hideModal,
    loading,
    visible,
    handleAddNewParticipants
}) => {

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        reset 
    } = useForm<ParticipantsRequestDTO>({
        defaultValues: {
            name: '',
        },
        resolver: yupResolver(schema),
    });
    
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
                            <View className="bg-gray-600 rounded-xl p-6 shadow-lg w-[90%] h-[225] z-9">
                                <View className="flex-row justify-between">
                                    <Text className="color-gray-100 font-inter font-semibold text-md">Novo Participante</Text>
                                    <TouchableOpacity onPress={hideModal}>
                                        <MaterialIcons name="close" size={20} color={colors.gray[300]}/>
                                    </TouchableOpacity>
                                </View>
                                
                                <View className="mt-6 mb-6 flex-1 gap-2">
                                    <Input 
                                        control={control}
                                        name='name'
                                        placeholder="Nome"
                                    />
                                    
                                </View>

                                <AppButton
                                    onPress={
                                        handleSubmit((data) => {
                                            handleAddNewParticipants(data);
                                            reset();
                                        })
                                    }
                                    disabled={isSubmitting || loading}
                                >
                                    {loading || isSubmitting ? <ActivityIndicator color={colors.white}/> : 'Salvar'}
                                </AppButton>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}