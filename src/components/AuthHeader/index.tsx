import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";
import { Image, View } from "react-native";

export const AuthHeader = () => {

    const isKeyboardVisible = useKeyboardVisible();

    if (isKeyboardVisible) {
        return (
            <></>
        );
    }

    return (
        <View className="items-center justify-center w-full min-h-[305px] bg-gray-800">
            <Image 
                source={require('@/assets/Logo.png')}
                className="h-[64px] w-[64px]"
            />
        </View>
    );
}