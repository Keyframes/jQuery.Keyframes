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
    #if redefined
    $frameStyle = $("style##{frameData.name}")
    if $frameStyle.length > 0
      $frameStyle.html css
      # get all the element running the animation
      $elems = $("*").filter ->
        @style["#{$.keyframe.browserCode().slice(1,-1)}AnimationName"] is frameName
      $elems.each ->
        # get params"
        $el = $(this)
        options = $el.data "keyframeOptions"
        $el.resetKeyframe ->
          $el.playKeyframe options
    else
      $createKeyframeStyleTag(id:frameName).append css
    
  
  define : (frameData) ->
    if frameData.length
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

    if typeof frameOptions is 'string'
      frameOptSplit = frameOptions.trim().split(' ')
      frameOptions =
        name: frameOptSplit[0]
        duration: parseInt(frameOptSplit[1])
        delay: parseInt(frameOptSplit[3])
        repeat: parseInt(frameOptSplit[4])

    defaultsOptions =
      duration: 0
      timingFunction: "ease"
      delay: 0
      repeat: 1
      direction: "normal"
      fillMode: "forwards"
      complete: null
  
    frameOptions = $.extend defaultsOptions, frameOptions
    
    duration = frameOptions.duration
    delay = frameOptions.delay
    repeat = frameOptions.repeat
    animationcss = "#{frameOptions.name} #{duration}ms #{frameOptions.timingFunction} #{delay}ms #{repeat} #{frameOptions.direction} #{frameOptions.fillMode}"
    callback = frameOptions.complete
    animationkey = browserType + "animation"
    
    return @each ()->
      $el = $(this).addClass("boostKeyframe")
                   .css(browserType + animationPlayState, playStateRunning)
                   .css(animationkey, animationcss)
                   .data("keyframeOptions", frameOptions)
      
      # If repeat is infinite, the callback function will be fired every time the animation is restarted.
      if repeat is "infinite"
        if callback
          $el.data keyframeTimer, setTimeout(=>
            do callback
            $el.data keyframeTimer, setInterval(callback, duration)
          , duration + delay)
      else
       if callback
          $el.data keyframeTimer, setTimeout(callback, (duration + delay) * repeat)

$createKeyframeStyleTag(id:"boost-keyframe").append " .boostKeyframe{#{browserType}transform:scale3d(1,1,1);}"
