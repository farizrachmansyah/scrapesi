<template>
	<main class="site-main">
		<div class="container container--small">
			<h1 class="page-title text-center">Masuk ke Akun Anda</h1>
			<form action="" @submit.prevent="masuk">
				<div class="mb-24">
					<label for="" class="sr-only">Email</label>
					<div class="form-icon-wrapper">
						<span class="form-icon--left bzi-mail"></span>
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
						<div v-if="!$v.formData.email.required || !$v.formData.email.email">
							Email anda tidak valid.
						</div>
						<div v-if="!$v.formData.email.maxLength">
							Maksimal karakter yang diperbolehkan
							{{ $v.formData.email.$params.maxLength.max }}
						</div>
					</div>
				</div>
				<div class="mb-24">
					<label for="" class="sr-only">Password</label>
					<div class="form-icon-wrapper">
						<span class="form-icon--left bzi-lock bzi-1_2x"></span>
						<input
							v-model.trim="$v.formData.password.$model"
							:type="newPswEye ? 'password' : 'text'"
							:class="{ 'form-input--error': $v.formData.password.$error }"
							:maxlength="$v.formData.password.$params.maxLength.max"
							class="form-input form-input--block"
							placeholder="Password"
							@blur="$v.formData.password.$touch()"
						/>
						<span
							class="form-icon bzi-1_5x"
							:class="newPswEye ? 'bzi-eye' : 'bzi-eye-close'"
							@click="newPswEye = !newPswEye"
						></span>
					</div>
					<div v-if="$v.formData.password.$error" class="form-error-msg">
						<div v-if="!$v.formData.password.required">Mohon diisi</div>
						<div v-if="!$v.formData.password.maxLength">
							Maksimal karakter yang diperbolehkan
							{{ $v.formData.password.$params.maxLength.max }}
						</div>
					</div>
				</div>
				<div class="mb-24">
					<button
						class="btn--primary btn--block"
						type="submit"
						:disabled="$v.$invalid"
					>
						Masuk
					</button>
				</div>
				<div class="flex f-space-between v-center">
					<label for="ingat_saya">
						<input id="ingat_saya" type="checkbox" class="form-input--check" />
						Ingat Saya
					</label>
					<nuxt-link to="/lupa-password">Lupa Password?</nuxt-link>
				</div>
				<div class="line-separator">
					<span>ATAU</span>
				</div>
				<!-- <a
					class="btn--block btn--ghost-dark-grey mb-16"
					href="https://alifmart-api.suitdev.com/api/login/google"
				>
					<img src="/img/google-icon.png" alt="" class="btn-icon" />
					Masuk dengan Google
				</a> -->
				<button
					class="btn--block btn--ghost-dark-grey mb-16"
					@click.prevent="loginWithGoogle"
				>
					<img src="/assets/img/google-icon.png" alt="" class="btn-icon" />
					Masuk dengan Google
				</button>
				<div class="text-center">
					Baru di Alifmart? <nuxt-link to="/daftar">Daftar disini</nuxt-link>
				</div>
			</form>
		</div>
	</main>
</template>

<script>
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
	data() {
		return {
			redirectPage: this.$route.query.dari || '/',
			newPswEye: true,
			formData: {
				email: null,
				password: null
			}
		}
	},
	validations: {
		formData: {
			email: {
				required,
				email,
				maxLength: maxLength(256)
			},
			password: {
				required,
				maxLength: maxLength(20)
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
