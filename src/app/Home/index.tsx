import { View, Image, TouchableOpacity, Text, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { Item } from "@/components/Item";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];


export function Home(){

  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd(){
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status:FilterStatus.PENDING
    }

    await itemsStorage.add(newItem);
    await itemsByStatus()

    Alert.alert("Adicionado", `Adicionado ${description}`)
    setFilter(FilterStatus.PENDING)
    setDescription("")
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);

    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Não foi possivel buscar os itens")
    }
  }

  async function handleRemove(id:string) {
    try {
      await itemsStorage.remove(id)
      await itemsByStatus()

    } catch (error) {
      console.log(error)
      Alert.alert("Remover", "Não foi possivel remover o item")
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos?", [
      {text: "Não", style: "cancel"},
      {text:"Sim", onPress: () => onClear()}
    ])
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([])

    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possivel remover os itens");
    }
  }

  useEffect(() => {
    itemsByStatus()
  }, [filter])

  return(
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}/>

      <View style={styles.form}>
        <Input 
          placeholder="O que você precisa comprar"
          onChangeText={setDescription}
          value={description}
        />
        <Button 
          title="Adicionar"
          onPress={handleAdd}
        />
      </View>

      <View style={styles.content}>

        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (
              <Filter 
                key={status} 
                status={status} 
                isActive = {status === filter}
                onPress={() => setFilter(status)}
              />
            ))
          }

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>

        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item na lista</Text>
          )}
          renderItem={({item}) => (
            <Item 
              data={item} 
              onRemove={ () => handleRemove(item.id)} 
              onStatus={ () => console.log("Alterar o status do " + item.description) }
            />
          )}
        />

      </View>
    </View>
  )
}

