import React, { useContext, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import UsersContext from "../../context/UsersContext";

import styles from "./style";

export default ({ route, navigation }) => {
  const [user, setUser] = useState(route.params ? route.params : {});
  const { dispatch } = useContext(UsersContext);

  return (
    <View style={styles.form}>
      <Text>Name</Text>
      <TextInput
        onChangeText={(name) => setUser({ ...user, name })}
        placeholder="Informe o Nome"
        value={user.name}
        style={styles.input}
      />
      <Text>E-mail</Text>
      <TextInput
        onChangeText={(email) => setUser({ ...user, email })}
        placeholder="Informe o E-mail"
        value={user.email}
        style={styles.input}
      />
      <Text>URL do Avatar</Text>
      <TextInput
        onChangeText={(avatarUrl) => setUser({ ...user, avatarUrl })}
        placeholder="Informe a URL do Avatar"
        value={user.avatarUrl}
        style={styles.input}
      />
      <Button
        title="Salvar"
        onPress={() => {
          dispatch({
            type: user.id ? "updateUser" : "createUser",
            payload: user,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};
