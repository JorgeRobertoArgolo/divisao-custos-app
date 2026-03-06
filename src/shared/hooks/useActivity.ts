import { useCallback, useState } from "react"
import { useErrorHandler } from "./useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import { ActivityRequestDTO } from "@/interfaces/activity/request/activity-request-dto";
import * as activityService from '@/shared/services/activity.service'
import { ActivityDeleteRequestDTO } from "@/interfaces/activity/request/activity-delete-dto";
import { ActivityResponseDTO } from "@/interfaces/activity/response/activity-response-dto";

export const useActivity = () => {
    const [activities, setActivities] = useState<ActivityResponseDTO[]>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const { handleError } = useErrorHandler();
    const { notify } = useSnackbarContext();

    const addActivity = async (data: ActivityRequestDTO) => {
        setIsLoading(true);

        try {
            //Adiciona a nova tarefa a lista
            const newActivity = await activityService.createActivity(data);
            setActivities(prev => [...prev, newActivity]);

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


    const fetchActivities = useCallback( async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setIsLoading(true);
                setPage(0);
                setHasMore(true);
            } else {
                if (!hasMore || isLoadingMore) {
                    return;
                }
                setIsLoadingMore(true);
            }

            const currentPage = isRefresh ? 0 : page;
            
            const data = await activityService.getActivies(currentPage, 15);

            if (data.length < 15) {
                setHasMore(false);
            }

            if (isRefresh) {
                setActivities(data);
            } else {
                setActivities(prev => [...prev, ...data]);
            }
            setPage(currentPage + 1)
        } catch (error) {
            handleError(error, 'Erro ao carregar atividades');
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }, [page, hasMore, isLoadingMore]);


    const deleteActivity = async(data: ActivityDeleteRequestDTO) => {
        try {
            await activityService.deleteActivity(data);
            setActivities(prev => prev.filter(item => item.id !== data.id));
            notify({
                message: 'Atividade excluída!',
                messageType: 'SUCCESS',
            });
        } catch (error) {
            handleError(error, 'Error ao excluir atividade');
        }
    }

    return {
        activities,
        isLoading,
        isLoadingMore,
        addActivity,
        fetchActivities,
        deleteActivity
    }
}    