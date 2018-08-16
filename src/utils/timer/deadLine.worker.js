
self.onmessage = function (e) {
  console.log(e.data);

  while(new Date().getTime() < e.data ) {

  }
  postMessage("TIME_IS_UP")
};
