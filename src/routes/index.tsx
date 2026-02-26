import { useCallback, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SystemBars } from 'react-native-edge-to-edge'

import { PublicRoutes } from './PublicRoutes'
//Falta criar e importar o contexto
//Criar o loading

const NavigationRoutes = () => {

    const Routes = useCallback(() => {
        return <PublicRoutes />
    }, []);

    return (
        <NavigationContainer>
            <SystemBars style={'light'} />
            <Routes />
        </NavigationContainer>

    );
}

export default NavigationRoutes;