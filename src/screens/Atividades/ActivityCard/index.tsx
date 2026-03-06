import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const ActivityCard = () => {
    return (
        <View className="rounded-2xl bg-gray-700 mb-2">
            <View className="m-4">
                <View className="flex-row justify-between mb-3">
                    <Text className="text-gray-100 font-inter text-md font-semibold">Férias de verão</Text>
                    <Text className="text-gray-200 font-inter text-sm font-medium">R$ 4.500,00</Text>
                </View>

                <View className="border-t border-solid border-gray-600 flex-row gap-3 justify-between pt-4">
                    <View className="flex-row">
                            <MaterialIcons name="calendar-today" size={16} color={colors.gray[400]}/>
                            <Text className="font-inter text-gray-400 text-sm ml-2">15/02/26</Text>
                    </View>
                    <View className="flex-row">
                            <MaterialIcons name="people-outline" size={16} color={colors.gray[400]}/>
                            <Text className="font-inter text-gray-400 text-sm ml-2">4 pessoas</Text>
                    </View>
                    <View className="flex-row">
                            <MaterialIcons name="attach-money" size={16} color={colors.gray[400]}/>
                            <Text className="font-inter text-gray-400 text-sm ml-2">2 despesas</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}