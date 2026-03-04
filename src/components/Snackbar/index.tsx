import { useSnackbarContext } from "@/context/snackbar.context";
import { colors } from "@/shared/colors";
import { Text, View } from "react-native";

export const Snackbar = () => {
    
    const { message, type } = useSnackbarContext();

    if (!message || !type) {
        return (
            <></>
        );
    }

    const bgColor = type === 'SUCCESS' ? "bg-green-base" : "bg-danger-low";
    
    return (
        <View className={`absolute bottom-10 self-center w-[80%] h-[50px] rounded-xl justify-center z-10 p-2 ${bgColor}`}>
            <Text className="text-white text-sm font-medium font-inter">
                {message}
            </Text>
        </View>
    );
}