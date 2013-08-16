$ = if jQuery then jQuery else window.jQuery
$.frameCollection = []
$.keyframe =
  browserCode: ->
    ua = navigator.userAgent
    unless ua.indexOf("Opera") is -1
      "-o-"
    else unless ua.indexOf("MSIE") is -1
      "-ms-"
    else unless ua.indexOf("WebKit") is -1
      "-webkit-"
    else if navigator.product is "Gecko"
      "-moz-"
    else
      ""

  generate: ->
    # reset 
    $("#keyframes-style").html ""
    browserType = @browserCode()
    for frameName of $.frameCollection
      css = "@" + browserType + "keyframes " + frameName + "{"
      for frameData of $.frameCollection[frameName].data
        unless frameData is "name"
          css += frameData + "{"
          fd = $.frameCollection[frameName].data
          css += fd[frameData] + "}"
      css += "}\n"
      $("#keyframes-style").append css
    $("#keyframes-style").append " .boostKeyframe{transform:scale3d(1,1,1);}"
  
  add : (frameData) ->
    if typeof frameData is Array
      for data, index in frameData
        kfname = data.name
        data.name = ""
        $.frameCollection[kfname] = data: data
    else
      kfname = frameData.name
      frameData.name = ""
      $.frameCollection[kfname] = data: frameData
  
    $.keyframe.generate()

$.fn.resetKeyframe = (callback) ->
  $(this).css $.keyframe.browserCode() + "animation-play-state", "running"
  animationkey = $.keyframe.browserCode() + "animation"
  $(this).css animationkey, "none"
  $(this).data "keyframe", false
  clearInterval $(this).data("keyframeTimer")
  clearTimeout $(this).data("keyframeTimer")
  setTimeout callback, 1  if callback

$.fn.pauseKeyframe = ->
  $(this).css $.keyframe.browserCode() + "animation-play-state", "paused"
  clearInterval $(this).data("keyframeTimer")
  clearTimeout $(this).data("keyframeTimer")

$.fn.resumeKeyframe = ->
  $(this).css $.keyframe.browserCode() + "animation-play-state", "running"



$.fn.playKeyframe = (frameOptions) ->
  defaultsOptions =
      duration: 10000
      timingFunction: "ease"
      delay: 0
      repeat: 1
      direction: "normal"
      fillMode: "forwards"

  frameOptions = $.extend({}, defaultsOptions, frameOptions)
  ###
    animation-name: myfirst;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
  ###
  name = frameOptions.name
  duration = frameOptions.duration
  delay = frameOptions.delay
  repeat = frameOptions.repeat
  frameOptions.duration = frameOptions.duration + "ms" if typeof frameOptions.duration isnt "string"
  frameOptions.delay = frameOptions.delay + "ms" if typeof frameOptions.duration isnt "string"
  animationcss = "#{name} #{frameOptions.duration} #{frameOptions.timingFunction} #{frameOptions.delay} #{repeat} #{frameOptions.direction} #{frameOptions.fillMode}"
  callback = if frameOptions.complete then frameOptions.callback else undefined
  
  animationcss = animationcss.trim()
  animationkey = $.keyframe.browserCode() + "animation"
  ###
    unless repeat is "infinite"
      $(this).data "keyframeTimer", setTimeout(callback, (duration + delay) * repeat)  if callback?
      setTimeout (->
        $(_this).data "keyframe", false
      ), (duration + delay) * repeat
    else
      if callback?
        $(_this).data "keyframeTimer", setTimeout(->
          callback()
          $(_this).data "keyframeTimer", setInterval(callback, duration)
        , duration + delay)
  ###
  $(this).css $.keyframe.browserCode() + "animation-play-state", "running"
  $(this).data "keyframe", name
  $(this).css animationkey, animationcss

$("<style>").attr( id:"keyframes-style",type:"text/css" ).appendTo("head")
