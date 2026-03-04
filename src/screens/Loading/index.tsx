import { FC, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image } from 'react-native';
import { colors } from "@/shared/colors";
import { useAuthContext } from "@/context/auth.context";

interface Props {
    setLoading: (value: boolean) => void;
}
//@/assets/Logo.png
export const Loading: FC<Props> = ({ setLoading }) => {
    
    const { restoreUserSession, handleLogout } = useAuthContext();

    const initSession = async () => {
        try {
            await restoreUserSession();            
        } catch (error) {
            await handleLogout();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        initSession();
    }, []);

    return (
        <SafeAreaView className='flex-1 items-center justify-center w-full bg-gray-800'>
            <Image 
                source={require('@/assets/Logo.png')}
                className="h-[120px] w-[120px]"
            />
            <ActivityIndicator color={colors.white} className="mt-20"/>
        </SafeAreaView>
    );
}