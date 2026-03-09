import { supabase } from "@/lib/supabase";
import { ParticipantsRequestDTO } from "@/interfaces/participants/request/participants-request-dto";
import { ParticipantsResponseDTO } from "@/interfaces/participants/response/participants-response-dto";

export const createParticipants = async (data: ParticipantsRequestDTO): Promise<ParticipantsResponseDTO> => {
    const { data: newParticipants, error } = await supabase.from('participants').insert({
        name: data.name,
    }).select().single();

    if (error) {
        throw new Error(error.message);
    }

    return newParticipants;
}