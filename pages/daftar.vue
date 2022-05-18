<template>
	<main class="site-main">
		<div class="container container--small">
			<h1 class="page-title text-center mb-16">Daftar Akun Baru</h1>
			<div class="text-center mb-24">
				Sudah punya akun? <nuxt-link to="/masuk">Masuk</nuxt-link>
			</div>
			<button
				class="btn--block btn--ghost-grey"
				@click.prevent="$auth.loginWith('google')"
			>
				<img src="/assets/img/google-icon.png" alt="" class="btn-icon" />
				Masuk dengan Google
			</button>
			<div class="line-separator">
				<span>ATAU</span>
			</div>
			<form action="" @submit.prevent="daftarAlifmart">
				<div class="mb-24">
					<label for="" class="sr-only">Nama</label>
					<div class="form-icon-wrapper">
						<span class="form-icon--left bzi-user bzi-1_2x"></span>
						<input
							v-model.trim="$v.formData.name.$model"
							type="text"
							class="form-input form-input--block"
							placeholder="Nama Lengkap"
							:maxlength="$v.formData.name.$params.maxLength.max"
							:class="{ 'form-input--error': $v.formData.name.$error }"
							@blur="$v.formData.name.$touch()"
						/>
					</div>
					<div v-if="$v.formData.name.$error" class="form-error-msg">
						<div v-if="!$v.formData.name.required">Mohon diisi</div>
						<div v-if="!$v.formData.name.minLength">
							Minimal masukkan
							{{ $v.formData.name.$params.minLength.min }} karakter
						</div>
						<div v-if="!$v.formData.name.maxLength">
							Maksimal karakter yang diperbolehkan
							{{ $v.formData.name.$params.maxLength.max }}
						</div>
					</div>
				</div>
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
						<div v-if="!$v.formData.email.required">Mohon diisi</div>
						<div v-if="!$v.formData.email.email">Email anda tidak valid.</div>
						<div v-if="!$v.formData.email.minLength">
							Minimal masukkan
							{{ $v.formData.email.$params.minLength.min }} karakter
						</div>
						<div v-if="!$v.formData.email.maxLength">
							Maksimal karakter yang diperbolehkan
							{{ $v.formData.email.$params.maxLength.max }}
						</div>
					</div>
				</div>
				<div class="mb-24">
					<label for="" class="sr-only">Phone</label>
					<div class="form-icon-wrapper">
						<span class="form-icon--left bzi-phone bzi-1_5x"></span>
						<input
							v-model.trim="$v.formData.phone.$model"
							type="number"
							class="form-input form-input--block"
							placeholder="Nomor Handphone"
							:maxlength="$v.formData.phone.$params.maxLength.max"
							:class="{ 'form-input--error': $v.formData.phone.$error }"
							@blur="$v.formData.phone.$touch()"
						/>
					</div>
					<div v-if="$v.formData.phone.$error" class="form-error-msg">
						<div
							v-if="!$v.formData.phone.required || !$v.formData.phone.numeric"
						>
							Mohon diisi dengan angka
						</div>
						<div v-if="!$v.formData.phone.minLength">
							Minimal masukkan
							{{ $v.formData.phone.$params.minLength.min }} karakter
						</div>
						<div v-if="!$v.formData.phone.maxLength">
							Maksimal karakter yang diperbolehkan
							{{ $v.formData.phone.$params.maxLength.max }}
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
							class="form-icon bzi-1_2x"
							:class="newPswEye ? 'bzi-eye' : 'bzi-eye-close'"
							@click="newPswEye = !newPswEye"
						></span>
					</div>
					<div v-if="$v.formData.password.$error" class="form-error-msg mb-8">
						<div v-if="!$v.formData.password.strongPassword">
							Mohon diisi sesuai ketentuan
						</div>
						<div v-if="!$v.formData.password.maxLength">
							Maksimal karakter yang diperbolehkan
							{{ $v.formData.password.$params.maxLength.max }}
						</div>
					</div>
					<small class="text-dark-grey d-block mt-8">
						Ketentuan : 8 -20 karakter. Mengandung huruf (a-z), angka (0-9),
						huruf besar, huruf kecil, dan simbol (*&^%$#@!, dan lain-lain)
					</small>
				</div>
				<div class="mb-24">
					<label class="sr-only" for="">Konfirmasi Sandi Baru</label>
					<div class="form-icon-wrapper">
						<span class="form-icon--left bzi-lock bzi-1_2x"></span>
						<input
							v-model.trim="$v.formData.confirmPassword.$model"
							:type="confirmPswEye ? 'password' : 'text'"
							class="form-input form-input--block"
							placeholder="Konfirmasi Password"
						/>
						<span
							class="form-icon bzi-1_2x"
							:class="confirmPswEye ? 'bzi-eye' : 'bzi-eye-close'"
							@click="confirmPswEye = !confirmPswEye"
						></span>
					</div>
					<div
						v-if="!$v.formData.confirmPassword.sameAsPassword"
						class="form-error-msg"
					>
						Kata Sandi tidak sama
					</div>
				</div>
				<div class="mb-24 flex v-top">
					<input
						v-model="formData.terms"
						type="checkbox"
						class="mr-16 form-input--check fs-0"
						@change="$v.formData.terms.$touch()"
					/>
					<div class="fg-1">
						Saya telah membaca dan menyetujui
						<nuxt-link to="/syarat-ketentuan">Syarat dan Ketentuan</nuxt-link>
						dan
						<nuxt-link to="/kebijakan-privasi">Kebijakan Privasi</nuxt-link>
						Alifmart
					</div>
				</div>
				<div class="mb-24">
					<button
						class="btn--primary btn--block"
						type="submit"
						:disabled="$v.$invalid || isSending"
					>
						Daftar
					</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script>
import {
	required,
	email,
	minLength,
	maxLength,
	sameAs,
	numeric
} from 'vuelidate/lib/validators'
export default {
	data() {
		return {
			isSending: false,
			newPswEye: true,
			confirmPswEye: true,
			formData: {
				name: null,
				email: null,
				phone: null,
				password: null,
				confirmPassword: null,
				terms: false
			}
		}
	},
	validations: {
		formData: {
			name: {
				required,
				minLength: minLength(4),
				maxLength: maxLength(256)
			},
			email: {
				required,
				email,
				minLength: minLength(4),
				maxLength: maxLength(256)
			},
			phone: {
				required,
				numeric,
				minLength: minLength(11),
				maxLength: maxLength(256)
			},
			password: {
				strongPassword(password) {
					return this.$StrongPassword(8, password)
				},
				maxLength: maxLength(20)
			},
			confirmPassword: {
				sameAsPassword: sameAs('password')
			},
			terms: {
				sameAs: sameAs(() => true)
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
