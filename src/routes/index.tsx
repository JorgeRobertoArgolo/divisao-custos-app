import { useCallback, useState } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { SystemBars } from 'react-native-edge-to-edge'

import { PublicRoutes } from './PublicRoutes'
import { useAuthContext } from '@/context/auth.context'
import { PrivateRoutes } from './PrivateRoutes'
import { Loading } from '@/screens/Loading'
import { colors } from '@/shared/colors'

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.gray[700], 
    },
};

const NavigationRoutes = () => {

    const [loading, setLoading] = useState(true);
    const { user, token } = useAuthContext();
    
    if (loading) {
        return <Loading setLoading={setLoading} />
    }

    return (
        <NavigationContainer theme={AppTheme}>
            <SystemBars style="light" />
            {(!user || !token) ? (
                <PublicRoutes />
            ) : (
                <PrivateRoutes />
            )}
        </NavigationContainer>

    );
}

export default NavigationRoutes;