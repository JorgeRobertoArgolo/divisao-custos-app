import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthButton } from "@/components/AuthButton";
import { colors } from "@/shared/colors";

export const ParticipantesEmptyList = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <MaterialIcons name='people-outline' size={24} color={colors.gray[400]}/>
            
            <Text className="my-4 color-gray-400 font-inter font-md">
                Você ainda não adicionou participantes em atividades
            </Text>
        </View>
    );
}