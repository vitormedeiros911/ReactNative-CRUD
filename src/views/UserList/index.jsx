import React, { useContext } from "react";
import { Alert, FlatList, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

import UsersContext from "../../context/UsersContext";

export default ({ navigation }) => {
  const { state, dispatch } = useContext(UsersContext);

  function confirmUserDelete(user) {
    Alert.alert("Excluir Usuário", "Deseja excluir o usuário?", [
      {
        text: "Sim",
        onPress() {
          dispatch({
            type: "deleteUser",
            //*passar o id como payload também é uma opção
            payload: user,
          });
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem bottomDivider onPress={() => navigation.navigate("UserForm")}>
        <Avatar
          title={user.name}
          source={{ uri: user.avatarUrl }}
          rounded
          size={50}
        />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          onPress={() => navigation.navigate("UserForm", user)}
          size={25}
          name="edit"
          color="orange"
        />
        <ListItem.Chevron
          onPress={() => confirmUserDelete(user)}
          size={25}
          name="delete"
          color="red"
        />
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={(user) => String(user.id)}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};
