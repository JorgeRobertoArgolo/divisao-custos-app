import { useCallback, useRef, useState } from "react"
import { useErrorHandler } from "./useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import { ActivityRequestDTO } from "@/interfaces/activity/request/activity-request-dto";
import * as activityService from '@/shared/services/activity.service'
import { ActivityDeleteRequestDTO } from "@/interfaces/activity/request/activity-delete-dto";
import { ActivityResponseDTO } from "@/interfaces/activity/response/activity-response-dto";
import { ActivityUpdateRequestDTO } from "@/interfaces/activity/request/activity-update-request-dto";

export const useActivity = () => {
    const [activities, setActivities] = useState<ActivityResponseDTO[]>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const isFetchingRef = useRef(false);

    const { handleError } = useErrorHandler();
    const { notify } = useSnackbarContext();

    const fetchActivities = useCallback( async (isRefresh = false) => {

        if (isFetchingRef.current) {
            return;
        }

        try {

            isFetchingRef.current = true;

            if (isRefresh) {
                setIsLoading(true);
                setPage(0);
                setHasMore(true);
            } else {
                if (!hasMore || isLoadingMore || isLoading) {
                    isFetchingRef.current = false;
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
            isFetchingRef.current = false;
        }
    }, [page, hasMore]);

    const addActivity = async (data: ActivityRequestDTO) => {
        setIsLoading(true);

        try {
            await activityService.createActivity(data);
            //Recarrega página
            await fetchActivities(true);

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

    const updateActivity = async (data: ActivityUpdateRequestDTO) => {
        setIsLoading(true);

        try {
            await activityService.updateActivity(data);
            //Recarrega página
            await fetchActivities(true);

            notify({
                message: 'Atividade atualizada com sucesso com sucesso!',
                messageType: 'SUCCESS'
            });
            //Retorna true para fechar o modal
            return true;
        } catch (error) {
            handleError(error, 'Erro ao atualizar atividade. Tente novamente!');
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteActivity = async(data: ActivityDeleteRequestDTO) => {
        try {
            await activityService.deleteActivity(data);

            await fetchActivities(true);

            notify({
                message: 'Atividade excluída!',
                messageType: 'SUCCESS',
            });

            return true;
        } catch (error) {
            handleError(error, 'Error ao excluir atividade');
            return false;
        }
    }

    return {
        activities,
        isLoading,
        isLoadingMore,
        addActivity,
        fetchActivities,
        deleteActivity,
        updateActivity,
    }
}    