import { supabase } from '@/lib/supabase'
import { ActivityRequestDTO } from '@/interfaces/activity/request/activity-request-dto';
import { ActivityUpdateRequestDTO } from '@/interfaces/activity/request/activity-update-request-dto';
import { ActivityDeleteRequestDTO } from '@/interfaces/activity/request/activity-delete-dto';
import { ActivityResponseDTO } from '@/interfaces/activity/response/activity-response-dto';

export const createActivity = async (data: ActivityRequestDTO): Promise<ActivityResponseDTO> => {
    const { data: newActivity, error } = await supabase.from('activities').insert({
        title: data.title,
        date: data.date.toISOString(),
    }).select().single();

    if (error) {
        throw new Error(error.message);
    }

    return newActivity;
}

export const getActivies = async (page: number, limit: number = 15): Promise<ActivityResponseDTO[]> => {
    /**
     * Cálculo de paginação
     * 0 -> 0 ao 14
     * 1 -> 15 ao 29
     */
    const from = page * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase.from('activities').select('*').order('created_at', {ascending: false}).range(from, to);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export const updateActivity = async (data: ActivityUpdateRequestDTO) => {
    const { error } = await supabase.from('activities').update({
        title: data.title,
        date: data.date.toISOString(),
    }).eq('id', data.id);

    if (error) {
        throw new Error(error.message);
    }
}

export const deleteActivity = async (data: ActivityDeleteRequestDTO) => {
    const { error} = await supabase.from('activities').delete().eq('id', data.id);
    if (error) {
        throw new Error (error.message);
    }
}