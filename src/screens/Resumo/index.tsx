import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Resumo = () => {
    return (
        <SafeAreaView className="bg-gray-800 flex-1 " edges={['top']}>
            <View className="flex-1 items-center justify-center">
                <Text className="text-white">Tela de Resumo</Text>
            </View>
        </SafeAreaView>
    );
}