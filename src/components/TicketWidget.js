import React, { useState } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import { SeatContext } from './SeatContext'
import { RenderSeats } from "./Seats"
import { BookingContext } from "./BookingContext"
import Dialog from '@material-ui/core/Dialog';



const StyledButton = styled.button`
  
  border: none;
  background: transparent;
  border-radius: 5px;
`


const TicketWidget = () => {

  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = React.useContext(SeatContext);

  const { state, actions } = React.useContext(BookingContext);

  if (!hasLoaded) {
    return <CircularProgress />;
  }





  return (
    <Wrapper style={{
      backgroundColor: "#494949", border: "none"
    }}>
      {
        range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex} style={{ border: "none" }}  >
              <RowLabel style={{ marginRight: "10px" }}>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seat = seats[seatId];
                return (
                  <SeatWrapper key={seatId} style={{ backgroundColor: "transparent" }}>

                    <StyledButton
                      disabled={seat.isBooked ? true : false}
                      style={seat.isBooked ? null : { cursor: "pointer" }}
                      onClick={() => actions.beginBookingProcess(seatId, seat.price, rowName, seatIndex)}

                    >
                      <RenderSeats
                        rowIndex={rowIndex}
                        seatIndex={seatIndex}
                        isBooked={seat.isBooked}
                        price={seat.price}
                      />

                    </StyledButton>



                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })
      }
    </Wrapper >
  );
};

const Wrapper = styled.div`
  background: #eee;
  /* border: 1px solid #ccc; */
  border-radius: 3px;
  padding: 8px;
  width: 950px;
  margin: 0 auto; 
  margin-top: 50px; 
  border-radius: 5px; 
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
