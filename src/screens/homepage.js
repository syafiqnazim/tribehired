import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Card from '../components/card';
import axios from 'axios';

const Homepage = ({ navigation }) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchAPI() {
      try {
        let response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
        );
        setPosts(response.data);
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchAPI();
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
