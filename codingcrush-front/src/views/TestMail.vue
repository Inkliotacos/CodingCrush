<template>
  <form class="contact-form" @submit.prevent="sendEmail">
    <label>Name</label>
    <input type="text" name="user_name">
    <label>Email</label>
    <input type="email" name="user_email">
    <label>Message</label>
    <textarea name="message"></textarea>
    <input type="submit" value="Send">
  </form>
</template>

<script>
import emailjs, { init } from 'emailjs-com'

init('user_FM31RDJW4x7LeZDIbwZIR')

export default {
  methods: {
    sendEmail: (e) => {
      emailjs.sendForm('service_mextk2d', 'template_76uj0h9', e.target, 'user_FM31RDJW4x7LeZDIbwZIR')
        .then((result) => {
          console.log('SUCCESS!', result.status, result.text)
        }, (error) => {
          console.log('FAILED...', error)
        })
    }
  }
}
</script>
