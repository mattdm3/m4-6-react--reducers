import React from 'react';
import { RenderDialog } from './PurchaseModal'

import { SeatContext } from './SeatContext'
import { BookingContext } from './BookingContext'

import GlobalStyles from './GlobalStyles';
import TicketWidget from './TicketWidget'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function App() {

  const {
    state: { status },
    actions: { clearSnackBar }
  } = React.useContext(BookingContext)


  const {

    actions: { receiveSeatInfoFromServer, markSeatAsPurchased },
  } = React.useContext(SeatContext);

  React.useEffect(() => {

    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        receiveSeatInfoFromServer(data);
      })
  }, [])



  return (
    <>
      <GlobalStyles />
      <TicketWidget />
      <RenderDialog />

      <Snackbar onClose={clearSnackBar} autoHideDuration={4000} open={status === "purchased"}>
        <MuiAlert severity="success" onClose={clearSnackBar} >
          Successfully purchased ticket! Enjoy the show.
        </MuiAlert>
      </Snackbar>


    </>
  );
}

export default App;
