import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./src/styles/global.css"
import NavigationRoutes from "@/routes";
import { AuthContextProvider } from "@/context/auth.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";
import { Snackbar } from "@/components/Snackbar";
import { colors } from "@/shared/colors";

export default function App() {
  return (
    <GestureHandlerRootView style={{
      flex: 1,
      backgroundColor: colors.gray[700],
    }}>
      <SnackbarContextProvider>
        <AuthContextProvider>
          <NavigationRoutes />
          <Snackbar />
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  );
}
