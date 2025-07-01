import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { CircleCheck } from "lucide-react-native";

import { styles } from "./style";
import { FilterStatus } from "@/types/FilterStatus";

type Props = TouchableOpacityProps & {
    status: FilterStatus,
    isActive: boolean
}

export function Filter({status, isActive, ...rest}: Props) {
    return(
        <TouchableOpacity 
            {...rest} 
            style={[styles.container, {opacity: isActive ? 1 : 0.5 }]}
            activeOpacity={0.8}
        >
            <CircleCheck/>
            <Text style={styles.title}>
                {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
            </Text>
        </TouchableOpacity>
    )
}