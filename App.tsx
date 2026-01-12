import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import TestPlace from "./src/screens/Test/TestPlace";

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <TestPlace />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
