<template>
  <div id="app">
	<app-preloader v-if="preloader"></app-preloader>  
	<div v-show="!preloader" class="app-inner">
		<audio-player></audio-player>
		<songs-list></songs-list>
	</div>
  </div>
</template>

<script>
import AudioPlayer from './components/AudioPlayer.vue'
import SongsList from './components/SongsList.vue'
import AppPreloader from './components/AppPreloader.vue'

export default {
  	name: 'app',
  	data() {
		return {
			preloader: true
		}
  	},
  	components: {
		AudioPlayer,
		SongsList,
		AppPreloader
  	},
  	computed: {
	  	songsLoaded() {
		  	return this.$store.state.counterLoaded
	  	}
	},
	watch: {
		songsLoaded(newValue, oldValue) {
			if (newValue == (this.$store.state.list.length-1)) this.preloader=false;
		}
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Work+Sans:300,400,500');

#app {
  font-family: 'Work Sans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  padding-top: 100px;
}
#app * {
	box-sizing: border-box;
}
.app-inner {
	width: 100%;
	max-width: 630px;
	margin: 0 auto;
	border-radius: 12px;
			-webkit-box-shadow: -2px 8px 38px -10px rgba(0,0,0,0.75);
		-moz-box-shadow: -2px 8px 38px -10px rgba(0,0,0,0.75);
		box-shadow: -2px 8px 38px -10px rgba(0,0,0,0.75);
}
@media screen and (max-width: 768px) {
	#app {
		padding: 40px 8px 40px;
	}
}
@media screen and (max-width: 576px) {
	#app {
		padding-top: 20px;
		padding-bottom: 30px;
	}
}
</style>
