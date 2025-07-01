import { View, Image } from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { styles } from "./styles";

export function Home(){
  return(
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}/>
      <Input placeholder="O que você precisa comprar"/>
      <Button title="Adicionar"/>
    </View>
  )
}

