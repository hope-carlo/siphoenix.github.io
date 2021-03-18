function react (id, like) {
  // (A) GET SELECTED POST
  var prow = document.getElementById("prow"+id);

  // (B) POST DATA
  var data = new FormData(), req = "";
  if (prow.dataset.react=="") { req = "save"; }
  else { req = prow.dataset.react==like ? "del" : "save" }
  data.append("req", req);
  data.append("id", id);
  data.append("react", like);

  // (C) AJAX + UPDATE REACTION COUNT ON LOAD
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "2b-ajax.html");
  xhr.onload = function () {
    // console.log(this.response);
    var res = JSON.parse(this.response),
        dislikes = 0, likes = 0;
    if (res.react[id] != undefined) {
      dislikes = res.react[id][0]==undefined ? 0 : res.react[id][0],
      likes = res.react[id][1]==undefined ? 0 : res.react[id][1];
    }
    prow.dataset.react = req=="del" ? "" : like ;
    prow.getElementsByClassName("countdislike")[0].innerHTML = dislikes;
    prow.getElementsByClassName("countlike")[0].innerHTML = likes;
  };
  xhr.send(data);
}