import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const EmptyList = () => {
    return(
        <View className="flex-1 text-center justify-center items-center">
            <MaterialIcons 
                name="list" 
                size={35} 
                color={colors.gray[400]}
            />
            <Text 
                className="text-gray-400 font-sm font-normal font-inter mt-4"
            >
                Você ainda não tem atividades criadas
            </Text>
        </View>
    );
}