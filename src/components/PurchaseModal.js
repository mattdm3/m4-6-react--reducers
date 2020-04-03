import React from "react"
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog';
import { BookingContext } from "./BookingContext";
import { SeatContext } from './SeatContext'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'



const StyledDialog = styled(Dialog)`
    h1{
    padding: 20px 15px; 
    margin-top: 30px; 
    }
    p {
        padding: 10px 15px;

    }
    table {
        text-align: center;
        margin: 0 auto;
    }
    
        h3 {
            margin: 20px 20px; 
            
        }
    


`

const StyledForm = styled.form`
    display: flex; 
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
    margin-bottom: 30px; 
`

const StyledTextField = styled.input`    
    margin: 20px 15px;
    margin-bottom: 10px; 
    height: 40px; 
    width: 170px; 
    border-radius: 5px; 
    border: 1px solid lightgray;
    padding: 0 5px; 
    font-size: 16px; 
    

    &:last-of-type {
        width: 100px; 
    }

`



const StyledTable = styled.table`
    width: 80%;
   
    margin: 15px 0; 
    padding: 15px 5px; 


`

const StyleTh = styled.th`
    border-bottom: 1px solid #ddd;
    padding: 20px 0; 
`

const StyleTd = styled.th`
    border-bottom: 1px solid #ddd;
    padding: 20px 0; 
`

const Error = styled.div`
    text-align: center;
    padding-bottom: 15px;
    color: red;
`

export const RenderDialog = (props) => {

    const {
        state: { status, error, selectedSeatId, price, rowName, seatIndex },
        actions: { beginBookingProcess, cancelBookingProcess, purchaseTicketFailure, purchaseTicketRequest, purchaseTicketSuccess }
    } = React.useContext(BookingContext)

    const {
        actions: { markSeatAsPurchased },
    } = React.useContext(SeatContext);

    // const { state, actions } = React.useContext(BookingContext)

    // console.log(selectedSeatId)



    const handlePurchase = (event) => {
        event.preventDefault();
        purchaseTicketRequest();

        fetch("/api/book-seat", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                creditCard,
                expiration,
                seatId: selectedSeatId,
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    purchaseTicketSuccess();
                    console.log("SUCCESS");
                    markSeatAsPurchased(selectedSeatId)

                } else purchaseTicketFailure(response.message);
            })
            .catch(err => {
                console.log(err);
            });

    }

    // REMOVES MODAL ON ESC KEY
    const handleExitModal = (event) => {


        if (event.key === "Escape") {
            cancelBookingProcess()
        }

    }
    React.useEffect(() => {
        window.addEventListener("keyup", handleExitModal);
        return () => {
            window.removeEventListener("keyup", handleExitModal)
        }

    }, [])

    const [creditCard, setCreditCard] = React.useState('');
    const [expiration, setExpiration] = React.useState('');

    return (

        <StyledDialog onClose={cancelBookingProcess} open={selectedSeatId !== null}>
            <h1>Purchase Ticket</h1>
            <p >You're purchasing 1 ticket for the price of ${price}.</p>

            <StyledTable >
                <tbody>
                    <tr>
                        <StyleTh>Row</StyleTh>
                        <StyleTh>Seat</StyleTh>
                        <StyleTh>Price</StyleTh>
                    </tr>
                    <tr>
                        <StyleTd>{rowName}</StyleTd>
                        <StyleTd>{seatIndex}</StyleTd>
                        <StyleTd>{price}</StyleTd>
                    </tr>
                </tbody>
            </StyledTable>

            <h3>Enter Payment Details</h3>
            <StyledForm onSubmit={handlePurchase}>
                <StyledTextField type="number" name="creditCard" placeholder="Credit Card" onChange={(ev) => setCreditCard(ev.target.value)} value={creditCard} />
                <StyledTextField type="text" name="expiration" placeholder="Expiration" onChange={(ev) => setExpiration(ev.target.value)} value={expiration} />
                <Button type="submit" variant="contained" size="large" color="primary">Purchase</Button>
            </StyledForm>

            <Error>{error}</Error>



        </StyledDialog >


    )


}