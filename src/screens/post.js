import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

import Loading from '../components/loading';
import Comment from '../components/comment';
import { getImage, getName, capitalizeFirstLetter } from '../helpers';

const Post = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [searchAtt, setSearchAtt] = useState();
  const [searchComments, setSearchComments] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Select an item', value: 'default' },
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Body', value: 'body' },
  ]);

  const handlePicker = value => {
    setValue(value);
    setSearchAtt(value);
  };

  const handleTextChange = value => {
    if (searchAtt === 'name') {
      setSearchComments(prevState => {
        let name = Object.assign({}, prevState.name);
        name = value;
        return { name };
      });
    }
    if (searchAtt === 'email') {
      setSearchComments(prevState => {
        let email = Object.assign({}, prevState.email);
        email = value;
        return { email };
      });
    }
    if (searchAtt === 'body') {
      setSearchComments(prevState => {
        let body = Object.assign({}, prevState.body);
        body = value;
        return { body };
      });
    }
    if (searchAtt === 'default') {
      setSearchComments({
        name: '',
        email: '',
        body: '',
      });
    }
  };

  useEffect(() => {
    async function fetchAPI() {
      try {
        let response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`,
        );
        setPost(response.data);
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    async function fetchAPI() {
      try {
        let response = await axios.get(
          'https://jsonplaceholder.typicode.com/comments',
          {
            params: {
              postId,
              name: searchComments.name || null,
              email: searchComments.email || null,
              body: searchComments.body || null,
            },
          },
        );
        setComments(response.data);
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchAPI();
  }, [searchComments]);

  return (
    <>
      {!post || !comments ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image style={styles.image} source={{ uri: getImage(post.id) }} />
            <Text style={styles.author}>
              Written by: {getName(post.userId)}
            </Text>
            <View style={{ flexGrow: 1, flexDirection: 'row' }}>
              <Text style={styles.title}>
                {capitalizeFirstLetter(post.title)}
              </Text>
            </View>
            <View style={{ flexGrow: 1, flexDirection: 'row' }}>
              <Text style={styles.body}>
                {capitalizeFirstLetter(post.body)}
              </Text>
            </View>

            {/* COMMENT SECTION */}
            <View>
              <Text style={{ marginTop: 50 }}>Comments</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={handlePicker}
                setItems={setItems}
                style={{ width: 300, marginBottom: 160 }}
                listMode="SCROLLVIEW"
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Search your comment here..."
              onChangeText={handleTextChange}
            />
            <Comment comments={comments} />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    width: 1,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  author: {
    marginTop: 5,
    textAlign: 'right',
  },
  body: { marginTop: 20, fontSize: 14, textAlign: 'left', flex: 1, width: 1 },
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
});
