import { supabase } from '@/lib/supabase'
import { ActivityRequestDTO } from '@/interfaces/activity/request/activity-request-dto';

export const createActivity = async (data: ActivityRequestDTO): Promise<void> => {
    const { error } = await supabase.from('activities').insert({
        title: data.title,
        date: data.date.toISOString(),
    });

    if (error) {
        throw new Error(error.message);
    }
}