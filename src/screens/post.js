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
import { Picker } from '@react-native-picker/picker';

import Loading from '../components/loading';
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

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(json => setPost(json))
      .catch(err => console.log('Request Failed', err));

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => response.json())
      .then(json => setComments(json))
      .catch(err => console.log('Request Failed', err));
  }, []);

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
              {/* TODO: STYLE PICKER
              TODO: SET VALUE TO setSearchComments
              TODO: SET USESTATE TO RERENDER
              TODO: MAKE SURE CALL */}
              <Picker
                selectedValue={searchAtt}
                style={{ height: 10, width: 50 }}
                onValueChange={(itemValue, itemIndex) =>
                  setSearchAtt(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Search your comment here..."
              onChangeText={setSearchComments[searchAtt]}
            />
            {comments.map(comment => {
              return (
                <View
                  key={comment.id}
                  style={{
                    borderWidth: 1,
                    borderColor: 'red',
                    marginVertical: 10,
                    padding: 10,
                  }}>
                  <Text style={{ marginVertical: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Name:</Text>{' '}
                    {capitalizeFirstLetter(comment.name)}
                  </Text>
                  <Text style={{ marginVertical: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Email:</Text>{' '}
                    {capitalizeFirstLetter(comment.email)}
                  </Text>
                  <Text style={{ marginVertical: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Comment:</Text>{' '}
                    {capitalizeFirstLetter(comment.body)}
                  </Text>
                </View>
              );
            })}
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
