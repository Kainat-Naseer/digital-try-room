import React from 'react'

const Measurements = (props) => {
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
          <td>{props.measurements.armsLength.toFixed(3)}</td>
        </tr>
        <tr>
          <td>Shoulder Width</td>
          <td>{props.measurements.shoulderWidth.toFixed(3)}</td>
        </tr>
        <tr>
          <td>Shoulder To Waist Length</td>
          <td>{props.measurements.shoulderToWaist.toFixed(3)}</td>
        </tr>
        <tr>
          <td>Legs Length</td>
          <td>{props.measurements.legsLength.toFixed(3)}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Measurements;