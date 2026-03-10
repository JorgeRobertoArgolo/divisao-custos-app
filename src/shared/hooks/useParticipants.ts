import { ParticipantsResponseDTO } from "@/interfaces/participants/response/participants-response-dto"
import { useCallback, useRef, useState } from "react"
import { useErrorHandler } from "./useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import { ParticipantsRequestDTO } from "@/interfaces/participants/request/participants-request-dto";
import * as participantsService from '@/shared/services/participants.service';


export const useParticipants = () => {
    const [participants, setParticipants] = useState<ParticipantsResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState<boolean>(true)

    const isFetchingRef = useRef<boolean>(false);

    const { handleError } = useErrorHandler();
    const { notify } = useSnackbarContext();

    const fetchParticipants = useCallback( async (isRefresh = false) => {
        
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

            const data = await participantsService.getParticipants(currentPage, 15);

            if (data.length < 15) {
                setHasMore(false);
            }

            if (isRefresh) {
                setParticipants(data);
            } else {
                setParticipants(prev => [...prev, ...data]);
            }
            setPage(currentPage + 1);
        } catch (error) {
            handleError(error, 'Erro ao carregar participantes')
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
            isFetchingRef.current= false;
        }

    }, [page, hasMore]);

    const addParticipants = async (data: ParticipantsRequestDTO) => {
        setIsLoading(true);

        try {
            await participantsService.createParticipants(data);

            await fetchParticipants(true);

            notify({
                message: 'Participante criado com sucesso!',
                messageType: 'SUCCESS',
            });

            return true;
        } catch (error) {
            handleError(error, 'Erro ao criar participante. Tente novamente!');
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        participants,
        isLoading,
        isLoadingMore,
        addParticipants,
        fetchParticipants
    }
}