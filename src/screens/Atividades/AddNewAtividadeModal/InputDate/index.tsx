import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDate } from "@/shared/utils/date-mapper";
import { colors } from "@/shared/colors";
import { Control, Controller } from "react-hook-form";
import clsx from "clsx";

interface Params {
    control: Control<any>;
    name: string;
}

export const InputDate = ({ control, name }: Params) => {
    
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <Controller 
            control={control}
            name={name}
            render={({ field: { onChange, value}}) => {
                return (
                    <View className="bg-gray-800">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className={`flex-row items-center border-solid border-[1px] border-gray-800 h-16 py-2 px-3 rounded-lg`}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <MaterialIcons 
                                name="calendar-today"
                                size={20}
                                color={colors.gray[300]}
                            />
                            <Text className={clsx(
                                "ml-3 text-md font-normal font-inter", value ? 'text-gray-200' : 'text-gray-400 ')
                            }>
                                {value ? formatDate(value) : 'Selecione uma data'}
                            </Text>
                        </TouchableOpacity>

                        <DateTimePicker
                            isVisible={showDatePicker}
                            date={value || new Date()}
                            onCancel={() => setShowDatePicker(false)}
                            onConfirm={( dateValue ) => {
                                setShowDatePicker(false);
                                onChange(dateValue);
                            }}
                            mode="date"
                            confirmTextIOS="Confirmar"
                            cancelTextIOS="Cancelar"
                            locale="pt_BR"
                        />
                    </View>
                );
            }}
        />
    );
}