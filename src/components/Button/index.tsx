import { TouchableOpacity, Text } from "react-native"
import { styles } from "./style"

type Props = {
    title: string
}

export function Button(props: Props) {
    return(
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Text style={styles.title}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}