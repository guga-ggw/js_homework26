import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { firstNames, lastNames } from './data';

const App = () => {
  const [filter, setFilter] = useState('')
  const [filteredNames, setFilteredNames] = useState([])

  useEffect(() => {
    const filteredNames = firstNames
      .filter(firstName => {
        const lastName = lastNames[firstNames.indexOf(firstName)];
        return (
          firstName.toLowerCase().includes(filter.toLowerCase()) ||
          lastName.toLowerCase().includes(filter.toLowerCase())
        );
      })
      .map(firstName => {
        const lastName = lastNames[firstNames.indexOf(firstName)];
        return `${firstName} ${lastName}`
      });

    setFilteredNames(filteredNames);
  }, [filter]);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Filter Names"
        onChangeText={text => setFilter(text)}
        value={filter}
        style={{ borderWidth: 1, width: 200, margin: 10, padding: 5 }}
      />
      <ScrollView style={{ flex: 1 }}>
        {filteredNames.map((name, index) => (
          <Text key={index}>{name}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
