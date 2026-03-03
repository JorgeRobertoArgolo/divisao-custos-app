import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./src/styles/global.css"
import NavigationRoutes from "@/routes";
import { AuthContextProvider } from "@/context/auth.context";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <AuthContextProvider>
        <NavigationRoutes />
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
