<template>
  <div class="songs-wrapper">
	  <div class="songs-search">
		  <input type="text" v-model="searchSong">
	  </div>
	  <div class="songs-list">
		  <div @click="selectSong(index)" v-for="(song, index) in list" class="song" :class="{ 'song_active': activeSong(index) }" v-show="song.show">
			  <span class="song__name">{{ songName(song.name) }}</span>
			  <span style="display: none;">{{ songDuration(index) }}</span>
			  <span v-if="activeSong(index)" class="song__time">{{ timePassed }}</span>
			  <span v-else class="song__time">{{ song.duration }}</span>
			  <audio style="display: none;" :data-song-number="index" :src="songSrc(song.name)"></audio>
		  </div>
	  </div>
  </div>
</template>

<script>
const convertTime = (val) => {
	let time = new Date(val * 1000).toISOString().substr(11, 8);
	return time.indexOf("00:") === 0 ? time.substr(3) : time;
};
export default {
  	name: 'SongsList',
	data() {
		return {
			list: null,
			listDuplicated: null,
			searchSong: ''
		}
	},
	methods: {
		songSrc(song) {
			return window.location.origin+'/songs/'+song+'.mp3'
		},
		songDuration(idx) {
			setTimeout(()=>{
				let songTime = null;
				let songsList = this.$el.querySelectorAll('[data-song-number]');
				Array.from(songsList).filter((x)=>{
					let num = x.getAttribute('data-song-number');
					if (num == idx) {
						let promise = new Promise((resolve, reject)=> {
							x.onloadedmetadata = function() {
								resolve(x.duration)
							};
						})
						promise.then((result)=>{
							this.list[idx].duration = convertTime(result);
							this.$store.commit('incCounter');
						})
					}
				})
			},0)
		},
		songName(song) {
			return song.replace(/_|-/g, ' ');
		},
		selectSong(idx) {
			if ( idx == this.$store.state.currentSong && this.$store.state.playing == true ) {
				this.$store.commit('setPlaying', false)
			} else if ( idx == this.$store.state.currentSong && this.$store.state.playing == false ) {
				this.$store.commit('setPlaying', true)
			}
			else this.$store.commit('selectSong', idx);
		},
		activeSong(idx) {
			return this.$store.state.currentSong == idx;
		}
	},
	computed: {
		timePassed: function() {
			return convertTime(this.$store.state.timePassed);
		}
	},
	mounted() {
		this.list = this.$store.state.list
	},
	watch: {
		searchSong() {
			if (this.searchSong.length >= 2) {
				this.list.forEach((e)=>{
					if (e.name.toLowerCase().indexOf(this.searchSong.toLowerCase())<=-1) {
						e.show = false;
					} else e.show = true;
				})
			} else this.list.forEach((e)=>e.show = true)
		}
	}
}
</script>

<style scoped lang="scss">
.songs-search {
	background-color: rgb(254,144,144);
	padding: 25px 30px 10px;
	input {
		font-size: 16px;
		color: #4F3B3B;
		width: 100%;
		height: 26px;
		border-radius: 13px;
		padding: 0 20px;
		border: none;
		outline: none;
		-webkit-box-shadow: -2px 8px 38px -10px rgba(0,0,0,0.75);
		-moz-box-shadow: -2px 8px 38px -10px rgba(0,0,0,0.75);
		box-shadow: -2px 8px 38px -10px rgba(0,0,0,0.75);
		&:focus {
			border: none;
			outline: none;
		}
	}
}
.song {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid rgb(233, 204, 204);
	padding: 7px 0;
	color: #fff;
	font-weight: 300;
	position: relative;
	cursor: pointer;
	user-select: none;
	&:last-child {
		border-bottom: none;
	}
	&_active {
		font-weight: 500;
		&:before {
			content: ''; 
			position: absolute;
			z-index: 10;
			top: 50%;
			transform: translateY(-50%);
    		left: -20px;
    		border: 6px solid transparent;
    		border-left: 6px solid rgb(255, 255, 255);
		}
	}
	&__name {
		text-align: left;
	}
	&__time {
		font-size: 15px;
		min-width: 52px;
		flex-shrink: 0;
		text-align: center;
		display: block;
		padding: 2px 4px;
		border: 1px solid rgb(233, 204, 204);
		border-radius: 12px;
	}
}
.songs-wrapper {
	border-radius: 0 0 12px 12px;
	position: relative;
	&:before {
		content: ''; 
    	position: absolute;
		z-index: 10;
		left: 50%;
		transform: translateX(-50%);
    	top: -20px;
    	border: 10px solid transparent;
    	border-bottom: 10px solid rgb(254,144,144);
	}
}
.songs-list {
	border-radius: 0 0 12px 12px;
	padding: 10px 35px 15px;
	background: rgb(254,144,144); /* Old browsers */
	background: -moz-linear-gradient(top, rgb(254,144,144) 1%, rgb(219,127,165) 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(top, rgb(254,144,144) 1%,rgb(219,127,165) 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to bottom, rgb(254,144,144) 1%,rgb(219,127,165) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fe9090', endColorstr='#db7fa5',GradientType=0 ); /* IE6-9 */
}
@media screen and (max-width: 768px) {
	.songs-list {
		font-size: 14px;
		padding-left: 10px;
		padding-right: 10px;
	}
	.song_active {
		padding-left: 15px;
		&:before {
			left: 0;
		}
	}
	.songs-search {
		padding-left: 10px;
		padding-right: 10px;
	}
}
</style>
