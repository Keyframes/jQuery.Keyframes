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
    $keyframeStyle = $("<style>").attr( class: "keyframe-style", id: frameName, type:"text/css" ).appendTo("head")
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
  $(this).css $.keyframe.browserCode() + "animation-play-state", "running"
  $(this).css $.keyframe.browserCode() + "animation", "none"
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



$.fn.extend 
  playKeyframe : (frameOptions) ->
    defaultsOptions =
        duration: 0
        timingFunction: "ease"
        delay: 0
        repeat: 1
        direction: "normal"
        fillMode: "forwards"
  
    frameOptions = $.extend defaultsOptions, frameOptions
    
    name = frameOptions.name
    duration = frameOptions.duration
    delay = frameOptions.delay
    repeat = frameOptions.repeat
    frameOptions.duration = frameOptions.duration + "ms" if typeof frameOptions.duration isnt "string"
    frameOptions.delay = frameOptions.delay + "ms" if typeof frameOptions.duration isnt "string"
    animationcss = "#{name} #{frameOptions.duration} #{frameOptions.timingFunction} #{frameOptions.delay} #{repeat} #{frameOptions.direction} #{frameOptions.fillMode}"
    callback = if frameOptions.complete then frameOptions.complete else null
    
    animationcss = animationcss.trim()
    animationkey = $.keyframe.browserCode() + "animation"
    
    return @each ()->
      $(this).addClass "boostKeyframe"
      $(this).css $.keyframe.browserCode() + "animation-play-state", "running"
      $(this).data "keyframe", name
      $(this).css animationkey, animationcss
      
      
      # If repeat is infinite, the callback function will be fired every time the animation is restarted.
      if repeat is "infinite"
        if callback?
          $(this).data "keyframeTimer", setTimeout(=>
            do callback
            $(this).data "keyframeTimer", setInterval(callback, duration)
          , duration + delay)
      else
       if callback
          $(this).data "keyframeTimer", setTimeout(callback, (duration + delay) * repeat)
            
        setTimeout (=>
          $(this).data "keyframe", false
        ), (duration + delay) * repeat

$("<style>").attr( class: "keyframe-style", id:"boost-keyframe", type:"text/css" ).appendTo("head").append " .boostKeyframe{#{browserType}transform:scale3d(1,1,1);}"
