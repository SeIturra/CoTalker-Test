<template>
	<!-- eslint-disable -->
	<div class="content">
		<div class="container">
			<div class="Search__container">
				<!--input
					class="Search__input"
					@keyup.enter="requestData"
					placeholder="npm package name"
					type="search" name="search"
					v-model="package"
				-->
				<button class="Search__button" @click="requestData">Solicitar gráfico</button>
			</div>
			<div class="error-message" v-if="showError">
			 {{ errorMessage }}
			</div>
			<hr>
			<h1 class="title" v-if="loaded">{{ packageName }}</h1>
			<div class="Chart__container" v-if="loaded">
				<div class="Chart__title">
					<span></span>
					<hr>
				</div>
				<div class="Chart__content">
					<line-chart v-if="loaded" :chart-data="downloads" :chart-labels="labels"></line-chart>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
	import axios from 'axios'
	import LineChart from '@/components/LineChart'

	export default {
		components: {
			LineChart
		},
		props: {},
		data () {
			return {
				package: null,
				packageName: '',
				period: 'last-month',
				loaded: false,
				downloads: [],
				labels: [],
				showError: false,
				errorMessage: 'Please enter a package name'
			}
		},
		mounted () {
			if (this.$route.params.package) {
				this.package = this.$route.params.package
				this.requestData()
			}
		},
		methods: {
			resetState () {
				this.loaded = false
				this.showError = false
			},
			requestData () {
				/*if (this.package === null || this.package === '' || this.package === 'undefined') {
					this.showError = true
					return
				}*/
				this.resetState()
				//axios.get(`https://api.npmjs.org/downloads/range/${this.period}/${this.package}`)
				axios.get(`http://www.mocky.io/v2/5cd8edaf300000d81bc012ab`)
					.then(response => {
						console.log(response.data.calls)
						this.downloads = response.data.calls.map(llamada => llamada.sesiones)
						this.labels = response.data.calls.map(llamada => llamada.dia)
						this.packageName = response.data.package
						//this.setURL()
						this.loaded = true
					})
					/*.catch(err => {
						this.errorMessage = err.response.data.error
						this.showError = true
					})*/
			},
			setURL () {
				history.pushState({ info: `npm-stats ${this.package}` }, this.package, `/#/${this.package}`)
			}
		}
	}

	/*

	{
		"calls": [
		{"dia": "02-23-2017", "sesiones": "47372"},
		{"dia": "02-24-2017", "sesiones": "18546"},
		{"dia": "02-25-2017", "sesiones": "2953"},
		{"dia": "02-26-2017", "sesiones": "1629"},
		{"dia": "02-27-2017", "sesiones": "18778"},
		{"dia": "02-28-2017", "sesiones": "31315"},
		{"dia": "03-01-2017", "sesiones": "21702"},
		{"dia": "03-02-2017", "sesiones": "9366"},
		{"dia": "03-03-2017", "sesiones": "8497"},
		{"dia": "03-04-2017", "sesiones": "2392"},
		{"dia": "03-05-2017", "sesiones": "3348"},
		{"dia": "03-06-2017", "sesiones": "8683"},
		{"dia": "03-07-2017", "sesiones": "15223"},
		{"dia": "03-08-2017", "sesiones": "16426"},
		{"dia": "03-09-2017", "sesiones": "17729"},
		{"dia": "03-10-2017", "sesiones": "6405"},
		{"dia": "03-11-2017", "sesiones": "1814"},
		{"dia": "03-12-2017", "sesiones": "86"},
		{"dia": "03-13-2017", "sesiones": "8169"},
		{"dia": "03-14-2017", "sesiones": "18883"},
		{"dia": "03-15-2017", "sesiones": "10672"},
		{"dia": "03-16-2017", "sesiones": "16042"},
		{"dia": "03-17-2017", "sesiones": "12549"},
		{"dia": "03-18-2017", "sesiones": "1751"},
		{"dia": "03-19-2017", "sesiones": "686"},
		{"dia": "03-20-2017", "sesiones": "19982"},
		{"dia": "03-21-2017", "sesiones": "21189"},
		{"dia": "03-22-2017", "sesiones": "38093"},
		{"dia": "03-23-2017", "sesiones": "26535"},
		{"dia": "03-24-2017", "sesiones": "6259"},
		{"dia": "03-25-2017", "sesiones": "1640"},
		{"dia": "03-26-2017", "sesiones": "861"},
		{"dia": "03-27-2017", "sesiones": "11302"},
		{"dia": "03-28-2017", "sesiones": "12706"},
		{"dia": "03-29-2017", "sesiones": "11300"},
		{"dia": "03-30-2017", "sesiones": "11784"},
		{"dia": "03-31-2017", "sesiones": "10675"},
		{"dia": "04-01-2017", "sesiones": "970"},
		{"dia": "04-02-2017", "sesiones": "707"},
		{"dia": "04-03-2017", "sesiones": "8983"},
		{"dia": "04-04-2017", "sesiones": "10118"},
		{"dia": "04-05-2017", "sesiones": "13118"},
		{"dia": "04-06-2017", "sesiones": "13582"},
		{"dia": "04-07-2017", "sesiones": "8055"},
		{"dia": "04-08-2017", "sesiones": "1884"},
		{"dia": "04-09-2017", "sesiones": "804"},
		{"dia": "04-10-2017", "sesiones": "10595"},
		{"dia": "04-11-2017", "sesiones": "9055"},
		{"dia": "04-12-2017", "sesiones": "5854"},
		{"dia": "04-13-2017", "sesiones": "6165"},
		{"dia": "04-14-2017", "sesiones": "2325"},
		{"dia": "04-15-2017", "sesiones": "2745"},
		{"dia": "04-16-2017", "sesiones": "1577"},
		{"dia": "04-17-2017", "sesiones": "4466"},
		{"dia": "04-18-2017", "sesiones": "18216"},
		{"dia": "04-19-2017", "sesiones": "9505"},
		{"dia": "04-20-2017", "sesiones": "36574"},
		{"dia": "04-21-2017", "sesiones": "5581"},
		{"dia": "04-22-2017", "sesiones": "1941"},
		{"dia": "04-23-2017", "sesiones": "1802"},
		{"dia": "04-24-2017", "sesiones": "8419"},
		{"dia": "04-25-2017", "sesiones": "11661"},
		{"dia": "04-26-2017", "sesiones": "7054"},
		{"dia": "04-27-2017", "sesiones": "5999"},
		{"dia": "04-28-2017", "sesiones": "5444"},
		{"dia": "04-29-2017", "sesiones": "1253"},
		{"dia": "04-30-2017", "sesiones": "277"},
		{"dia": "05-01-2017", "sesiones": "777"},
		{"dia": "05-02-2017", "sesiones": "14686"},
		{"dia": "05-03-2017", "sesiones": "8562"},
		{"dia": "05-04-2017", "sesiones": "23002"},
		{"dia": "05-05-2017", "sesiones": "16428"},
		{"dia": "05-06-2017", "sesiones": "3913"},
		{"dia": "05-07-2017", "sesiones": "1163"},
		{"dia": "05-08-2017", "sesiones": "10426"},
		{"dia": "05-09-2017", "sesiones": "15594"},
		{"dia": "05-10-2017", "sesiones": "9056"},
		{"dia": "05-11-2017", "sesiones": "8703"},
		{"dia": "05-12-2017", "sesiones": "6211"},
		{"dia": "05-13-2017", "sesiones": "432"},
		{"dia": "05-14-2017", "sesiones": "260"},
		{"dia": "05-15-2017", "sesiones": "4358"},
		{"dia": "05-16-2017", "sesiones": "17497"},
		{"dia": "05-17-2017", "sesiones": "29935"},
		{"dia": "05-18-2017", "sesiones": "20478"},
		{"dia": "05-19-2017", "sesiones": "6867"},
		{"dia": "05-20-2017", "sesiones": "629"},
		{"dia": "05-21-2017", "sesiones": "173"},
		{"dia": "05-22-2017", "sesiones": "12720"},
		{"dia": "05-23-2017", "sesiones": "7883"},
		{"dia": "05-24-2017", "sesiones": "5872"},
		{"dia": "05-25-2017", "sesiones": "11512"},
		{"dia": "05-26-2017", "sesiones": "9451"},
		{"dia": "05-27-2017", "sesiones": "2433"},
		{"dia": "05-28-2017", "sesiones": "438"},
		{"dia": "05-29-2017", "sesiones": "4612"},
		{"dia": "05-30-2017", "sesiones": "4375"},
		{"dia": "05-31-2017", "sesiones": "3912"},
		{"dia": "06-01-2017", "sesiones": "3846"},
		{"dia": "06-02-2017", "sesiones": "5262"},
		{"dia": "06-03-2017", "sesiones": "862"},
		{"dia": "06-04-2017", "sesiones": "617"},
		{"dia": "06-05-2017", "sesiones": "11916"},
		{"dia": "06-06-2017", "sesiones": "6924"},
		{"dia": "06-07-2017", "sesiones": "11402"},
		{"dia": "06-08-2017", "sesiones": "12702"},
		{"dia": "06-09-2017", "sesiones": "11793"},
		{"dia": "06-10-2017", "sesiones": "1764"},
		{"dia": "06-11-2017", "sesiones": "1246"},
		{"dia": "06-12-2017", "sesiones": "3983"},
		{"dia": "06-13-2017", "sesiones": "9227"},
		{"dia": "06-14-2017", "sesiones": "14286"},
		{"dia": "06-15-2017", "sesiones": "2317"}
	]
}

*/
</script>