<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { sha3_256 } from 'js-sha3';

const { loggedIn, user, fetch: refreshSession } = useUserSession();

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to continue'
})

const toast = useToast()

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password'
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox' as const
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({ title: 'Google', description: 'Login with Google' })
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({ title: 'GitHub', description: 'Login with GitHub' })
  }
}]

const schema = z.object({
  email: z.string().min(1, 'Email/username is required'),
  password: z.string().min(6, 'Must be at least 6 characters')
})

type Schema = z.output<typeof schema>

type LoginResponse = {
  id: string | number;
  username: string;
  password: string;
  // add other properties if needed
};

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const hash = sha3_256(payload.data.password);
  console.log(hash);

  const { data: appUser, pending, error } = await useFetch<LoginResponse>(() => `http://localhost:8081/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      username: payload.data.email,
      password: hash
    })
  });
  //if the backend returns a user object, log in the user through the nuxt login api
  if (appUser.value) {
    console.log(appUser.value);
    await $fetch('/api/login', {
      method: 'POST',
      body: {id: appUser.value.id, username: appUser.value.username, password: hash},
    })
    toast.add({ title: 'Success', description: 'Login successful', color: 'success' });
    await refreshSession();
    await navigateTo('/app/dashboard');
  }else if (error.value) {
    toast.add({ title: 'Error', description: 'Invalid email or password', color: 'error' });
    return;
  }
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    :providers="providers"
    title="Welcome back"
    icon="i-lucide-lock"
    @submit="onSubmit"
  >
    <template #description>
      Don't have an account? <ULink
        to="/signup"
        class="text-primary font-medium"
      >Sign up</ULink>.
    </template>

    <template #password-hint>
      <ULink
        to="/"
        class="text-primary font-medium"
        tabindex="-1"
      >Forgot password?</ULink>
    </template>

    <template #footer>
      By signing in, you agree to our <ULink
        to="/"
        class="text-primary font-medium"
      >Terms of Service</ULink>.
    </template>
  </UAuthForm>
</template>
