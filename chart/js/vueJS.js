//import Vue from 'vue'
//import App from './App.vue'

const app = new Vue({
  el: '#app',
  data: {
  	calls: []
  },
  created () {

  	//fetch('http://localhost:4000/call')
    fetch('https://my-json-server.typicode.com/SeIturra/data/blob/master/dataout')
  	.then(response => response.json())
  	.then(json => {
  		this.calls = json[0].CID
      
  	})
  	//for

  }
 // render: h => h(App)
})

