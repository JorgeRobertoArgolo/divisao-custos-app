import { ParticipantsResponseDTO } from "@/interfaces/participants/response/participants-response-dto"
import { useRef, useState } from "react"
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

    const addParticipants = async (data: ParticipantsRequestDTO) => {
        setIsLoading(true);

        try {
            await participantsService.createParticipants(data);

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
    }
}