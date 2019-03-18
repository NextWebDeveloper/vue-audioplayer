<template>
		<div class="player-outer">
			<div class="player">
				<div class="player-inner">
					<div>
						<button v-on:click="prevTrack" class="player__button" :style="{'background-image': 'url(' + require('@/assets/icons/back.svg') + ')'}"></button>
					</div>
					<div>
						<button v-if="!playing" v-on:click="startPlaying" class="player__button" :style="{'background-image': 'url(' + require('@/assets/icons/play-button.svg') + ')'}"></button>
						<button v-else v-on:click="pausePlaying" class="player__button" :style="{'background-image': 'url(' + require('@/assets/icons/pause.svg') + ')'}"></button>
					</div>
					<div>
						<button v-on:click="nextTrack" class="player__button" :style="{'background-image': 'url(' + require('@/assets/icons/next.svg') + ')'}"></button>
					</div>
					<div v-on:click="seek" class="player__progress player__progress_desktope">
						<div :style="{ width: this.percentComplete + '%' }" class="player__seeker"></div>
					</div>
					<div class="player__volume">
						<input :style="{ backgroundSize: this.volume + '% 100%' }" v-model.number="volume" type="range" min="0" max="100"/>
					</div>
				</div>
				
				<div v-on:click="seek" class="player__progress player__progress_mobile">
					<div :style="{ width: this.percentComplete + '%' }" class="player__seeker"></div>
				</div>
			</div>
			<audio ref="audiofile" id="hidden-player" :src="song" preload="auto" style="display: none;"></audio>
		</div>
</template>

<script>
const convertTime = (val) => {
	let time = new Date(val * 1000).toISOString().substr(11, 8);
	return time.indexOf("00:") === 0 ? time.substr(3) : time;
};

export default {
  name: 'AudioPlayer',
	data() {
		return {
			audio: null,
			currentSeconds: 0,
			durationSeconds: 0,
			loaded: false,
			playing: false,
			previousVolume: 35,
			showVolume: false,
			volume: 50
		}
	},
	computed: {
		percentComplete() {
			return parseInt(this.currentSeconds / this.durationSeconds * 100);
		},
		
		song() {
			return window.location.origin+'/songs/'+this.$store.getters.getSong+'.mp3'
		},
    	songPlaying () {
    	  	return this.$store.state.playing
    	}
	},
	watch: {
		volume(value) {
			this.audio.volume = this.volume / 100;
		},
		songPlaying(newValue, oldValue) {
			if (newValue) this.audio.play();
			else this.audio.pause();
		}
	},
	methods: {
		load() {
			if (this.audio.readyState >= 2) {
				this.loaded = true;
				this.durationSeconds = parseInt(this.audio.duration);
				if (this.$store.state.playing) this.audio.play()
			}
		},
		seek(e) {
			if (!this.playing || e.target.tagName === 'SPAN') {
				return;
			}
			const el = e.target.getBoundingClientRect();
			const seekPos = (e.clientX - el.left) / el.width;
			this.audio.currentTime = parseInt(this.audio.duration * seekPos);
		},
		update() {
			this.currentSeconds = parseInt(this.audio.currentTime);
			this.$store.commit('setCurTime', parseInt(this.audio.currentTime))
		},
		startPlaying() {
			if ( this.$store.state.currentSong !== null ) {
				this.$store.commit('setPlaying', true)
			}
		},
		pausePlaying() {
			this.$store.commit('setPlaying', false)
		},
		prevTrack() {
			if ( this.$store.state.currentSong !== null ) this.$store.commit('prevSong')
		},
		nextTrack() {
			if ( this.$store.state.currentSong !== null ) this.$store.commit('nextSong');
		}
	},
	mounted() {
		this.audio = this.$el.querySelector('#hidden-player');
		this.audio.addEventListener('timeupdate', this.update);
		this.audio.addEventListener('loadeddata', this.load);
		this.audio.addEventListener('pause', () => { this.playing = false; });
		this.audio.addEventListener('play', () => { this.playing = true; });
	}
}
</script>


<style scoped lang="scss">
.player-outer {
	background-color: rgb(29, 170, 235);
	border-radius: 12px 12px 0 0;
	display: inline-block;
	width: 100%;
	height: 90px;
	padding: 0 15px;
}
.player {
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
}
.player-inner {
	display: flex;
	align-items: center;
	height: 100%;
}
.player__progress {
	background-color: rgb(240, 227, 225);
	border-radius: 18px;
	overflow: hidden;
	cursor: pointer;
	height: 50%;
	flex-grow: 1;
	position: relative;
	height: 36px;
	&_mobile {
		display: none;
	}
}
.player__seeker {
	background-color: #216278;
	bottom: 0;
	left: 0;
	position: absolute;
	top: 0;
}
.player__volume {
	width: 120px;
	display: flex;
	align-items: center;
}
.player__button {
	width: 50px;
	height: 50px;
	background-repeat: no-repeat;
	background-position: center;
	background-size: 80%;
	border: none;
	margin-right: 5px;
	outline: none;
	background-color: transparent;
	cursor: pointer;
}

input[type=range] {
    margin: auto;
    outline: none;
    padding: 0;
    width: 80%;
    height: 6px;
    background-color: rgb(240, 227, 225);
    background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #216278), color-stop(100%, #216278));
    background-image: -webkit-linear-gradient(#216278, #216278);
    background-image: -moz-linear-gradient(#216278, #216278);
    background-image: -o-linear-gradient(#216278, #216278);
    background-image: linear-gradient(#216278, #216278);
    background-size: 50% 100%;
    background-repeat: no-repeat;
    border-radius: 10px;
    cursor: pointer;
    -webkit-appearance: none;
}

input[type=range]::-webkit-slider-runnable-track {
    box-shadow: none;
    border: none;
    background: transparent;
    -webkit-appearance: none;
}

input[type=range]::-moz-range-track {
    box-shadow: none;
    border: none;
    background: transparent;
}

input[type=range]::-moz-focus-outer {
    border: 0;
}

input[type=range]::-webkit-slider-thumb {
    width: 14px;
    height: 14px;
    border: 0;
    background: #216278;
    border-radius: 100%;
    box-shadow: 0 0 1px 0px rgba(0,0,0,0.1);
    -webkit-appearance: none;
}

input[type=range]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border: 0;
    background: #216278;
    border-radius: 100%;
    box-shadow: 0 0 1px 0px rgba(0,0,0,0.1);
}
@media screen and (max-width: 768px) {
	.player__button {
		width: 40px;
		height: 40px;
	}
	.player-outer {
		height: auto;
	}
	.player__progress {
		height: 30px;
		&_mobile {
			display: block;
			flex-grow: 0;
			margin-top: 10px;
		}
		&_desktope {
			display: none;
		}
	}
	.player {
		padding-top: 15px;
		padding-bottom: 25px;
	}
	.player-inner {
		height: auto;
	}
	.player__volume {
		margin-left: auto;
	}
}
</style>
