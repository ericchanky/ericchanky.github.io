import { makeStyles } from '@material-ui/core'
import clsx from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { withLayout } from '../components/Layout/withLayout'

const useStyles = makeStyles({

  fullScreen: {
    width: '100vw',
    height: '100vh',
  },

  background: {
    backgroundColor: '#222',
    backgroundImage: 'url("https://drive.google.com/uc?export=view&id=0BzFF7FmbJUo5X0NEUXFVd0NBcWc")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',

    '&:after': {
      content: '""',
      width: '100%',
      height: '100%',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      zIndex: 1,
      animation: '$thunder-bg 6s infinite',
    },
  },

  canvas: {
    width: '100%',
    height: '100%',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  index5: {
    zIndex: 5,
  },

  index10: {
    zIndex: 10,
  },

  index100: {
    zIndex: 100,
  },

  '@keyframes thunder-bg': {
    '0%': {
      backgroundColor: 'rgba(34, 34, 34, 0.9)',
    },
    '9%': {
      backgroundColor: 'rgba(34, 34, 34, 0.9)',
    },
    '10%': {
      backgroundColor: 'rgba(59, 59, 59, 0.3)',
    },
    '10.5%': {
      backgroundColor: 'rgba(34, 34, 34, 0.9)',
    },
    '80%': {
      backgroundColor: 'rgba(34, 34, 34, 0.9)',
    },
    '82%': {
      backgroundColor: 'rgba(59, 59, 59, 0.3)',
    },
    '83%': {
      backgroundColor: 'rgba(34, 34, 34, 0.9)',
    },
    '83.5%': {
      backgroundColor: 'rgba(59, 59, 59, 0.3)',
    },
    '100%': {
      backgroundColor: 'rgba(34, 34, 34, 0.9)',
    },
  },
})

const rainthroughnum = 30
const speedRainTrough = 25

const rainnum = 50

const random = (min: number, max: number) => {
  return Math.random() * (max - min + 1) + min
}

type RainTrough = { x: number, y: number, opacity: number, length: number, xs: number, ys: number }[]

type Rain = { x: number, y: number, l: number, xs: number, ys: number }[]

type Lightning = {
  x: number,
  y: number,
  xRange: number,
  yRange: number,
  path: {
    x: number,
    y: number,
  }[],
  pathLimit: number,
}[]

const Rain = () => {
  const [rainTrough, setRainTrough] = useState<RainTrough>([])
  const [rain, setRain] = useState<Rain>([])
  const [, setLightning] = useState<Lightning>([])
  const [lightningConfig, setLightningConfig] = useState({ lightTimeCurrent: 0, lightTimeTotal: 0 })

  const ref1 = useRef<HTMLCanvasElement>(null)
  const ref2 = useRef<HTMLCanvasElement>(null)
  const ref3 = useRef<HTMLCanvasElement>(null)
  const frame = useRef<number>(0)

  const ctx1 = ref1.current && ref1.current.getContext('2d')
  const ctx2 = ref2.current && ref2.current.getContext('2d')
  const ctx3 = ref3.current && ref3.current.getContext('2d')

  const classes = useStyles()

  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  const resetSize = useCallback(() => {
    if (ref1.current) {
      ref1.current.width = window.innerWidth
      ref1.current.height = window.innerHeight
    }
    if (ref2.current) {
      ref2.current.width = window.innerWidth
      ref2.current.height = window.innerHeight
    }
    if (ref3.current) {
      ref3.current.width = window.innerWidth
      ref3.current.height = window.innerHeight
    }
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    resetSize()
    window.addEventListener('resize', resetSize)
    return () => {
      window.removeEventListener('resize', resetSize)
    }
  }, [resetSize])

  useEffect(() => {
    const tempRainTrough: RainTrough = []
    for (let i = 0; i < rainthroughnum; i++) {
      tempRainTrough[i] = {
        x: random(0, size.width),
        y: random(0, size.height),
        length: Math.floor(random(1, 830)),
        opacity: Math.random() * 0.2,
        xs: random(-2, 2),
        ys: random(10, 20),
      }
    }
    setRainTrough(tempRainTrough)
  }, [size])

  const drawRainTrough = useCallback((ctx: CanvasRenderingContext2D, rt: RainTrough, i: number) => {
    ctx.beginPath()
    const grd = ctx.createLinearGradient(0, rt[i].y, 0, rt[i].y + rt[i].length)
    grd.addColorStop(0, 'rgba(255,255,255,0)')
    grd.addColorStop(1, 'rgba(255,255,255,' + rt[i].opacity + ')')

    ctx.fillStyle = grd
    ctx.fillRect(rt[i].x, rt[i].y, 1, rt[i].length)
    ctx.fill()
  }, [])

  const animateRainTrough = useCallback(() => {
    if (!ctx1) { return }
    ctx1.clearRect(0, 0, size.width, size.height)

    for (var i = 0; i < rainthroughnum; i++) {
      if (rainTrough[i].y >= size.height) {
        rainTrough[i].y = size.height - rainTrough[i].y - rainTrough[i].length * 5
      } else {
        rainTrough[i].y += speedRainTrough
      }
      drawRainTrough(ctx1, rainTrough, i)
    }
  }, [ctx1, size, drawRainTrough, rainTrough])

  useEffect(() => {
    const tempRain: Rain = []
    for (var i = 0; i < rainnum; i++) {
      tempRain[i] = {
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        l: Math.random() * 1,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10,
      }
    }
    setRain(tempRain)
  }, [size])

  const drawRain = useCallback((ctx: CanvasRenderingContext2D, r: Rain, i: number) => {
    ctx.beginPath()
    ctx.moveTo(r[i].x, r[i].y)
    ctx.lineTo(r[i].x + r[i].l * r[i].xs, r[i].y + r[i].l * r[i].ys)
    ctx.strokeStyle = 'rgba(174,194,224,0.5)'
    ctx.lineWidth = 1
    ctx.lineCap = 'round'
    ctx.stroke()
  }, [])

  const animateRain = useCallback(() => {
    if (!ctx2) { return }
    ctx2.clearRect(0, 0, size.width, size.height)

    for (var i = 0; i < rainnum; i++) {
      rain[i].x += rain[i].xs
      rain[i].y += rain[i].ys
      if (rain[i].x > size.width || rain[i].y > size.height) {
        rain[i].x = Math.random() * size.width
        rain[i].y = -20
      }
      drawRain(ctx2, rain, i)
    }
  }, [ctx2, drawRain, size, rain])

  useEffect(() => {
    if (lightningConfig.lightTimeCurrent < lightningConfig.lightTimeTotal) { return }
    const x = random(100, size.width - 100)
    const y = random(0, size.height / 4)

    const tempLightning: Lightning = []
    const createCount = random(1, 3)
    for (let i = 0; i < createCount; i++) {
      tempLightning.push({
        x: x,
        y: y,
        xRange: random(5, 30),
        yRange: random(10, 25),
        path: [{
          x: x,
          y: y,
        }],
        pathLimit: random(40, 55),
      })
    }
    setLightning(tempLightning)
    setLightningConfig({ lightTimeCurrent: 0, lightTimeTotal: 200 /** rand(100, 200) */ })
  }, [lightningConfig, size])

  const drawLightning = useCallback(() => {
    if (!ctx3) { return }

    ctx3.globalCompositeOperation = 'destination-out'
    ctx3.fillStyle = 'rgba(0,0,0,' + random(1, 30) / 100 + ')'
    ctx3.fillRect(0, 0, size.width, size.height)
    ctx3.globalCompositeOperation = 'source-over'

    setLightning((l) => l.map((light) => {
      const path = light.path.concat({
        x: light.path[light.path.length - 1].x + (random(0, light.xRange) - (light.xRange / 2)),
        y: light.path[light.path.length - 1].y + (random(0, light.yRange)),
      })

      ctx3.strokeStyle = 'rgba(255, 255, 255, .1)'
      ctx3.lineWidth = 2
      if (random(0, 15) === 0) {
        ctx3.lineWidth = 4
      }
      if (random(0, 30) === 0) {
        ctx3.lineWidth = 6
      }

      ctx3.beginPath()
      ctx3.moveTo(light.x, light.y)
      for (var pc = 0; pc < path.length; pc++) {
        ctx3.lineTo(path[pc].x, path[pc].y)
      }
      if (Math.floor(random(0, 30)) === 1) { //to fos apo piso
        ctx3.fillStyle = 'rgba(255, 255, 255, ' + random(1, 3) / 100 + ')'
        ctx3.fillRect(0, 0, size.width, size.height)
      }
      ctx3.lineJoin = 'miter'
      ctx3.stroke()

      return { ...light, path }
    }).filter((light) => light.path.length < light.pathLimit ))
  }, [ctx3, size])

  const loop = useCallback(() => {
    setLightningConfig((c) => ({ ...c, lightTimeCurrent: c.lightTimeCurrent + 1 }))
    animateRainTrough()
    animateRain()
    drawLightning()
    frame.current = window.requestAnimationFrame(loop)
  }, [animateRainTrough, animateRain, drawLightning])

  useEffect(() => {
    loop()
    return () => {
      window.cancelAnimationFrame(frame.current)
    }
  }, [loop])

  return (
    <div className={clsx(classes.background, classes.fullScreen)}>
      <canvas ref={ref1} className={clsx(classes.canvas, classes.index100)} />
      <canvas ref={ref2} className={clsx(classes.canvas, classes.index10)} />
      <canvas ref={ref3} className={clsx(classes.canvas, classes.index5)} />
    </div>
  )
}

export default withLayout(Rain, {
  disableHeader: true,
})
