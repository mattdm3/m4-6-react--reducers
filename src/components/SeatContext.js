import React from "react"
import { BookingContext } from './BookingContext'
export const SeatContext = React.createContext();

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0,
};




function reducer(state, action) {

    // console.log(action)

    switch (action.type) {

        case "receive-seat-info-from-server": {

            return {
                ...state,
                hasLoaded: true,
                //not sure if it should be bookedSeats instead of seats.
                seats: action.seats,
                numOfRows: action.numOfRows,
                seatsPerRow: action.seatsPerRow,
            };
        }

        case "mark-seat-as-purchased": {

            console.log("AMOST THERE");

            console.log(state);


            return {
                ...state,
                seats: {
                    ...state.seats,
                    [action.seatId]: {
                        ...state.seats[action.seatId],
                        isBooked: true
                    }
                }

            };
        };

        default:
            throw new Error(`unrecognized action: ${action.type}`)
    }

}


export const SeatProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const receiveSeatInfoFromServer = data => {
        dispatch({
            type: 'receive-seat-info-from-server',
            ...data,
        });
    };

    const markSeatAsPurchased = seatId => {
        dispatch({
            type: 'mark-seat-as-purchased',
            seatId,
        });
    };

    return (
        <SeatContext.Provider
            value={{
                state,
                actions: {
                    receiveSeatInfoFromServer,
                    markSeatAsPurchased,
                },
            }}
        >
            {children}
        </SeatContext.Provider>
    );
};