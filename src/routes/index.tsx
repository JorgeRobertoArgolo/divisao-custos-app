import { useCallback, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SystemBars } from 'react-native-edge-to-edge'

import { PublicRoutes } from './PublicRoutes'
import { useAuthContext } from '@/context/auth.context'
import { PrivateRoutes } from './PrivateRoutes'
import { Loading } from '@/screens/Loading'

const NavigationRoutes = () => {

    const [loading, setLoading] = useState(true);
    const { user, token } = useAuthContext();

    const Routes = useCallback(() => {
        if (loading) {
            return <Loading setLoading={setLoading} />
        }

        if (!user || !token) {
            return <PublicRoutes />
        } else {
            return <PrivateRoutes />
        }      

    }, [user, token, loading]);

    return (
        <NavigationContainer>
            <Routes />
        </NavigationContainer>

    );
}

export default NavigationRoutes;