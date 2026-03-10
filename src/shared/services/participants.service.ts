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

export const getParticipants = async (page: number, limit: number): Promise<ParticipantsResponseDTO[]> => {
    
    /**
     * Cálculo de paginação
     * 0 -> 0 ao 14
     * 1 -> 15 ao 29
     */
    const from = page * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase.from('participants').select('*').order('created_at', {ascending: false}).range(from, to);
    
    if (error) {
        throw new Error(error.message);
    }

    return data;
}