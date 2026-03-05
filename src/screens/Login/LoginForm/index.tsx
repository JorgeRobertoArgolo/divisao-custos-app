import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@/components/Input";
import { schema } from "./schema";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthHeader } from "@/components/AuthHeader";
import { AuthButton } from '@/components/AuthButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PublicStackParamsList } from '@/routes/PublicRoutes';
import { UserLoginRequestDTO } from '@/interfaces/auth/request/user-login-request-dto';
import { useAuthContext } from '@/context/auth.context';
import { colors } from '@/shared/colors';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

export const LoginForm = () => {
    
    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<UserLoginRequestDTO>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schema),
    });

    const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

    const { handleAuthenticate } = useAuthContext();
    
    const { handleError } = useErrorHandler();
    
    const onSubmit = async(userData: UserLoginRequestDTO) => {
        try {
            await handleAuthenticate(userData);
        } catch (error) {
            handleError(error, 'Erro ao autenticar.Verifique suas credenciais');
        }
    }
    
    return (
        <SafeAreaView className="bg-gray-700 flex-1" edges={['top']}>
            <AuthHeader minSize='min-h-[400px]'/>

            <View className="flex-1 mx-8">
                
                <Text className="font-inter color-gray-100 text-center mt-10 mb-8 text-lg-label font-semibold">
                    Entre no app
                </Text>
                
                <View className="gap-3">
                    <Input 
                        control={control}
                        name="email"
                        placeholder="mail@example.com"
                        leftIconName="mail-outline"
                    />  

                    <Input 
                        control={control}
                        name="password"
                        placeholder="Sua senha"
                        leftIconName="lock-outline"
                        secureTextEntry
                    />
                </View>

                <AuthButton className='my-8' onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
                    {
                        isSubmitting ? <ActivityIndicator color={colors.white} /> : 'Login'
                    }
                </AuthButton>

                <View className='border-t-gray-600 border-t w-auto mx-8' />
                
                <Text className='text-center justify-center color-gray-200 font-inter text-sm mt-8 mb-4'>
                    Ainda não tem cadastro ?
                </Text>

                <AuthButton className='mb-10' type='secondary' onPress={() => navigation.navigate('Register')}>
                    Criar Conta
                </AuthButton>
            </View> 
        </SafeAreaView> 
    );
} 