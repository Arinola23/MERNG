import React from 'react'
import { Form, Button, FormField, FormInput}  from "semantic-ui-react"
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client/react'

import { useForm } from '../util/hooks'
import { FETCH_POSTS_QUERY } from '../util/graphQL'

const PostForm = () => {
const createPostCallback = () => {
    createPost()
}

    const {onChange, onSubmit, values} = useForm(createPostCallback, {
    body: ''
})

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        //  update(_, result) {
        //     console.log(result)
        //     values.body = ''
        // }
        //caching  data directly using apollo cache 
        update(proxy, result) {
           const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            })
            //create a shallow copy before modifying
           const newData = {
                ...data,
           getPosts: [ result.data.createPost, ...data.getPosts]
           }

            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData })
            values.body = ''
        }
})





  return (
   <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors?.[0]?.message || "An unexpected error occured"}</li>
          </ul>
        </div>
      )}
    </>
  )
}

const CREATE_POST_MUTATION = gql `
    mutation createPost($body: String!) {
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
        }
    }
`

export default PostForm
