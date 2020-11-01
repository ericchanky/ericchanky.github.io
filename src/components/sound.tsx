import * as Tone from 'tone'

const sound = (note: Tone.Unit.Frequency, duration: Tone.Unit.Time, time: number = 0) => {
  const synth = new Tone.Synth().toDestination()
  const now = Tone.now()
  synth.triggerAttackRelease(note, duration, now + time)
}

export default sound
