import { AppButton } from "@/components/AppButton";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DespesasEmptyList } from "./EmptyList";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AtividadeStackParamsList } from "@/routes/PrivateRoutes";
import { formatDate } from "@/shared/utils/date-mapper";
import { useActivity } from "@/shared/hooks/useActivity";
import { ActivityUpdateRequestDTO } from "@/interfaces/activity/request/activity-update-request-dto";
import { useState } from "react";
import { UpdateAtividadeModal } from "./UpdateAtividadeModal";
import { ActivityRequestDTO } from "@/interfaces/activity/request/activity-request-dto";

type DespesasRouteProp = RouteProp<AtividadeStackParamsList, 'Despesas'>;

export const Despesas = () => {

    const navigation = useNavigation<NavigationProp<AtividadeStackParamsList>>();

    const route = useRoute<DespesasRouteProp>();
    const { activityDate, activityId, activityTitle } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const { updateActivity, isLoading, deleteActivity } = useActivity();

    const handleUpdateActivity = async (data: ActivityRequestDTO) => {
        const updateData: ActivityUpdateRequestDTO = {
            id: activityId,
            title: data.title,
            date: data.date,
        }
        const result = await updateActivity(updateData);
        if (result) {
            navigation.setParams({
                activityTitle: data.title,
                activityDate: data.date.toISOString(),
            });
            hideModal();
        }
    }

    const handleDeleteActivity = async () => {
        const result = await deleteActivity({id: activityId});
        if (result) {
            hideModal();
            navigation.goBack();
        }
    }

    return (
        <SafeAreaView className="bg-gray-800 flex-1 " edges={['top']}>
            <View className="flex-1 mx-6 mt-10 mb-6">
                <View className="flex-row justify-between">
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="flex-row items-center mb-3"
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons  name="arrow-back" color={colors["green-light"]} size={16}/>
                            <Text className="text-green-light text-md">Voltar</Text>
                        </TouchableOpacity>
                        
                        <View>
                            <Text className="text-gray-100 font-inter text-lg-heading font-semibold mb-1">
                                {activityTitle}
                            </Text>
                            <View className="flex-row">
                                <MaterialIcons name="calendar-today" size={16} color={colors.gray[300]} />
                                <Text className="ml-2 text-sm font-inter text-gray-300">{formatDate(new Date(activityDate))}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity 
                        className="items-center justify-center gap-3 rounded-full border border-solid border-gray-500 bg-gray-600 h-16 w-16"
                        onPress={() => showModal()}    
                    >
                        <MaterialIcons name="mode-edit-outline" size={24} color={colors.gray[300]} />
                    </TouchableOpacity>
                </View>

                <DespesasEmptyList />

            </View>

            <UpdateAtividadeModal 
                handleUpdateActivity={handleUpdateActivity}
                handleDeleteActivity={handleDeleteActivity}
                hideModal={hideModal}
                loading={isLoading}
                visible={modalVisible}
                initialTitle={activityTitle}
                initialDate={activityDate}
            />
        </SafeAreaView>
    );
}