import React from 'react'

const Measurements = (props) => {
  console.log("debuggingggg", props)
  return (
    <table>
      <thead>
        <tr>
          <td>Body Parts</td>
          <td>Measurements</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Arms Length</td>
          {props.measurements && <td>{props.measurements.armsLength.toFixed(3)}</td>}
        
        </tr>
        <tr>
          <td>Shoulder Width</td>
          {props.measurements && <td>{props.measurements.shoulderWidth.toFixed(3)}</td>}
        </tr>
        <tr>
          <td>Shoulder To Waist Length</td>
          {props.measurements &&  <td>{props.measurements.shoulderToWaist.toFixed(3)}</td>}
          
        </tr>
        <tr>
          <td>Legs Length</td>
          {props.measurements && <td>{props.measurements.legsLength.toFixed(3)}</td>}
          
        </tr>
      </tbody>
    </table>
  )
}

export default Measurements;