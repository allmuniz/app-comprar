import { TouchableOpacity, TouchableHighlightProps, Text } from "react-native"
import { styles } from "./style"

type Props = TouchableHighlightProps & {
    title: string
}

export function Button({title, ...rest}: Props) {
    return(
        <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}