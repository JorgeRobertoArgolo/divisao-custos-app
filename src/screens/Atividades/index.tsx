import { View } from "react-native";
import { MainHeader } from "@/components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";

export const Atividades = () => {
    return (
        <SafeAreaView className="bg-gray-700 flex-1 " edges={['top']}>
            <View className="mx-6 mt-10 mb-6">
                <MainHeader />
            </View>
        </SafeAreaView>
    );
}