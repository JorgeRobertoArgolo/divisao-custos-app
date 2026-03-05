import { FC, PropsWithChildren } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from "@/shared/colors";
import clsx from "clsx";

interface Props extends TouchableOpacityProps{
    iconName?: keyof typeof MaterialIcons.glyphMap;
}

export const FloatingButton: FC<PropsWithChildren<Props>> = ({
    children,
    iconName,
    className,
    ...rest
}) => {
    return (
        <TouchableOpacity
            className={
                clsx(className, 'gap-2 pt-3 pb-3 pr-4 pl-4 justify-center items-center absolute right-0 bottom-0 rounded-full border border-solid border-green-base bg-green-base flex-row shadow-xl shadow-black/80 elevation-lg')
            }
            activeOpacity={0.8}
            {...rest}
        >
            {iconName && (
                <MaterialIcons name={iconName} size={24} color={colors.gray[800]} />
            )}
            <Text className="text-gray-800 font-inter text-md font-semibold">
                {children}
            </Text>
        </TouchableOpacity>
    );
}