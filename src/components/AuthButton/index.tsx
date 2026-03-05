import { FC, PropsWithChildren } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import clsx from "clsx";

type AuthButtonType = 'primary' | 'secondary'

interface AuthButtonParams  extends TouchableOpacityProps{
    type?: AuthButtonType
}

export const AuthButton: FC<PropsWithChildren<AuthButtonParams>>  = ({
    children,
    type = 'primary',
    className,
    ...rest
}: AuthButtonParams) => {

    const isPrimary = type === 'primary';

    return (
        <TouchableOpacity 
            className={clsx(
                className, 
                'justify-center items-center py-3 px-4 m-1 rounded-full w-auto',
                isPrimary ? 'bg-green-base' : 'bg-gray-600'
             )}
             activeOpacity={0.8}
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