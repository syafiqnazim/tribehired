import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Card from '../components/card';

const Homepage = ({ navigation }) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setPosts(json))
      .catch(err => console.log('Request Failed', err));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card posts={posts} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homepage;
