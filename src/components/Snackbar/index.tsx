import { useSnackbarContext } from "@/context/snackbar.context";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const Snackbar = () => {
    
    const { message, type } = useSnackbarContext();

    if (!message || !type) {
        return (
            <></>
        );
    }

    const isSuccess = type === 'SUCCESS';
    const bgColor = isSuccess ? "bg-green-base" : "bg-danger-light";
    const iconName = isSuccess ? "check-circle-outline" : "error-outline";
    
    return (
        <View className={`absolute bottom-10 self-center w-[90%] min-h-[50px] rounded-xl flex-row items-center border-[1px] px-4 py-3 z-50 shadow-md ${bgColor} mb-10`}>
            <MaterialIcons color={colors.white} name={iconName} size={24}/>
            <Text className="text-white text-sm font-medium font-inter ml-3 flex-1 leading-5">
                {message}
            </Text>
        </View>
    );
}