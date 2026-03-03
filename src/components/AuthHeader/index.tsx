import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";
import clsx from "clsx";
import { Image, View } from "react-native";

type AuthHeaderSize = 'min-h-[330px]' | 'min-h-[400px]';

interface AuthHeaderProps {
    minSize?: AuthHeaderSize
}

export const AuthHeader = ({
    minSize = 'min-h-[330px]'
}: AuthHeaderProps) => {

    const isKeyboardVisible = useKeyboardVisible();

    if (isKeyboardVisible) {
        return (
            <></>
        );
    }

    return (
        <View className={clsx(`${minSize}`, 'items-center justify-center w-full bg-gray-800')}>
            <Image 
                source={require('@/assets/Logo.png')}
                className="h-[64px] w-[64px]"
            />
        </View>
    );
}