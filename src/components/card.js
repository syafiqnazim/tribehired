import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { getImage, getName, capitalizeFirstLetter } from '../helpers';
import Loading from './loading';

const Card = ({ posts, navigation }) => {
  const navigate = id => {
    navigation.navigate('Post', { postId: id });
  };

  return (
    <>
      {!posts ? (
        <Loading />
      ) : (
        posts.map(post => {
          return (
            <TouchableOpacity
              key={post.id}
              style={styles.card}
              onPress={() => navigate(post.id)}>
              <Image style={styles.image} source={{ uri: getImage(post.id) }} />
              <Text style={styles.title}>
                {capitalizeFirstLetter(post.title)}
              </Text>
              <Text style={styles.body}>
                {capitalizeFirstLetter(post.body)}
              </Text>
              <View style={styles.author}>
                <Text>Written by:</Text>
                <Text style={{ color: 'blue' }}>{getName(post.userId)}</Text>
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderColor: 'lightblue',
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: { width: 300, height: 200, resizeMode: 'contain' },
  title: { marginTop: 5, fontSize: 16, fontWeight: 'bold' },
  body: { marginTop: 5, fontSize: 14, textAlign: 'left' },
  author: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
