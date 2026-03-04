import { useAuthContext } from "@/context/auth.context";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const MainHeader = () => {

    const { handleLogout } = useAuthContext();

    return (
        <View className="flex-row justify-between text-center">
            <View className="flex-row justify-center">
                <Image 
                    source={require('@/assets/Logo.png')}
                    className="h-[20px] w-[20px] mr-2"
                />
                <Text className="font-sora text-lg-heading font-bold text-green-base">TaskCost</Text>
                <Text className="font-sora text-lg-heading font-normal text-green-light">Split</Text>
            </View>
            <TouchableOpacity onPress={handleLogout}>
                <MaterialIcons name="logout" color={colors.white} size={20}/>
            </TouchableOpacity>
        </View>
    );
}