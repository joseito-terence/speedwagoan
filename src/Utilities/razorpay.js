import db, { auth } from "../firebase";

export function makePayment(amount, phoneNumber, orderDetails) {
    const KEY_ID = 'rzp_test_lRNSiM9DWeeQ0M';
    const { displayName, email } = auth.currentUser;
    const options = {
        "key": KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": parseInt(amount * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "SpeedWaGoan",
        "description": "Payment for purchase.",
        "image": "https://firebasestorage.googleapis.com/v0/b/tybca-project.appspot.com/o/assets%2Fandroid-chrome-192x192.png?alt=media&token=6104cfda-b6d8-4187-9a51-724153ab07ec",
        //   "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){  //on payment success
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            commitOrderToDB(response.razorpay_payment_id, orderDetails);
        },
        "prefill": {
            "name": displayName,
            "email": email,
            "contact": phoneNumber
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#0b3861"
        }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
        console.error(response.error.code);
        console.error(response.error.description);
        console.error(response.error.source);
        console.error(response.error.step);
        console.error(response.error.reason);
        console.error(response.error.metadata.order_id);
        console.error(response.error.metadata.payment_id);
    });

    rzp1.open();
}


function commitOrderToDB(razorpay_payment_id, orderDetails) {
    const { email, uid } = auth.currentUser;

    const promises = [];
    orderDetails.forEach(order => {     // push each product as a separate record.
        promises.push(
            db.collection('orders')
              .add({
                razorpay_payment_id,
                ...order,
                customerId: uid,
                order_date: new Date(),
              })   
        )
    });

    Promise.all(promises)
        .then(() => {
            console.log('Comitted to db Successful');
            let deleteQueue = []; // store the promises to deleting items in the cart.
            
            orderDetails.forEach(order => 
                deleteQueue.push(
                    db.doc(`customers/${email}/cart/${order.id}`).delete()
                )    
            );
            
            return Promise.all(deleteQueue);
        })
        .then(() => {
            console.log('cart now empty');
            window.location.href = '/products';
        })
        .catch(err => console.log(err));
}