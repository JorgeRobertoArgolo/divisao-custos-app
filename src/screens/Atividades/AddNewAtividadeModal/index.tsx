import { FC } from "react";
import { ActivityIndicator, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AppButton } from "@/components/AppButton";
import { colors } from "@/shared/colors";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { ActivityRequestDTO } from "@/interfaces/activity/request/activity-request-dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { InputDate } from "@/components/InputDate";

interface Params {
    visible: boolean;
    hideModal: () => void;
    loading: boolean;
    handleAddNewActivity: (data: ActivityRequestDTO) => void;
}

export const AddNewAtividadeModal: FC<Params> = ({
    hideModal,
    loading,
    visible,
    handleAddNewActivity
}) => {

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        reset 
    } = useForm<ActivityRequestDTO>({
        defaultValues: {
            title: '',
            date: new Date(),
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
                            <View className="bg-gray-600 rounded-xl p-6 shadow-lg w-[90%] h-[272] z-9">
                                <View className="flex-row justify-between">
                                    <Text className="color-gray-100 font-inter font-semibold text-md">Nova Atividade</Text>
                                    <TouchableOpacity onPress={hideModal}>
                                        <MaterialIcons name="close" size={20} color={colors.gray[300]}/>
                                    </TouchableOpacity>
                                </View>
                                
                                <View className="mt-6 mb-6 flex-1 gap-2">
                                    <Input 
                                        control={control}
                                        name='title'
                                        placeholder="Título"
                                    />
                                    
                                    <InputDate 
                                        control={control}
                                        name="date"
                                    />
                                </View>

                                <AppButton
                                    onPress={
                                        handleSubmit((data) => {
                                            handleAddNewActivity(data);
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