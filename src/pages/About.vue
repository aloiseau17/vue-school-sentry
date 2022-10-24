<script setup>
import * as Sentry from '@sentry/vue'

const user = {}

const post = {
    id: 1,
    title: 'Hello world',
    body: "lorem ipsum, blah, blah, blah"
}

// setContext except an object, use setTag for primitive value
Sentry.setContext("post", {
    id: post.id,
    title: "Post object",
    postTitle: post.title
})
Sentry.setTag('randomTag', "hello-tag")

const makeToast = () => {
    slideBread()
}
</script>

<template>
  <div>
    <h1 class="text-4xl">About</h1>
    <button @click="user.email.send()">Send Email</button>
    <button @click="makeToast()">Make Toast</button>
  </div>
</template>
