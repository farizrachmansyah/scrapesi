<template>
	<main class="site-main">
		<div class="text-center">
			<a href="/" class="d-iblock mb-24">
				<img src="~/assets/img/site-logo.png" alt="" width="180" />
			</a>
			<h1 class="page-title mb-24">Lupa Password</h1>
			<p>
				Masukkan e-mail yang terdaftar. Kami akan mengirimkan pesan untuk atur
				ulang password Anda.
			</p>
		</div>
		<form action="" class="wrapper" @submit.prevent="resetPassword">
			<div class="mb-24">
				<label for="" class="sr-only">Email</label>
				<div class="form-icon-wrapper">
					<span class="form-icon--left bzi-mail icon-1-5x"></span>
					<input
						v-model.trim="$v.formData.email.$model"
						type="email"
						class="form-input form-input--block"
						placeholder="Email"
						:maxlength="$v.formData.email.$params.maxLength.max"
						:class="{ 'form-input--error': $v.formData.email.$error }"
						@blur="$v.formData.email.$touch()"
					/>
				</div>
				<div v-if="$v.formData.email.$error" class="form-error-msg">
					<!-- <div v-if="">Mohon diisi</div> -->
					<div v-if="!$v.formData.email.required || !$v.formData.email.email">
						Email anda tidak valid.
					</div>
					<div v-if="!$v.formData.email.maxLength">
						Maksimal karakter yang diperbolehkan
						{{ $v.formData.email.$params.maxLength.max }}
					</div>
				</div>
			</div>
			<div class="mb-36">
				<button
					class="btn--block btn--primary"
					type="submit"
					:disabled="formData.isSending || $v.$invalid"
				>
					Kirim
				</button>
			</div>
		</form>
		<div class="text-center">
			Kembali ke halaman <nuxt-link to="/masuk">login</nuxt-link> atau
			<nuxt-link to="/daftar">daftar</nuxt-link>
		</div>
	</main>
</template>

<script>
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
	layout: 'blanklayout',
	data() {
		return {
			formData: {
				email: null,
				isSending: false
			}
		}
	},
	validations: {
		formData: {
			email: {
				required,
				email,
				maxLength: maxLength(256)
			}
		}
	},
	methods: {
		resetPassword() {
			this.$swal({
				title: 'Email Notifikasi Berhasil Terkirim',
				text: 'Pesan untuk atur ulang kata sandi sudah dikirim. Mohon untuk mengecek email anda',
				showConfirmButton: true,
				confirmButtonColor: '#30981D',
				confirmButtonText: 'Selesai',
				imageUrl: '/assets/img/email-berhasil.png',
				imageWidth: 121,
				imageHeight: 121,
				heightAuto: false
			}).then(result => {
				if (result.isConfirmed || result.isDismissed) {
					this.$router.push('/')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
form.wrapper {
	@media #{$medium} {
		padding: 0 60px;
	}
}
</style>
