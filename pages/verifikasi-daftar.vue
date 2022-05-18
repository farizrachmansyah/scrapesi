<template>
	<main class="site-main">
		<div class="container container--small text-center">
			<img
				src="/assets/img/verifikasi-daftar.png"
				width="146"
				class="mb-24"
				alt=""
			/>
			<h3 class="text-grey mb-24">Silahkan verifikasi email Anda</h3>
			<p v-if="$route.query.email" class="mb-24">
				Silahkan cek email Anda. Pesan verifikasi sudah tekirim ke
				<strong>{{ $route.query.email }}</strong>
			</p>
			<div v-else class="mb-24">
				<div class="mb-8">
					Silahkan verifikasi ulang menggunakan email saat anda mendaftar
				</div>
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
			<div class="bzg">
				<div class="bzg_c" data-col="s6">
					<button
						class="btn--block btn--ghost-primary"
						type="button"
						@click.prevent="resendEmail"
					>
						Kirim Ulang
					</button>
				</div>
				<div class="bzg_c" data-col="s6">
					<nuxt-link to="/" class="btn--block btn--primary">Selesai</nuxt-link>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
	watchQuery: true,
	data() {
		return {
			formData: {
				email: this.$route.query.email || null
			}
		}
	},
	methods: {
		async resendEmail() {
			const formData = new FormData()

			formData.set('email', this.formData.email)
			await this.$axios
				.$post('/email/resend-after-register', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then(res => {
					this.$swal({
						text: 'Verifikasi ulang sudah terkirim',
						showConfirmButton: false,
						position: 'top',
						customClass: {
							popup: 'success'
						}
					})
				})
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
	head() {
		return this.$SEOMeta({
			metaTitle: 'Verifikasi Email'
		})
	}
}
</script>

<style lang="scss" scoped></style>
