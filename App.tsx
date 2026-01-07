import { SafeAreaView } from "react-native";
import TestPlace from "./src/screens/Test/TestPlace";
import ModalTest from "./src/screens/Test/ModalTest";
import SignupScreen from "@/screens/Auth/SignupScreen.tsx";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TestPlace />
        </SafeAreaView>
    );
}
