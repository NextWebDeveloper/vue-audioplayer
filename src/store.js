import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  	state: {
		currentSong: null,
		timePassed: null,
		test: null,
		playing: false,
		list: [
			{ name: 'Apollodor_Portals-of-Light_Hook', duration: null, show: true },
			{ name: 'Charge-of-the-Light-Brigade', duration: null, show: true },
			{ name: 'Apollodor_Lost-Their-Sight_140bpm-Gmajor', duration: null, show: true },
			{ name: 'Apollodor_This-Game_Aminor_130bpm', duration: null, show: true },
			{ name: 'Jenny_Mayhem_Jesse_Taylor_Could_Be_Acapella', duration: null, show: true },
			{ name: 'Jr-lomax-1939-the-cowboys-lament', duration: null, show: true },
			{ name: 'Male-Vocal-1typhoidfever', duration: null, show: true },
			{ name: 'Ma-Rag-Time-Baby', duration: null, show: true },
			{ name: 'Pharoahs-Army-Got-Drowned', duration: null, show: true },
			{ name: 'Snowflake-Waking-Me-Softly', duration: null, show: true },
			{ name: 'When-i-look-into-your-eyes-male-vox', duration: null, show: true }
		],
		counterLoaded: 0,
 	},
  	mutations: {
		nextSong(state) {
			state.currentSong = ( state.currentSong == (state.list.length-1) ) ? 0 : (state.currentSong+1);
			if (!state.playing) state.playing = true;
		},
		prevSong(state) {
			state.currentSong = state.currentSong == 0 ? (state.list.length-1) : (state.currentSong-1);
			if (!state.playing) state.playing = true;
		},
		selectSong(state, idx) {
			state.currentSong = idx;
			if (!state.playing) state.playing = true;
		},
		setCurTime(state, time) {
			state.timePassed = time;
		},
		setPlaying(state, bool) {
			state.playing = bool;
		},
		incCounter(state) {
			state.counterLoaded = state.counterLoaded + 1;
		}
  	},
  	actions: {

  	},
  	getters: {
		getSong(state) {
			if (state.currentSong !== null) return state.list[state.currentSong].name
		}
  	}
})
