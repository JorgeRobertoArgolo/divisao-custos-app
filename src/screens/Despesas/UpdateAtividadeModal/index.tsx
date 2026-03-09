import { FC, useEffect } from "react";
import { ActivityIndicator, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthButton } from "@/components/AuthButton";
import { colors } from "@/shared/colors";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { InputDate } from "@/components/InputDate";
import { ActivityRequestDTO } from "@/interfaces/activity/request/activity-request-dto";

interface Params {
    visible: boolean;
    hideModal: () => void;
    loading: boolean;
    handleUpdateActivity: (data: ActivityRequestDTO) => void;
    initialTitle: string;
    initialDate: string;
}

export const UpdateAtividadeModal: FC<Params> = ({
    hideModal,
    loading,
    visible,
    handleUpdateActivity,
    initialTitle,
    initialDate
}) => {

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        reset 
    } = useForm<ActivityRequestDTO>({
        defaultValues: {
            title: initialTitle,
            date: new Date(initialDate),
        },
        resolver: yupResolver(schema),
    });
    
    useEffect(() => {
        if (visible) {
            reset({
                title: initialTitle,
                date: new Date(initialDate)
            });
        }
    }, [visible, initialTitle, initialDate, reset]);

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
                                    <Text className="color-gray-100 font-inter font-semibold text-md">Editar Atividade</Text>
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

                                <AuthButton
                                    onPress={
                                        handleSubmit((data) => {
                                            handleUpdateActivity(data);
                                        })
                                    }
                                    disabled={isSubmitting || loading}
                                >
                                    {loading || isSubmitting ? <ActivityIndicator color={colors.white}/> : 'Salvar'}
                                </AuthButton>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}