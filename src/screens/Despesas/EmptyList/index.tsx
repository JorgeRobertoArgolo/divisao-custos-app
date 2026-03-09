import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthButton } from "@/components/AuthButton";
import { colors } from "@/shared/colors";

export const DespesasEmptyList = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <MaterialIcons name='pie-chart-outline' size={24} color={colors.gray[400]}/>
            
            <Text className="my-4 color-gray-400 font-inter font-md">
                Para começar a dividir, registre uma despesa
            </Text>
            
            <AuthButton>
                Nova Despesa
            </AuthButton>
        </View>
    );
}