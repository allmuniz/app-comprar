import { TextInput, TextInputProps } from "react-native";
import { styles } from "./style";

export function Input({...rest}: TextInputProps) {
    return(
       <TextInput {...rest} style={styles.container}/>
    )
}