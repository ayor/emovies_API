const PDFDOC = require('easyinvoice');
const fs = require('fs');
const path = require('path');
const Order = require('../models/order');

const createInvoice = async ({ invoiceOrder,  customer }) => {
   
    try {
       
        if (!invoiceOrder) {
            const err = new Error('there are no orders')
            err.statusCode = 404;
            throw err;
        }

        const invoiceName = 'invoice-' + invoiceOrder._id + '.pdf';

        const products = invoiceOrder.videos.map(video => {
            return {
                "quantity": video.qty.toString(),
                "description": video.title,
                "price":parseFloat(video.price),
                "tax": 0
            }
        })

       let data = {
            //"documentTitle": "RECEIPT", //Defaults to INVOICE
            "currency": "NGN",
            "taxNotation": "vat", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
            //"logoExtension": "png", //only when logo is base64
            "sender": {
                "company": "eMovies Corp",
                "address": "12B Victoria Island",
                "zip": "100264",
                "city": "Lagos",
                "country": "Nigeria"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            "client": {
                "company": customer.email,
                "address": "",
                "zip": "4567 CD",
                "city": "Lagos",
                "country": "Nigeria"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            "invoiceNumber": invoiceOrder._id,
            "invoiceDate": Date.now(),
            "products": products,
            "bottomNotice": "This is invoice excludes a " + invoiceOrder.shippingMode + " shipping fee of $" + invoiceOrder.shippingFee
        };
        const result = await PDFDOC.createInvoice(data);
        fs.writeFileSync(path.join('invoices', invoiceName), result.pdf, 'base64');
    } catch (error) {
        throw error;    
    }
}

module.exports = createInvoice