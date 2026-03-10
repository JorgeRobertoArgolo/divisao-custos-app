import { ParticipantsResponseDTO } from "@/interfaces/participants/response/participants-response-dto";
import { Text, View } from "react-native";

interface Params {
    data: ParticipantsResponseDTO;
}

export const ParticipantsCard = ({ data }: Params) => {
    return (
        <View className="flex-row p-3 bg-gray-700 border border-solid border-gray-800 rounded-2xl mb-1">
            <View className="p-3 bg-gray-500 rounded-full mr-4">
                <Text className="font-semibold text-white">{data.name[0].toUpperCase()}{data.name[1].toUpperCase()}</Text>
            </View>
            <View>
                <Text className="font-semibold text-gray-100 text-md font-inter">{data.name}</Text>
                <Text className="text-gray-400 font-inter text-sm">Em 0 atividades</Text>
            </View>
        </View>
    );
}