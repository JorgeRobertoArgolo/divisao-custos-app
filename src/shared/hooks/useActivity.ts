import { useState } from "react"
import { useErrorHandler } from "./useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import { ActivityRequestDTO } from "@/interfaces/activity/request/activity-request-dto";
import * as activityService from '@/shared/services/activity.service'

export const useActivity = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { handleError } = useErrorHandler();
    const { notify } = useSnackbarContext();

    const addActivity = async (data: ActivityRequestDTO) => {
        setIsLoading(true);

        try {
            
            await activityService.createActivity(data);

            notify({
                message: 'Atividade criada com sucesso!',
                messageType: 'SUCCESS'
            });
            //Retorna true para fechar o modal
            return true;
        } catch (error) {
            handleError(error, 'Erro ao criar atividade. Tente novamente!');
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        addActivity
    }
}    