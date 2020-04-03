import React from "react"
import styled from 'styled-components';
import Tippy from "@tippy.js/react"
import seatsAvailable from '../assets/seat-available.svg'


const StyledTippy = styled(Tippy)`
  background-color: #494949;
  padding: 5px 5px; 
  border-radius: 5px;
`

export const RenderSeats = ({ rowIndex, seatIndex, isBooked, price }) => {



    const Seats = ({ rowIndex, seatIndex, status, style }) => {
        return (
            <StyledTippy duration={1} content={`Row ${rowIndex} - Seat ${seatIndex} : $${price}`
            } >
                <img alt="seats" src={seatsAvailable} status={status} style={style} />
            </StyledTippy >

        )
    }

    return (
        <Seats
            rowIndex={rowIndex}
            seatIndex={seatIndex}
            status={isBooked ? 'unavailable' : 'available'}
            style={isBooked ? { filter: "grayscale(100%)" } : null}
        />
    )
}

