keyframeTimer = "keyframeTimer"
animationPlayState = "animation-play-state"
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
  isSupported:->
    element = document.getElementsByTagName('body')[0]
    animationstring = "animation"
    keyframeprefix = ""
    pfx = @browserCode()
    animationSupport = false
    if element.style.animationName
      animationSupport = true
    else
      pfx = pfx.slice 1,-1
      if element.style[pfx + "AnimationName"] isnt `undefined`
        animationSupport = true
    
    return animationSupport
    
  generate: (frameName)->
    $keyframeStyle = $("<style>").attr(class: "keyframe-style", id: frameName, type:"text/css" ).appendTo("head")
    browserType = @browserCode()
    css = "@" + browserType + "keyframes " + frameName + "{"
    for frameData of $.frameCollection[frameName].data
      unless frameData is "name"
        css += frameData + "{"
        fd = $.frameCollection[frameName].data
        css += fd[frameData] + "}"
    css += "}\n"
    $keyframeStyle.append css
    
  
  add : (frameData) ->
    if typeof frameData is Array
      for data, index in frameData
        kfname = data.name
        data.name = ""
        $.frameCollection[kfname] = data: data
        $.keyframe.generate kfname
    else
      kfname = frameData.name
      frameData.name = ""
      $.frameCollection[kfname] = data: frameData
      $.keyframe.generate kfname

$.fn.resetKeyframe = (callback) ->
  browserType = $.keyframe.browserCode()
  $el = $(this).css browserType + animationPlayState, "running"
  $el.css browserType + "animation", "none"
  $el.data "keyframe", false
  clearInterval $el.data keyframeTimer
  clearTimeout $el.data keyframeTimer
  setTimeout callback, 1  if callback

$.fn.pauseKeyframe = ->
  $el = $(this).css $.keyframe.browserCode() + animationPlayState, "paused"
  clearInterval $el.data keyframeTimer
  clearTimeout $el.data keyframeTimer

$.fn.resumeKeyframe = ->
  $(this).css $.keyframe.browserCode() + animationPlayState, "running"

$.fn.extend 
  playKeyframe : (frameOptions) ->
    defaultsOptions =
        duration: 0
        timingFunction: "ease"
        delay: 0
        repeat: 1
        direction: "normal"
        fillMode: "forwards"
        complete: null
  
    frameOptions = $.extend defaultsOptions, frameOptions
    
    name = frameOptions.name
    duration = frameOptions.duration
    delay = frameOptions.delay
    repeat = frameOptions.repeat
    frameOptions.duration = frameOptions.duration + "ms" if typeof duration isnt "string"
    frameOptions.delay = frameOptions.delay + "ms" if typeof delay isnt "string"
    animationcss = "#{name} #{frameOptions.duration} #{frameOptions.timingFunction} #{frameOptions.delay} #{repeat} #{frameOptions.direction} #{frameOptions.fillMode}"
    callback = frameOptions.complete
    animationkey = $.keyframe.browserCode() + "animation"
    
    return @each ()->
      $el = $(this).addClass "boostKeyframe"
      $el.css $.keyframe.browserCode() + animationPlayState, "running"
      $el.data "keyframe", name
      $el.css animationkey, animationcss
      
      # If repeat is infinite, the callback function will be fired every time the animation is restarted.
      if repeat is "infinite"
        if callback?
          $el.data keyframeTimer, setTimeout(=>
            do callback
            $el.data keyframeTimer, setInterval(callback, duration)
          , duration + delay)
      else
       if callback
          $el.data keyframeTimer, setTimeout(callback, (duration + delay) * repeat)
            
        setTimeout (=>
          $el.data "keyframe", false
        ), (duration + delay) * repeat

$("<style>").attr( class: "keyframe-style", id:"boost-keyframe", type:"text/css" ).appendTo("head").append " .boostKeyframe{#{browserType}transform:scale3d(1,1,1);}"
