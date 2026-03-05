import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDate } from "@/shared/utils/date-mapper";
import { colors } from "@/shared/colors";

export const InputDate = () => {
    
    const [date, setDate] = useState<Date | undefined>(undefined);    
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const onCancel = () => {
        setShowDatePicker(false);
    }

    const onConfirm = (dateValue: Date) => {
        setShowDatePicker(false);
        setDate(dateValue);
    }

    return (
        <View className="bg-gray-800">
            <TouchableOpacity
                activeOpacity={0.8}
                className={`flex-row items-center border-solid border-[1px] h-16 py-2 px-3 rounded-lg`}
                onPress={() => setShowDatePicker(true)}
            >
                <MaterialIcons 
                    name="calendar-today"
                    size={20}
                    color={colors.gray[300]}
                />
                <Text className="ml-3 text-lg text-gray-200">
                    {formatDate(date)|| 'Data'}
                </Text>
            </TouchableOpacity>

            <DateTimePicker
                isVisible={showDatePicker}
                date={date}
                onCancel={onCancel}
                onConfirm={onConfirm}
                mode="date"
                confirmTextIOS="Confirmar"
                cancelTextIOS="Cancelar"
                locale="pt_BR"
            />
        </View>
    );
}