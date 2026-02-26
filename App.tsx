import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./src/styles/global.css"
import NavigationRoutes from "@/routes";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <NavigationRoutes />
    </GestureHandlerRootView>
  );
}
