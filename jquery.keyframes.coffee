$createKeyframeStyleTag = (params)->
  $("<style>").attr( class: "keyframe-style", id:params.id, type:"text/css" )
              .appendTo("head")

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
    element = $('body').get 0
    animationSupport = false
    if element.style.animationName
      animationSupport = true
    else
      pfx = @browserCode().slice 1,-1
      if element.style[pfx + "AnimationName"]
        animationSupport = true
    
    return animationSupport
    
  generate: (frameData)->
    frameName = frameData.name or ""
    css = "@#{@browserCode()}keyframes #{frameName} {"
    for property of frameData
      unless property is "name"
        css += "#{property}{#{frameData[property]}}"
    css += "}"
    $createKeyframeStyleTag(id:frameName).append css
    
  
  add : (frameData) ->
    if typeof frameData is Array
      for frame in frameData
        @generate frame
    else
      @generate frameData

browserType = $.keyframe.browserCode()
keyframeTimer = "keyframeTimer"
animationPlayState = "animation-play-state"
playStateRunning = "running"

$.fn.resetKeyframe = (callback) ->
  $el = $(this).css(browserType + animationPlayState, playStateRunning)
               .css(browserType + "animation", "none")
               .data("keyframe", false)
  clearInterval $el.data keyframeTimer
  clearTimeout $el.data keyframeTimer
  setTimeout callback, 1  if callback

$.fn.pauseKeyframe = ->
  $el = $(this).css browserType + animationPlayState, "paused"
  clearInterval $el.data keyframeTimer
  clearTimeout $el.data keyframeTimer

$.fn.resumeKeyframe = ->
  $(this).css browserType + animationPlayState, playStateRunning

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
    frameOptions.duration = duration + "ms"
    frameOptions.delay = delay + "ms"
    animationcss = "#{name} #{frameOptions.duration} #{frameOptions.timingFunction} #{frameOptions.delay} #{repeat} #{frameOptions.direction} #{frameOptions.fillMode}"
    callback = frameOptions.complete
    animationkey = browserType + "animation"
    
    return @each ()->
      $el = $(this).addClass("boostKeyframe")
                   .css(browserType + animationPlayState, playStateRunning)
                   .css(animationkey, animationcss)
                   .data("keyframe", name)
      
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


$createKeyframeStyleTag(id:"boost-keyframe").append " .boostKeyframe{#{browserType}transform:scale3d(1,1,1);}"
