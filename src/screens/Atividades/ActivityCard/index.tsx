import { ActivityResponseDTO } from "@/interfaces/activity/response/activity-response-dto";
import { AtividadeStackParamsList } from "@/routes/PrivateRoutes";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

interface Params {
    data: ActivityResponseDTO;
}

export const ActivityCard = ({ data }: Params) => {

    const navigation = useNavigation<NavigationProp<AtividadeStackParamsList>>();

    const handleOpenDespesas = () => {
        navigation.navigate('Despesas', {
            activityId: data.id,
            activityTitle: data.title,
            activityDate: data.date
        });
    }

    return (
        <TouchableOpacity className="rounded-2xl bg-gray-700 mb-2" activeOpacity={0.8} onPress={handleOpenDespesas}>
            <View className="m-4">
                <View className="flex-row justify-between mb-3">
                    <Text className="text-gray-100 font-inter text-md font-semibold">{data.title}</Text>
                    <Text className="text-gray-200 font-inter text-sm font-medium">R$ 0,00</Text>
                </View>

                <View className="border-t border-solid border-gray-600 flex-row gap-3 justify-between pt-4">
                    <View className="flex-row">
                            <MaterialIcons name="calendar-today" size={16} color={colors.gray[400]}/>
                            <Text className="font-inter text-gray-400 text-sm ml-2">{data.date}</Text>
                    </View>
                    <View className="flex-row">
                            <MaterialIcons name="people-outline" size={16} color={colors.gray[400]}/>
                            <Text className="font-inter text-gray-400 text-sm ml-2">0 pessoas</Text>
                    </View>
                    <View className="flex-row">
                            <MaterialIcons name="attach-money" size={16} color={colors.gray[400]}/>
                            <Text className="font-inter text-gray-400 text-sm ml-2">0 despesas</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}