import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { capitalizeFirstLetter } from '../helpers';

const Comment = ({ comments }) => {
  return (
    <>
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
    </>
  );
};

export default Comment;

const styles = StyleSheet.create({});
