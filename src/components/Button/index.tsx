import { TouchableOpacity, Text } from "react-native"
import { styles } from "./style"

export function Button() {
    return(
        <TouchableOpacity style={styles.container}>
            <Text style={styles.title}>
                Adicionar
            </Text>
        </TouchableOpacity>
    )
}