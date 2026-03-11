import { FC, PropsWithChildren } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import clsx from "clsx";

type AppButtonType = 'primary' | 'secondary'

interface AppButtonParams  extends TouchableOpacityProps{
    type?: AppButtonType
}

export const AppButton: FC<PropsWithChildren<AppButtonParams>>  = ({
    children,
    type = 'primary',
    className,
    ...rest
}: AppButtonParams) => {

    const isPrimary = type === 'primary';

    return (
        <TouchableOpacity 
            className={clsx(
                className, 
                'justify-center items-center py-3 px-4 m-1 rounded-full w-auto',
                isPrimary ? 'bg-green-base' : 'bg-gray-700'
             )}
             activeOpacity={0.7}
             {...rest}
        >
            <Text className={clsx(
                "text-md font-inter font-semibold ", 
                isPrimary ? 'color-gray-800' : 'color-gray-200'
            )}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}