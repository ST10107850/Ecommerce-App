import React from 'react';
import { jsPDF } from 'jspdf';

const Invoice = () => {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Adding content to PDF
    doc.setFont('helvetica');
    doc.setFontSize(12);

    // Adding header (Company info)
    doc.text('Company Name', 20, 20);
    doc.text('Address Line 1', 20, 30);
    doc.text('City, State, ZIP', 20, 40);
    doc.text('Email: contact@company.com', 20, 50);
    doc.text('Phone: (123) 456-7890', 20, 60);

    // Adding invoice info
    doc.text('Invoice #12345', 150, 20);
    doc.text('Date: 18th February 2025', 150, 30);
    doc.text('Due Date: 25th February 2025', 150, 40);

    // Adding table headers
    const startX = 20;
    const startY = 70;
    doc.text('Description', startX, startY);
    doc.text('Quantity', 120, startY);
    doc.text('Unit Price', 160, startY);
    doc.text('Total', 200, startY);

    // Adding table content
    const items = [
      { description: 'Product 1', quantity: 2, price: 50, total: 100 },
      { description: 'Product 2', quantity: 1, price: 30, total: 30 },
      { description: 'Product 3', quantity: 3, price: 20, total: 60 }
    ];

    let yPosition = 80; // Starting Y position for items
    items.forEach((item) => {
      doc.text(item.description, startX, yPosition);
      doc.text(item.quantity.toString(), 120, yPosition);
      doc.text('$' + item.price.toFixed(2), 160, yPosition);
      doc.text('$' + item.total.toFixed(2), 200, yPosition);
      yPosition += 10;
    });

    // Adding total
    doc.text('Total: $190', 150, yPosition + 10);

    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Company Name</h2>
            <p className="text-sm">Address Line 1</p>
            <p className="text-sm">City, State, ZIP</p>
            <p className="text-sm">Email: contact@company.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-semibold">Invoice #12345</h3>
            <p className="text-sm">Date: 18th February 2025</p>
            <p className="text-sm">Due Date: 25th February 2025</p>
          </div>
        </div>

        <table className="w-full mt-8 table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold border-b">Description</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border-b">Quantity</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border-b">Unit Price</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-sm border-b">Product 1</td>
              <td className="px-4 py-2 text-sm border-b">2</td>
              <td className="px-4 py-2 text-sm border-b">$50</td>
              <td className="px-4 py-2 text-sm border-b">$100</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm border-b">Product 2</td>
              <td className="px-4 py-2 text-sm border-b">1</td>
              <td className="px-4 py-2 text-sm border-b">$30</td>
              <td className="px-4 py-2 text-sm border-b">$30</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm border-b">Product 3</td>
              <td className="px-4 py-2 text-sm border-b">3</td>
              <td className="px-4 py-2 text-sm border-b">$20</td>
              <td className="px-4 py-2 text-sm border-b">$60</td>
            </tr>
          </tbody>
        </table>

        <div className="text-right mt-6">
          <p className="text-xl font-semibold">Total: $190</p>
        </div>

        <div className="text-center mt-8">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300"
            onClick={downloadPDF}
          >
            Download Invoice as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
