<template>
<div class="preloader-wrapper">
	<div class="preloader">
	  <div class="lines">
	    <div class="line line-1"></div>
	    <div class="line line-2"></div>
	    <div class="line line-3"></div>
	  </div>
	
	  <div class="loading-text">LOADING</div>
	</div>
</div>

</template>

<script>
export default {
	name: 'AppPreloader'
}
</script>

<style lang="scss" scoped>
.preloader-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
  	background: rgb(254,144,144);
}

.preloader {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 60px;
  margin: -30px 0 0 -40px;
  
  .lines {
    width: 80px;
    height: 40px;
    position: absolute;
    
    .line {
      width: 80px;
      height: 10px;
      background-color: #fff;
      position: absolute;
      clip: rect(0, 0, 20px, 0);
      
      &.line-1 {
        top: 0;
        animation: slide 2s ease 0s infinite;
      }
      
      &.line-2 {
        top: 15px;
        animation: slide 2s ease 0.25s infinite;
          
      }
      
      &.line-3 {
        top: 30px;
        animation: slide 2s ease 0.5s infinite;
      }
    }
  }
  
  .loading-text {
    position: absolute;
    top: 50px;
    text-align: center;
    width: 100%;
    color: #fff;
    font-size: 13px;
    font-family: sans-serif;
    letter-spacing: 3px;
    line-height: 10px;
    height: 10px;
    animation: fade 1s ease 0s infinite;
  }
}

@keyframes slide {
  0% {
    clip: rect(0, 0, 20px, 0);
  }
  
  30% {
    clip: rect(0, 80px, 20px, 0);
  }
  
  50% {
    clip: rect(0, 80px, 20px, 0);
  }
  
  80% {
    clip: rect(0, 80px, 20px, 80px);
  }
  
  100% {
    clip: rect(0, 80px, 20px, 80px);
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  
  50% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
}
</style>


