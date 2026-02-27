import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from '@/shared/colors';
import { useRef, useState } from 'react';
import clsx from "clsx";
import { ErrorMessage } from '../ErrorMessage';

interface InputParams<T extends FieldValues> extends TextInputProps {
    control: Control<T>;
    name: Path<T>;
    leftIconName?: keyof typeof MaterialIcons.glyphMap;
}

export const Input = <T extends FieldValues> ({
    control,
    name,
    leftIconName,
    secureTextEntry,
    ...rest
}: InputParams<T>) => {

    const [isFocused, setIsFocused] = useState(false);

    const [showText, setShowText] = useState(secureTextEntry);

    const inputRef = useRef<TextInput>(null);

    const checkFocus = () => {
        if (inputRef.current) {
            setIsFocused(inputRef.current.isFocused());
        }
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) =>{
                return (
                    <View 
                        className='bg-gray-800 mx-8' 
                    >
                        <TouchableOpacity 
                            className={clsx(`flex-row justify-between items-center border-solid border-[1px] h-16 py-2 px-3 rounded-lg`, isFocused ? 'border-white/90' : 'border-gray-800')}
                            activeOpacity={0.8}
                        >
                            {
                                leftIconName && (
                                    <MaterialIcons 
                                        name={leftIconName} 
                                        size={20} 
                                        color={colors.gray[200]}
                                        className='ml-4 mr-3'
                                    />
                                )   
                            }
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                className='flex-1 text-base text-white '
                                placeholderTextColor={colors.gray[400]}
                                {...rest}
                                ref={inputRef}
                                onFocus={checkFocus}
                                onEndEditing={checkFocus}
                                secureTextEntry={showText}
                            />
                            {
                                secureTextEntry && (
                                    <TouchableOpacity
                                        onPress={
                                            () => setShowText((value) => !value)
                                        }
                                    >
                                        <MaterialIcons 
                                            name={showText ? 'visibility' : 'visibility-off'}
                                            color={colors.gray[400]}
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        </TouchableOpacity>
                        {
                            error && (
                                <ErrorMessage>
                                    {error.message}
                                </ErrorMessage>
                            )
                        }
                    </View>
                );
            }}
        
        />
    );
}