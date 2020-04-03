import React from "react"

export const BookingContext = React.createContext();

// Possible statuses: 
// idle, seat-selected, awaiting-response, error, purchased

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
    rowName: null,
    seatIndex: null
}



function reducer(state, action) {
    switch (action.type) {
        case 'begin-booking-process': {
            return {
                ...state,
                status: "seat-selected",
                selectedSeatId: action.selectedSeatId,
                price: action.price,
                rowName: action.rowName,
                seatIndex: action.seatIndex
            };
        }
        case 'click': {
            return {
                ...state,
                status: "idle",
                selectedSeatId: null,
                price: null,
                rowName: null,
                seatIndex: null,
            }
        }
        case 'keydown': {
            return {
                ...state,
                status: "idle",
                selectedSeatId: null,
                price: null,
                rowName: null,
                seatIndex: null,
            }
        }
        case 'cancel-booking-process': {
            return {
                ...state,
                status: "idle",
                selectedSeatId: null,
                price: null,
            }
        }
        case 'purchase-ticket-request': {
            return {
                ...state,
                status: "awaiting-response",
            }
        }
        case 'purchase-ticket-failure': {
            return {
                ...state,
                status: "error",
                error: "Please provide proper credit card information!"

            }
        }
        case 'purchase-ticket-success': {
            return {
                ...state,
                status: "purchased",
                error: null,
                selectedSeatId: null,
                price: null,
                seatIndex: null,
                rowName: null,

            }
        }
        case 'clear-snackbar': {
            return {
                ...state,
                status: "idle",
            }
        }
        default:
            throw new Error(`unrecognized action: ${action.type}`)
    }
}


export const BookingProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        console.log(state)
    }, [state])

    const beginBookingProcess = (seatId, price, rowName, seatIndex) => {

        dispatch({
            type: 'begin-booking-process',
            selectedSeatId: seatId,
            price: price,
            rowName: rowName,
            seatIndex: seatIndex
        })
    }
    const cancelBookingProcess = data => {
        dispatch({
            type: 'cancel-booking-process',
            ...data
        })

    }
    const purchaseTicketRequest = () => {
        dispatch({
            type: 'purchase-ticket-request'
        })

    }

    const purchaseTicketSuccess = () => {
        dispatch({
            type: 'purchase-ticket-success'
        })

    }

    const purchaseTicketFailure = () => {
        dispatch({
            type: 'purchase-ticket-failure'
        })
    }

    const clearSnackBar = (data) => {
        console.log("SNACK BAR TRIGGER")
        dispatch({
            type: 'clear-snackbar',
            ...data
        })
    }

    return (
        <BookingContext.Provider value={{
            state,
            actions: {
                beginBookingProcess,
                cancelBookingProcess,
                purchaseTicketSuccess,
                purchaseTicketRequest,
                purchaseTicketFailure,
                clearSnackBar
            }
        }}>
            {children}
        </BookingContext.Provider>
    )
}


