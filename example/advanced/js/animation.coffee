bcode = $.keyframe.vendorPrefix()

$.keyframe.define [
  name: "clouds"
  "from": "margin-left:-50%"
  "to": "margin-left:100%"
,
  name: "balloon"
  "from": "margin-top:200px;margin-left:100%;#{bcode}transform:scale(1)"
  "to": "margin-top:100px;margin-left:-20%;#{bcode}transform:scale(0.3)"
,
  name: "sun"
  "from": "margin-top:50px;margin-left:-20px;#{bcode}transform:rotate(360deg)"
  "to": "margin-top:-20px;margin-left:100px;#{bcode}transform:rotate(0deg)"
]